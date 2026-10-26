# Gộp bản dịch tiếng Trung bài viết (<slug>.html + <slug>.meta.json) vào src/data/post-content-zh.json
# Dùng: python -I -X utf8 scripts/merge-post-content-zh.py <thư mục out>
import json, os, re, sys
from collections import Counter

out = sys.argv[1]
root = os.path.join(os.path.dirname(__file__), '..', 'src', 'data')
posts = json.load(open(os.path.join(root, 'vietlook.json'), encoding='utf-8'))['posts']
tags = lambda h: Counter(re.findall(r'<(/?\w+)', h))

result, missing, bad = {}, [], []
for p in posts:
    html, meta = (os.path.join(out, p['slug'] + ext) for ext in ('.html', '.meta.json'))
    if not (os.path.exists(html) and os.path.exists(meta)):
        missing.append(p['slug']); continue
    zh = open(html, encoding='utf-8').read()
    if tags(zh) != tags(p.get('contentHtml') or ''): bad.append(p['slug'])
    result[p['slug']] = {'excerptZh': json.load(open(meta, encoding='utf-8')).get('excerptZh'), 'contentHtmlZh': zh}

json.dump(result, open(os.path.join(root, 'post-content-zh.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'ok {len(result)}/{len(posts)}; thiếu {len(missing)}; lệch thẻ HTML {len(bad)}')
for s in missing: print('missing', s)
for s in bad: print('tags', s)
