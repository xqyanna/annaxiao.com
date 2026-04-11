import re

path = r'c:\Users\asus\Desktop\个人网页照片\annaxiao_website\annaxiao_website\interests.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 摄影
content = re.sub(r'<!-- 摄影：大图卡片 7列 -->\s*<a href="gallery.html" class="md:col-span-7 (.*?)" style="text-decoration:none;">',
                 r'<!-- 摄影：5列 -->\n    <a href="gallery.html" class="md:col-span-5 \1" style="text-decoration:none;">', content)
content = re.sub(r'<div class="absolute bottom-0 left-0 p-10 z-20">\s*<span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-lg font-bold mb-3 inline-block">摄影</span>',
                 r'<div class="absolute bottom-0 left-0 p-6 z-20">\n        <span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block">摄影</span>', content)

# 2. 阅读
content = re.sub(r'<!-- 阅读：大图卡片 5列 -->\s*<div class="md:col-span-5 (.*?)">',
                 r'<!-- 阅读：4列 -->\n    <div class="md:col-span-4 \1">', content)
content = re.sub(r'<div class="absolute bottom-0 left-0 p-10 z-20">\s*<span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-lg font-bold mb-3 inline-block">阅读</span>',
                 r'<div class="absolute bottom-0 left-0 p-6 z-20">\n        <span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block">阅读</span>', content)

# 3. 游戏
content = re.sub(r'<!-- 游戏：大图卡片 5列 -->\s*<a href="games.html" class="md:col-span-7 (.*?)" style="text-decoration:none;">',
                 r'<!-- 游戏：3列 -->\n    <a href="games.html" class="md:col-span-3 \1" style="text-decoration:none;">', content)
content = re.sub(r'<div class="relative p-10 h-full flex flex-col justify-end">',
                 r'<div class="relative p-6 h-full flex flex-col justify-end">', content)
content = re.sub(r'<span class="leaf-chip bg-white/15 text-white px-4 py-1 rounded-full text-lg font-bold mb-3 inline-block w-fit">游戏</span>',
                 r'<span class="leaf-chip bg-white/15 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block w-fit">游戏</span>', content)

# 4. 品鉴生活
content = re.sub(r'<!-- 品鉴生活：大图卡片 5列 -->\s*<div class="md:col-span-5 (.*?)">',
                 r'<!-- 品鉴生活：4列 -->\n    <div class="md:col-span-4 \1">', content)
content = re.sub(r'<div class="absolute bottom-0 left-0 p-10 z-20">\s*<span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-lg font-bold mb-3 inline-block">品鉴生活</span>',
                 r'<div class="absolute bottom-0 left-0 p-6 z-20">\n        <span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block">品鉴生活</span>', content)

# 5. 运动
content = re.sub(r'<!-- 运动：大图卡片 5列 -->\s*<div class="md:col-span-5 (.*?)">',
                 r'<!-- 运动：3列 -->\n    <div class="md:col-span-3 \1">', content)
content = re.sub(r'<div class="absolute bottom-0 left-0 p-10 z-20">\s*<span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-lg font-bold mb-3 inline-block">运动</span>',
                 r'<div class="absolute bottom-0 left-0 p-6 z-20">\n        <span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block">运动</span>', content)

# 6. 手帐
content = re.sub(r'<!-- 手帐：大图卡片 7列 -->\s*<div class="md:col-span-7 (.*?)">',
                 r'<!-- 手帐：5列 -->\n    <div class="md:col-span-5 \1">', content)
content = re.sub(r'<div class="absolute bottom-0 left-0 p-10 z-20">\s*<span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-lg font-bold mb-3 inline-block">手帐 · 日记</span>',
                 r'<div class="absolute bottom-0 left-0 p-6 z-20">\n        <span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block">手帐 · 日记</span>', content)

# Make sure all min-h-[400px] or min-h-[350px] are consistent to min-h-[320px] for better horizontal alignment
content = re.sub(r'min-h-\[400px\]', 'min-h-[320px]', content)
content = re.sub(r'min-h-\[350px\]', 'min-h-[320px]', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Success')
