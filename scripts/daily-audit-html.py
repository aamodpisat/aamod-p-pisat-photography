"""Render the machine-readable daily audit as a self-contained HTML dashboard."""

import base64
import datetime as dt
import html
import json
import os
from pathlib import Path

ROOT = Path('audit')

def read(name, default):
    try:
        return json.loads((ROOT / name).read_text())
    except (OSError, ValueError):
        return default

def esc(value):
    return html.escape(str(value), quote=True)

def pill(text, tone='neutral'):
    return f'<span class="pill {tone}">{esc(text)}</span>'

def bar(value, maximum, tone='olive'):
    width = 0 if not maximum else min(100, max(2, 100 * value / maximum))
    return f'<span class="bar-track"><span class="bar {tone}" style="width:{width:.1f}%"></span></span>'

def section(title, eyebrow, body, id=''):
    return f'<section class="panel" id="{esc(id)}"><div class="section-head"><div><p class="eyebrow">{esc(eyebrow)}</p><h2>{esc(title)}</h2></div></div>{body}</section>'

pages_data = read('pages.json', {'pages': [], 'errors': ['Page audit unavailable']})
pages = pages_data.get('pages', [])
security = read('security.json', {})
audit = read('npm-audit.json', {})
summary = read('report.json', {})
lock = json.loads(Path('package-lock.json').read_text())
vulns = audit.get('vulnerabilities', {})
counts = audit.get('metadata', {}).get('vulnerabilities', {})
red_flags = summary.get('red_flags', [])
improvements = summary.get('needs_improvement', [])
goods = summary.get('good', [])
checked_at = summary.get('checked_at') or pages_data.get('checked_at')
try:
    date = dt.datetime.fromisoformat(checked_at.replace('Z', '+00:00')).astimezone(dt.timezone.utc).strftime('%d %B %Y · %H:%M UTC')
except (AttributeError, ValueError):
    date = dt.datetime.now(dt.timezone.utc).strftime('%d %B %Y · %H:%M UTC')
run_id = os.environ.get('GITHUB_RUN_ID')
repo = os.environ.get('GITHUB_REPOSITORY', 'aamodpisat/aamod-p-pisat-photography')
run_url = f'https://github.com/{repo}/actions/runs/{run_id}' if run_id else ''

severity_items = [(name, int(counts.get(name, 0))) for name in ('critical', 'high', 'moderate', 'low')]
severity_tones = {'critical': 'critical', 'high': 'high', 'moderate': 'moderate', 'low': 'olive'}
severity_chart = ''.join(f'<div class="severity-row"><span>{esc(name.title())}</span>{bar(count, max(1, max((c for _, c in severity_items), default=1)), severity_tones[name])}<strong>{count}</strong></div>' for name, count in severity_items)

loaded = [p.get('load_ms', 0) for p in pages if p.get('load_ms')]
avg_load = round(sum(loaded) / len(loaded)) if loaded else 0
issue_count = sum(len(p.get('issues', [])) for p in pages)
image_count = sum(len(p.get('images', [])) for p in pages)
bad_images = sum(not i.get('loaded', False) for p in pages for i in p.get('images', []))
top_pages = sorted(pages, key=lambda p: p.get('load_ms', 0), reverse=True)[:10]
speed_chart = ''.join(f'<div class="speed-row"><span>{esc(p.get("viewport", "?"))} · {esc(p.get("route", "?"))}</span>{bar(p.get("load_ms", 0), max(1, top_pages[0].get("load_ms", 1)))}<strong>{int(p.get("load_ms", 0)) / 1000:.1f}s</strong></div>' for p in top_pages)

alert_cards = []
for tone, title, items in [('critical', 'Red flags', red_flags), ('moderate', 'Needs attention', improvements), ('good', 'What is working', goods)]:
    preview = items[:6]
    content = ''.join(f'<li>{esc(item)}</li>' for item in preview) or '<li>None detected in this run.</li>'
    if len(items) > len(preview): content += f'<li class="muted">+ {len(items) - len(preview)} more in the detailed sections below</li>'
    alert_cards.append(f'<div class="status-card {tone}"><div class="status-title">{pill(len(items), tone)}<h3>{title}</h3></div><ul>{content}</ul></div>')

page_rows = []
for p in sorted(pages, key=lambda x: (x.get('route', ''), x.get('viewport', ''))):
    ms = p.get('load_ms', 0)
    image_kb = round(sum(r.get('bytes', 0) for r in p.get('resources', [])) / 1024)
    problems = len(p.get('issues', []))
    tone = 'critical' if problems else 'moderate' if ms > 5000 else 'good'
    page_rows.append(f'<tr><td><strong>{esc(p.get("route", "?"))}</strong><small>{esc(p.get("viewport", "?"))}</small></td><td>{pill(f"{ms / 1000:.1f}s", tone)}</td><td>{esc(p.get("first_byte_ms", 0))} ms</td><td>{esc(p.get("dom_content_loaded_ms", 0))} ms</td><td>{len(p.get("images", []))}</td><td>{image_kb} KB</td><td>{pill(problems, tone)}</td></tr>')
