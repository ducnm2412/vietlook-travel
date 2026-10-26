# Gộp bản dịch tiếng Trung (<slug>.html + <slug>.meta.json) vào src/data/content-zh.json
# Dùng: python -I -X utf8 scripts/merge-content-zh.py <thư mục out>
import json, os, re, sys
from collections import Counter

out = sys.argv[1]
root = os.path.join(os.path.dirname(__file__), '..', 'src', 'data')
tours = json.load(open(os.path.join(root, 'vietlook.json'), encoding='utf-8'))['tours']
tags = lambda h: Counter(re.findall(r'<(/?\w+)', h))

result, missing, bad = {}, [], []
for t in tours:
    html, meta = (os.path.join(out, t['slug'] + ext) for ext in ('.html', '.meta.json'))
    if not (os.path.exists(html) and os.path.exists(meta)):
        missing.append(t['slug']); continue
    zh = open(html, encoding='utf-8').read()
    if tags(zh) != tags(t.get('contentHtml') or ''): bad.append(t['slug'])
    result[t['slug']] = {'summaryZh': json.load(open(meta, encoding='utf-8')).get('summaryZh'), 'contentHtmlZh': zh}

json.dump(result, open(os.path.join(root, 'content-zh.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'ok {len(result)}/{len(tours)}; thiếu {len(missing)}; lệch thẻ HTML {len(bad)}')
for s in missing: print('missing', s)
for s in bad: print('tags', s)
