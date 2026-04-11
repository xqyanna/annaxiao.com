const fs = require('fs');

const path = 'c:\\Users\\asus\\Desktop\\个人网页照片\\annaxiao_website\\annaxiao_website\\interests.html';
let content = fs.readFileSync(path, 'utf-8');

// 1. 摄影
content = content.replace(/<!-- 摄影：大图卡片 7列 -->\s*<a href="gallery\.html" class="md:col-span-7 (.*?)" style="text-decoration:none;">/, '<!-- 摄影：5列 -->\n    <a href="gallery.html" class="md:col-span-5 $1" style="text-decoration:none;">');
content = content.replace(/<div class="absolute bottom-0 left-0 p-10 z-20">\s*<span class="leaf-chip bg-white\/20 text-white px-4 py-1 rounded-full text-lg font-bold mb-3 inline-block">摄影<\/span>/, '<div class="absolute bottom-0 left-0 p-6 z-20">\n        <span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block">摄影</span>');

// 2. 阅读
content = content.replace(/<!-- 阅读：大图卡片 5列 -->\s*<div class="md:col-span-5 (.*?)">/, '<!-- 阅读：4列 -->\n    <div class="md:col-span-4 $1">');
content = content.replace(/<div class="absolute bottom-0 left-0 p-10 z-20">\s*<span class="leaf-chip bg-white\/20 text-white px-4 py-1 rounded-full text-lg font-bold mb-3 inline-block">阅读<\/span>/, '<div class="absolute bottom-0 left-0 p-6 z-20">\n        <span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block">阅读</span>');

// 3. 游戏
content = content.replace(/<!-- 游戏：大图卡片 5列 -->\s*<a href="games\.html" class="md:col-span-7 (.*?)" style="text-decoration:none;">/, '<!-- 游戏：3列 -->\n    <a href="games.html" class="md:col-span-3 $1" style="text-decoration:none;">');
content = content.replace(/<div class="relative p-10 h-full flex flex-col justify-end">/, '<div class="relative p-6 h-full flex flex-col justify-end">');
content = content.replace(/<span class="leaf-chip bg-white\/15 text-white px-4 py-1 rounded-full text-lg font-bold mb-3 inline-block w-fit">游戏<\/span>/, '<span class="leaf-chip bg-white/15 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block w-fit">游戏</span>');

// 4. 品鉴生活
content = content.replace(/<!-- 品鉴生活：大图卡片 5列 -->\s*<div class="md:col-span-5 (.*?)">/, '<!-- 品鉴生活：4列 -->\n    <div class="md:col-span-4 $1">');
content = content.replace(/<div class="absolute bottom-0 left-0 p-10 z-20">\s*<span class="leaf-chip bg-white\/20 text-white px-4 py-1 rounded-full text-lg font-bold mb-3 inline-block">品鉴生活<\/span>/, '<div class="absolute bottom-0 left-0 p-6 z-20">\n        <span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block">品鉴生活</span>');

// 5. 运动
content = content.replace(/<!-- 运动：大图卡片 5列 -->\s*<div class="md:col-span-5 (.*?)">/, '<!-- 运动：3列 -->\n    <div class="md:col-span-3 $1">');
content = content.replace(/<div class="absolute bottom-0 left-0 p-10 z-20">\s*<span class="leaf-chip bg-white\/20 text-white px-4 py-1 rounded-full text-lg font-bold mb-3 inline-block">运动<\/span>/, '<div class="absolute bottom-0 left-0 p-6 z-20">\n        <span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block">运动</span>');

// 6. 手帐
content = content.replace(/<!-- 手帐：大图卡片 7列 -->\s*<div class="md:col-span-7 (.*?)">/, '<!-- 手帐：5列 -->\n    <div class="md:col-span-5 $1">');
content = content.replace(/<div class="absolute bottom-0 left-0 p-10 z-20">\s*<span class="leaf-chip bg-white\/20 text-white px-4 py-1 rounded-full text-lg font-bold mb-3 inline-block">手帐 · 日记<\/span>/, '<div class="absolute bottom-0 left-0 p-6 z-20">\n        <span class="leaf-chip bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 inline-block">手帐 · 日记</span>');

content = content.replace(/min-h-\[400px\]/g, 'min-h-[320px]');
content = content.replace(/min-h-\[350px\]/g, 'min-h-[320px]');

fs.writeFileSync(path, content, 'utf-8');
console.log('Done');