page_table = '<div class="table-scroll"><table><thead><tr><th>Page / view</th><th>Load</th><th>First byte</th><th>DOM ready</th><th>Images</th><th>Image transfer*</th><th>Issues</th></tr></thead><tbody>' + (''.join(page_rows) or '<tr><td colspan="7">No page results available.</td></tr>') + '</tbody></table></div><p class="footnote">* Cross-origin image transfer sizes can be unavailable to the browser and may show 0 KB.</p>'

slow_images = []
for p in pages:
    for r in p.get('resources', []):
        if r.get('duration_ms', 0): slow_images.append((r['duration_ms'], p.get('route', '?'), p.get('viewport', '?'), r.get('url', '')))
slow_images.sort(reverse=True)
image_rows = ''.join(f'<tr><td><strong>{esc(route)}</strong><small>{esc(view)}</small></td><td title="{esc(url)}" class="truncate">{esc(url.rsplit("/", 1)[-1][:75])}</td><td>{pill(f"{duration / 1000:.1f}s", "moderate" if duration > 3000 else "good")}</td></tr>' for duration, route, view, url in slow_images[:20])
image_table = '<div class="table-scroll"><table><thead><tr><th>Page</th><th>Image</th><th>Load time</th></tr></thead><tbody>' + (image_rows or '<tr><td colspan="3">No image timing data available.</td></tr>') + '</tbody></table></div>'

vuln_cards = []
for name, item in sorted(vulns.items(), key=lambda pair: (['critical','high','moderate','low'].index(pair[1].get('severity', 'low')), pair[0])):
    version = lock.get('packages', {}).get(f'node_modules/{name}', {}).get('version', 'unknown')
    fix = item.get('fixAvailable')
    if isinstance(fix, dict):
        solution = f'Upgrade {fix.get("name", name)} to {fix.get("version", "a patched version")}; run the build and browser checks before release.'
        if fix.get('isSemVerMajor'): solution += ' This is a major-version change and needs migration review.'
    elif fix is True:
        solution = 'Run npm audit fix, inspect the lockfile changes, then rerun npm audit and the site checks.'
    else:
        solution = 'No automated fix is currently listed. Review the linked advisory and the parent dependency for an upgrade or mitigation.'
    advisories = [v for v in item.get('via', []) if isinstance(v, dict)]
    advisory_rows = ''.join(f'<li><a href="{esc(a.get("url", "#"))}">{esc(a.get("title", "Advisory"))}</a><small>Affected: {esc(a.get("range", "unknown"))}</small></li>' for a in advisories)
    via = 'Direct dependency' if item.get('isDirect') else 'Transitive dependency'
    headline_advisories = ''.join(f'<li>{esc(a.get("title", "Advisory"))}</li>' for a in advisories[:2])
    if len(advisories) > 2: headline_advisories += f'<li>+ {len(advisories) - 2} more linked advisories</li>'
    vuln_cards.append(f'<article class="vuln-card"><div class="vuln-heading"><div>{pill(item.get("severity", "unknown").upper(), item.get("severity", "neutral"))}<h3>{esc(name)} <span class="version">{esc(version)}</span></h3><p>{via} · {len(advisories)} linked advisories</p></div></div><ul class="advisory-preview">{headline_advisories}</ul><div class="solution"><strong>Recommended next step</strong><p>{esc(solution)}</p></div><details><summary>View all {len(advisories)} advisories</summary><ol class="advisories">{advisory_rows or "<li>See the npm audit data in the artifact.</li>"}</ol></details></article>')

gallery_cards = []
for p in pages:
    preview = ROOT / p.get('preview', '') if p.get('preview') else None
    if not preview or not preview.is_file(): continue
    source = 'data:image/jpeg;base64,' + base64.b64encode(preview.read_bytes()).decode('ascii')
    screenshot = p.get('screenshot', '')
    full_link = screenshot if screenshot and (ROOT / screenshot).exists() else '#'
    gallery_cards.append(f'<a class="screen" href="{esc(full_link)}"><img src="{source}" alt="Screenshot of {esc(p.get("route", "/"))} on {esc(p.get("viewport", "?"))}"><span><strong>{esc(p.get("route", "/"))}</strong><small>{esc(p.get("viewport", "?"))} · open full screenshot</small></span></a>')

