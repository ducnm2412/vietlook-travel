# Gộp bản dịch tour tiếng Việt sang tiếng Anh (<slug>.html + <slug>.meta.json) vào src/data/content-en.json
# Dùng: python -I -X utf8 scripts/merge-content-en.py <thư mục out>
import json, os, re, sys
from collections import Counter

out = sys.argv[1]
root = os.path.join(os.path.dirname(__file__), '..', 'src', 'data')
posts = json.load(open(os.path.join(root, 'vietlook.json'), encoding='utf-8'))['tours']
tags = lambda h: Counter(re.findall(r'<(/?\w+)', h))

result, missing, bad = {}, [], []
for p in posts:
    if not os.path.exists(os.path.join(out, p['slug'] + '.html')): continue
    html, meta = (os.path.join(out, p['slug'] + ext) for ext in ('.html', '.meta.json'))
    if not (os.path.exists(html) and os.path.exists(meta)):
        missing.append(p['slug']); continue
    zh = open(html, encoding='utf-8').read()
    if tags(zh) != tags(p.get('contentHtml') or ''): bad.append(p['slug'])
    result[p['slug']] = {'summaryEn': json.load(open(meta, encoding='utf-8')).get('summaryEn'), 'contentHtmlEn': zh}

json.dump(result, open(os.path.join(root, 'content-en.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'ok {len(result)}/{len(posts)}; thiếu {len(missing)}; lệch thẻ HTML {len(bad)}')
for s in missing: print('missing', s)
for s in bad: print('tags', s)
