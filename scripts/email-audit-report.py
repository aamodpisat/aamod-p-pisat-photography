import os
import smtplib
from email.message import EmailMessage
from pathlib import Path

password = os.environ.get('GMAIL_APP_PASSWORD')
recipient = os.environ.get('AUDIT_EMAIL', 'aamodpisat@gmail.com')
if not password:
    print('GMAIL_APP_PASSWORD is not configured; report remains in the workflow artifact.')
    raise SystemExit(0)

body = Path('audit/report.md').read_text()
message = EmailMessage()
message['Subject'] = 'Daily website audit: ' + ('RED FLAGS' if '## Red flags\n- None detected' not in body else 'report')
message['From'] = recipient
message['To'] = recipient
message.set_content(body)
with smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=30) as smtp:
    smtp.login(recipient, password)
    smtp.send_message(message)
print(f'Sent daily audit to {recipient}')