certificate = security.get('certificate', {})
security_grid = ''.join(f'<div><span class="metric-label">{esc(label)}</span><strong>{esc(value)}</strong></div>' for label, value in [('Certificate days left', certificate.get('days_left', 'Unavailable')), ('DNS addresses', ', '.join(security.get('dns_addresses', [])) or 'Unavailable'), ('Observed hosts', len(summary.get('hosts_seen', []))), ('Possible secrets', len(security.get('secret_candidates', [])))])
host_pills = ''.join(pill(host) for host in summary.get('hosts_seen', [])) or 'No host data available.'

css = '''
:root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#f4f3ee;color:#252921;font:15px/1.55 Arial,Helvetica,sans-serif}a{color:#455b3c}.wrap{max-width:1180px;margin:auto;padding:28px 22px 70px}.hero{background:#202a20;color:#fff;border-radius:24px;padding:38px 42px;background-image:radial-gradient(circle at 90% 10%,#58684d 0,transparent 34%)}.hero h1{font:normal 46px/1.08 Georgia,serif;margin:8px 0 12px}.hero p{color:#cdd7c7;margin:0}.eyebrow{text-transform:uppercase;letter-spacing:.2em;font-size:11px;font-weight:700;color:#7a8c6b;margin:0}.hero .eyebrow{color:#b7c9a7}.hero-meta{display:flex;gap:14px;flex-wrap:wrap;margin-top:24px}.hero-meta span{border:1px solid #72816a;border-radius:999px;padding:7px 13px;font-size:12px}.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:20px 0}.kpi,.panel,.status-card{background:#fff;border:1px solid #e7e8e0;box-shadow:0 7px 25px #26351b08;border-radius:18px}.kpi{padding:22px}.kpi strong{display:block;font:normal 34px Georgia,serif;margin:6px 0}.metric-label{display:block;color:#74806d;font-size:11px;text-transform:uppercase;letter-spacing:.13em;font-weight:700}.panel{padding:28px;margin:20px 0}.panel h2{font:normal 29px Georgia,serif;margin:4px 0 22px}.section-head{display:flex;justify-content:space-between;align-items:end}.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px}.status-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.status-card{padding:22px}.status-card.critical{border-top:4px solid #a53c39}.status-card.moderate{border-top:4px solid #b68a36}.status-card.good{border-top:4px solid #527b56}.status-title{display:flex;align-items:center;gap:10px}.status-title h3{margin:0;font:normal 22px Georgia,serif}.status-card ul{padding-left:20px;margin:14px 0 0}.status-card li{margin:7px 0;overflow-wrap:anywhere}.pill{display:inline-block;background:#ebeee6;color:#44513d;border-radius:999px;padding:4px 9px;font-size:11px;font-weight:700;white-space:nowrap}.pill.critical{background:#fbe5e2;color:#9d302d}.pill.high{background:#f9e8e1;color:#9e4b30}.pill.moderate{background:#fbf1d9;color:#8b6624}.pill.good{background:#e4f1e5;color:#2d6939}.severity-row,.speed-row{display:grid;grid-template-columns:90px 1fr 34px;gap:12px;align-items:center;margin:13px 0}.speed-row{grid-template-columns:160px 1fr 42px;font-size:13px}.speed-row span:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bar-track{background:#edf0ea;border-radius:999px;height:10px;display:block;overflow:hidden}.bar{height:100%;display:block;background:#677d58;border-radius:999px}.bar.critical{background:#b5443d}.bar.high{background:#cc7551}.bar.moderate{background:#c7a04c}.table-scroll{overflow-x:auto}table{width:100%;border-collapse:collapse;min-width:670px}th{text-align:left;color:#798477;font-size:11px;text-transform:uppercase;letter-spacing:.12em;padding:13px 10px;border-bottom:1px solid #dfe5dc}td{padding:13px 10px;border-bottom:1px solid #edf0eb;vertical-align:top}td small{display:block;color:#819080;margin-top:2px}tr:last-child td{border-bottom:0}.truncate{max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.footnote,.muted{color:#7a8478;font-size:12px}.vuln-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.vuln-card{border:1px solid #e4e8e0;border-radius:14px;padding:20px;min-width:0}.vuln-card h3{font:normal 22px Georgia,serif;margin:9px 0 3px}.vuln-card p{margin:3px 0;color:#687567;font-size:13px}.version{font:13px Arial,sans-serif;color:#819080}.solution{margin:15px 0;background:#f4f6ef;padding:12px 14px;border-radius:10px}.solution strong{font-size:12px;color:#45583e}.solution p{color:#3f493c}.vuln-card details{font-size:13px}.vuln-card summary{cursor:pointer;color:#435e38;font-weight:700}.advisories{max-height:300px;overflow:auto;padding-left:19px}.advisories li{padding:5px 0;overflow-wrap:anywhere}.advisories small{display:block;color:#869180}.gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:15px}.screen{color:inherit;text-decoration:none;border:1px solid #e5e8df;border-radius:13px;overflow:hidden;background:#fafbf8}.screen img{width:100%;height:160px;object-fit:cover;object-position:top;display:block;background:#edf0ea}.screen span{display:block;padding:10px 12px}.screen strong,.screen small{display:block}.screen small{color:#80907c;font-size:11px}.security-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.security-grid strong{display:block;margin-top:7px;overflow-wrap:anywhere}.hosts{display:flex;gap:7px;flex-wrap:wrap;margin-top:20px}.footer{color:#7d877a;font-size:12px;margin:24px 5px}.button{display:inline-block;background:#fff;color:#293a29;text-decoration:none;border-radius:999px;padding:9px 15px;font-size:12px;font-weight:700;margin-top:18px}@media(max-width:760px){.wrap{padding:12px}.hero{padding:28px}.hero h1{font-size:35px}.kpis,.status-grid,.two-col,.vuln-grid{grid-template-columns:1fr 1fr}.gallery{grid-template-columns:1fr 1fr}.security-grid{grid-template-columns:1fr 1fr}}@media(max-width:500px){.kpis,.status-grid,.two-col,.vuln-grid{grid-template-columns:1fr}.gallery{grid-template-columns:1fr 1fr}}
'''
css += '.advisory-preview{padding-left:18px;font-size:12px;color:#566553;min-height:64px}.advisory-preview li{margin:4px 0}'

