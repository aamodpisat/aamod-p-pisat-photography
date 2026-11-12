import datetime as dt
import json
from pathlib import Path

root = Path('audit')

def load(name, default):
    try:
        return json.loads((root / name).read_text())
    except (OSError, ValueError):
        return default

pages = load('pages.json', {'pages': [], 'errors': ['Live browser audit did not produce a result']})
security = load('security.json', {'errors': ['Security audit did not produce a result']})
dependencies = load('npm-audit.json', {})
vulnerabilities = dependencies.get('metadata', {}).get('vulnerabilities', {})
red = []
improve = []
good = []

for error in pages.get('errors', []): red.append(f'Browser audit: {error}')
for error in security.get('errors', []): red.append(f'Security: {error}')
if not dependencies.get('metadata'): red.append('Production dependency audit did not produce a result')
for finding in security.get('secret_candidates', []): red.append(f'Possible {finding["type"]} in {finding["file"]}:{finding["line"]}; verify and rotate if genuine')
days = security.get('certificate', {}).get('days_left')
if days is not None:
    (red if days < 14 else improve if days < 30 else good).append(f'TLS certificate expires in {days} days')
for level in ('critical', 'high'):
    if vulnerabilities.get(level, 0): red.append(f'{vulnerabilities[level]} {level} production dependency vulnerabilities')
if vulnerabilities.get('moderate', 0): improve.append(f'{vulnerabilities["moderate"]} moderate production dependency vulnerabilities')

checked = pages.get('pages', [])
for page in checked:
    key = f'{page.get("viewport", "?")} {page.get("route", "?")}'
    for issue in page.get('issues', []): red.append(f'{key}: {issue}')
    if page.get('load_ms', 0) > 5000: improve.append(f'{key}: load took {page["load_ms"]} ms')
    for image in page.get('images', []):
        if not image.get('loaded', True): continue
        if image.get('displayed', 0) > 0 and image.get('width', 0) < image['displayed'] * .8:
            improve.append(f'{key}: low resolution image {image["url"]}')
    for image in page.get('resources', []):
        if image.get('duration_ms', 0) > 3000: improve.append(f'{key}: image took {image["duration_ms"]} ms: {image["url"]}')
if checked and not any(page.get('issues') for page in checked): good.append(f'All {len(checked)} desktop/mobile page visits passed basic loading and layout checks')
if not security.get('secret_candidates'): good.append('No tracked source matched the known credential patterns')
if not vulnerabilities.get('critical', 0) and not vulnerabilities.get('high', 0): good.append('No high or critical production dependency advisory reported')

hosts = sorted({host for page in checked for host in page.get('hosts', [])})
expected_hosts = {'www.aamodpisatphotography.in', 'aamodpisatphotography.in', 'images.contentstack.io', 'i.ytimg.com', 'fonts.googleapis.com', 'fonts.gstatic.com', 'www.youtube-nocookie.com', 'www.youtube.com'}
unrecognized = [host for host in hosts if host not in expected_hosts]
for host in unrecognized: improve.append(f'Unrecognized network host; review for unintended data sharing: {host}')
report = {'checked_at': dt.datetime.now(dt.timezone.utc).isoformat(), 'pages_checked': len(checked), 'good': good, 'needs_improvement': list(dict.fromkeys(improve)), 'red_flags': list(dict.fromkeys(red)), 'certificate': security.get('certificate', {}), 'dns_addresses': security.get('dns_addresses', []), 'hosts_seen': hosts, 'unrecognized_hosts': unrecognized, 'dependency_vulnerabilities': vulnerabilities}
(root / 'report.json').write_text(json.dumps(report, indent=2))
lines = ['# Daily website audit', '', f'Checked at: {report["checked_at"]}', f'Page visits: {len(checked)}', '', '## Red flags']
lines += [f'- {item}' for item in red] or ['- None detected']
lines += ['', '## Needs improvement'] + ([f'- {item}' for item in report['needs_improvement']] or ['- None detected'])
lines += ['', '## Good'] + ([f'- {item}' for item in good] or ['- No passing checks recorded'])
lines += ['', '## Page speed and images', '', '| View | Page | Load | First byte | DOM ready | Images | Image transfer | Issues |', '| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |']
for page in checked:
    image_kb = round(sum(item.get('bytes', 0) for item in page.get('resources', [])) / 1024)
    lines.append(f'| {page.get("viewport", "?")} | {page.get("route", "?")} | {page.get("load_ms", 0)} ms | {page.get("first_byte_ms", 0)} ms | {page.get("dom_content_loaded_ms", 0)} ms | {len(page.get("images", []))} | {image_kb} KB | {len(page.get("issues", []))} |')
lines += ['', '## Security and network', '', f'Certificate: {report["certificate"]}', f'DNS addresses: {", ".join(report["dns_addresses"])}', f'Observed hosts: {", ".join(report["hosts_seen"])}', '', 'These are automated signals, not a penetration test or visual judgement of every element. Screenshots and raw JSON are in the workflow artifact. Inspect any red flag before changing production code.']
(root / 'report.md').write_text('\n'.join(lines) + '\n')
print('\n'.join(lines[:30]))
