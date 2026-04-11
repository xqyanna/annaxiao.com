const fs = require('fs');

const path = 'c:\\Users\\asus\\Desktop\\个人网页照片\\annaxiao_website\\annaxiao_website\\interests.html';
let content = fs.readFileSync(path, 'utf-8');

// The current layout is:
// Row 1: 摄影(5), 阅读(4), 游戏(3)
// Row 2: 品鉴生活(4), 运动(3), 手帐(5)

// The new desired layout is:
// Row 1: 摄影(5), 阅读(4), 手帐(3)
// Row 2: 品鉴生活(3), 运动(5), 游戏(4)

// We need to extract the HTML blocks for 游戏, 品鉴生活, 运动, and 手帐.
// To do this reliably, we'll use string manipulation.

const extractBlock = (content, startMarker, endMarker) => {
    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) return null;
    
    // We need to find the matching closing tag for the main container.
    // For 游戏, it's </a>. For others, it's </div>.
    // Actually, looking at the code, we can just split by the comments.
    return '';
};

// Instead of regex which can be tricky with multiline, let's split by sections.
const sectionMatches = {
    'photography': /<!-- 摄影：5列 -->[\s\S]*?(?=<!-- 阅读：4列 -->)/,
    'reading': /<!-- 阅读：4列 -->[\s\S]*?(?=<!-- 游戏：3列 -->)/,
    'game': /<!-- 游戏：3列 -->[\s\S]*?(?=<!-- 品鉴生活：4列 -->)/,
    'life': /<!-- 品鉴生活：4列 -->[\s\S]*?(?=<!-- 运动：3列 -->)/,
    'sports': /<!-- 运动：3列 -->[\s\S]*?(?=<!-- 手帐：5列 -->)/,
    'journal': /<!-- 手帐：5列 -->[\s\S]*?(?=<!-- AI探索：大图卡片 12列 -->)/
};

const blocks = {};
for (const [key, regex] of Object.entries(sectionMatches)) {
    const match = content.match(regex);
    if (match) {
        blocks[key] = match[0];
    } else {
        console.error('Failed to match', key);
    }
}

// Modify classes
blocks['game'] = blocks['game']
    .replace('<!-- 游戏：3列 -->', '<!-- 游戏：4列 -->')
    .replace('md:col-span-3', 'md:col-span-4');

blocks['life'] = blocks['life']
    .replace('<!-- 品鉴生活：4列 -->', '<!-- 品鉴生活：3列 -->')
    .replace('md:col-span-4', 'md:col-span-3');

blocks['sports'] = blocks['sports']
    .replace('<!-- 运动：3列 -->', '<!-- 运动：5列 -->')
    .replace('md:col-span-3', 'md:col-span-5');

blocks['journal'] = blocks['journal']
    .replace('<!-- 手帐：5列 -->', '<!-- 手帐：3列 -->')
    .replace('md:col-span-5', 'md:col-span-3');

// Reconstruct the section
const beforeGrid = content.substring(0, content.indexOf('<!-- 摄影：5列 -->'));
const afterGrid = content.substring(content.indexOf('<!-- AI探索：大图卡片 12列 -->'));

const newGrid = 
    blocks['photography'] +
    blocks['reading'] +
    blocks['journal'] +
    blocks['life'] +
    blocks['sports'] +
    blocks['game'];

const newContent = beforeGrid + newGrid + afterGrid;

fs.writeFileSync(path, newContent, 'utf-8');
console.log('Done');
