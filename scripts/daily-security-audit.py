import datetime as dt
import json
import re
import socket
import ssl
import subprocess
from pathlib import Path

root = Path('audit')
root.mkdir(exist_ok=True)
result = {'secret_candidates': [], 'certificate': {}, 'dns_addresses': [], 'errors': []}
patterns = [
    ('private key', re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----')),
    ('cloud access key', re.compile(r'AKIA[0-9A-Z]{16}')),
    ('GitHub token', re.compile(r'gh[pousr]_[A-Za-z0-9_]{30,}')),
    ('Contentstack delivery token assignment', re.compile(r'CONTENTSTACK_DELIVERY_TOKEN\s*[:=]\s*["\x27]?[A-Za-z0-9_-]{20,}', re.I)),
]
tracked = subprocess.check_output(['git', 'ls-files', '-z']).decode().split('\0')
for name in tracked:
    if not name or name.endswith(('package-lock.json', '.png', '.jpg', '.jpeg', '.webp', '.pdf')):
        continue
    path = Path(name)
    try:
        if path.stat().st_size > 2_000_000:
            continue
        for number, line in enumerate(path.read_text(errors='ignore').splitlines(), 1):
            if 'your_delivery_token_here' in line:
                continue
            for label, pattern in patterns:
                if pattern.search(line):
                    result['secret_candidates'].append({'file': name, 'line': number, 'type': label})
    except (OSError, UnicodeError):
        pass

host = 'www.aamodpisatphotography.in'
try:
    result['dns_addresses'] = sorted({item[4][0] for item in socket.getaddrinfo(host, 443, type=socket.SOCK_STREAM)})
    with socket.create_connection((host, 443), timeout=15) as raw:
        with ssl.create_default_context().wrap_socket(raw, server_hostname=host) as connection:
            cert = connection.getpeercert()
            expiry = dt.datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z').replace(tzinfo=dt.timezone.utc)
            result['certificate'] = {'expires_at': expiry.isoformat(), 'days_left': (expiry - dt.datetime.now(dt.timezone.utc)).days, 'issuer': dict(x[0] for x in cert.get('issuer', []))}
except Exception as error:
    result['errors'].append(f'TLS/DNS check failed: {error}')

(root / 'security.json').write_text(json.dumps(result, indent=2))