run_button = f'<a class="button" href="{esc(run_url)}">Open full report & screenshots →</a>' if run_url else ''
document = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Website health · Aamod Pisat Photography</title><style>{css}</style></head><body><div class="wrap">
<header class="hero"><p class="eyebrow">Aamod P. Pisat Photography · Daily audit</p><h1>Website health, at a glance.</h1><p>{esc(date)} · Live site, desktop and mobile</p><div class="hero-meta"><span>{len(pages)} page visits</span><span>{len(vulns)} affected packages</span><span>{issue_count} page issues</span></div>{run_button}</header>
<div class="kpis"><div class="kpi"><span class="metric-label">Average page load</span><strong>{avg_load / 1000:.1f}s</strong><small>Across successful measurements</small></div><div class="kpi"><span class="metric-label">Images checked</span><strong>{image_count}</strong><small>{bad_images} failed to load</small></div><div class="kpi"><span class="metric-label">Critical + high packages</span><strong>{counts.get('critical', 0) + counts.get('high', 0)}</strong><small>Production dependency audit</small></div><div class="kpi"><span class="metric-label">Layout & load issues</span><strong>{issue_count}</strong><small>Across desktop and mobile</small></div></div>
{section('What needs your attention', 'Overview', '<div class="status-grid">' + ''.join(alert_cards) + '</div>', 'overview')}
<div class="two-col">{section('Dependency severity', 'Security at a glance', severity_chart, 'severity')}{section('Slowest page visits', 'Page speed', speed_chart or '<p>No timing data available.</p>', 'speed')}</div>
{section('Every page, side by side', 'Performance detail', page_table, 'pages')}
{section('Slowest images', 'Image delivery', image_table, 'images')}
{section('Production dependency findings', f'{len(vulns)} affected packages · counts refer to packages, each can have multiple advisories', '<div class="vuln-grid">' + ''.join(vuln_cards) + '</div>' if vuln_cards else '<p>No affected production packages found.</p>', 'dependencies')}
{section('Page screenshots', 'Visual review · desktop and mobile', '<p class="footnote">Preview images are included here. Open a thumbnail for the full screenshot in the downloaded workflow artifact.</p><div class="gallery">' + ''.join(gallery_cards) + '</div>' if gallery_cards else '<p>No screenshots available in this run.</p>', 'screenshots')}
{section('Certificate, DNS & network', 'Infrastructure', '<div class="security-grid">' + security_grid + '</div><p class="eyebrow" style="margin-top:22px">Hosts requested by the site</p><div class="hosts">' + host_pills + '</div>', 'network')}
<p class="footer">Automated findings are signals for review. Load timings are browser measurements, not Lighthouse scores. Source scanning covers tracked files in this checkout, not all git history. Network host observations alone do not prove data leakage.</p>
</div></body></html>'''
(ROOT / 'report.html').write_text(document)
print(f'Created audit/report.html with {len(pages)} page results and {len(vulns)} affected packages')
