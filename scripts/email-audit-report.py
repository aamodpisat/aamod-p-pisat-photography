import os
import base64
import json
import re
import smtplib
from email.message import EmailMessage
from pathlib import Path

password = os.environ.get('GMAIL_APP_PASSWORD')
recipient = os.environ.get('AUDIT_EMAIL', 'aamodpisat@gmail.com')
if not password:
    print('GMAIL_APP_PASSWORD is not configured; report remains in the workflow artifact.')
    raise SystemExit(0)

body = Path('audit/report.md').read_text()
dashboard = Path('audit/report.html').read_text()
report = json.loads(Path('audit/report.json').read_text())
inline_images = []

def embed_preview(match):
    identifier = f'audit-preview-{len(inline_images) + 1}@aamodpisatphotography.in'
    inline_images.append((identifier, base64.b64decode(match.group(1))))
    return f'src="cid:{identifier}"'

dashboard = re.sub(r'src="data:image/jpeg;base64,([A-Za-z0-9+/=]+)"', embed_preview, dashboard)
run_id = os.environ.get('GITHUB_RUN_ID')
repository = os.environ.get('GITHUB_REPOSITORY', 'aamodpisat/aamod-p-pisat-photography')
if run_id:
    run_url = f'https://github.com/{repository}/actions/runs/{run_id}'
    dashboard = re.sub(r'href="screenshots/[^"]+"', f'href="{run_url}"', dashboard)
message = EmailMessage()
message['Subject'] = 'Daily website audit: ' + ('RED FLAGS' if report.get('red_flags') else 'report')
message['From'] = recipient
message['To'] = recipient
message.set_content(body)
message.add_alternative(dashboard, subtype='html')
html_part = message.get_payload()[-1]
for identifier, data in inline_images:
    html_part.add_related(data, maintype='image', subtype='jpeg', cid=f'<{identifier}>', disposition='inline')
if os.environ.get('AUDIT_EMAIL_DRY_RUN') == '1':
    Path('audit/email-preview.eml').write_bytes(message.as_bytes())
    print(f'Built email preview with {len(inline_images)} inline screenshots')
    raise SystemExit(0)
with smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=30) as smtp:
    smtp.login(recipient, password)
    smtp.send_message(message)
print(f'Sent daily audit to {recipient}')
