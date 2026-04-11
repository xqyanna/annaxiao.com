const fs = require('fs');
const path = require('path');

const cssToAdd = `
  .contact-tooltip-container { position: relative; display: inline-block; cursor: pointer; }
  .contact-tooltip-content {
    visibility: hidden; opacity: 0;
    position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%) translateY(10px);
    background: rgba(253, 251, 247, 0.95);
    border: 1px solid rgba(134,78,90,0.1);
    box-shadow: 0 10px 25px rgba(134,78,90,0.15);
    color: #514345;
    padding: 8px 16px;
    border-radius: 12px;
    font-size: 0.875rem;
    white-space: nowrap;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    pointer-events: none;
    z-index: 100;
  }
  .contact-tooltip-container:hover .contact-tooltip-content {
    visibility: visible; opacity: 1; transform: translateX(-50%) translateY(-8px);
  }
  .contact-modal-overlay {
    position: fixed; inset: 0; background: rgba(26,28,28,0.4); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
    display: flex; justify-content: center; align-items: center;
    opacity: 0; visibility: hidden;
    transition: all 0.3s ease;
    z-index: 9999;
  }
  .contact-modal-overlay.active { opacity: 1; visibility: visible; }
  .contact-modal-content {
    background: #fdfbf7;
    border-radius: 24px;
    padding: 32px 40px;
    box-shadow: 0 24px 48px rgba(134,78,90,0.2);
    transform: scale(0.95) translateY(20px);
    transition: all 0.4s cubic-bezier(0.22,0.68,0,1.2);
    text-align: center;
    position: relative;
    max-width: 90%;
    width: 360px;
  }
  .contact-modal-overlay.active .contact-modal-content { transform: scale(1) translateY(0); }
  .contact-modal-close {
    position: absolute; top: 16px; right: 20px;
    font-size: 24px; color: #d6c2c4; cursor: pointer; transition: color 0.2s;
  }
  .contact-modal-close:hover { color: #864e5a; }
`;

const htmlToAdd = `
<!-- Contact Modal -->
<div id="contactModal" class="contact-modal-overlay" onclick="closeContactModal(event)">
  <div class="contact-modal-content font-body" onclick="event.stopPropagation()">
    <span class="contact-modal-close" onclick="closeContactModal(event)">&times;</span>
    <div class="w-12 h-12 rounded-full bg-primary-container/30 flex items-center justify-center mx-auto mb-4">
      <span class="text-primary text-xl">👋</span>
    </div>
    <h3 class="font-headline text-2xl font-medium text-on-surface mb-2">联系我</h3>
    <p class="text-sm text-on-surface-variant mb-6">期待与你的交流</p>
    <div class="flex flex-col gap-3 text-left">
      <div class="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 flex items-center justify-between">
        <span class="text-sm font-medium text-on-surface-variant">微信 WeChat</span>
        <span class="text-sm text-primary font-semibold select-all">X7cAnna</span>
      </div>
      <div class="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 flex items-center justify-between">
        <span class="text-sm font-medium text-on-surface-variant">邮箱 Email</span>
        <span class="text-sm text-primary font-semibold select-all">xqyanna@163.com</span>
      </div>
    </div>
  </div>
</div>
<script>
  function openContactModal(e) {
    if(e) e.preventDefault();
    document.getElementById('contactModal').classList.add('active');
  }
  function closeContactModal(e) {
    if(e) e.preventDefault();
    document.getElementById('contactModal').classList.remove('active');
  }
</script>
`;

const footerReplacement = `    <div class="flex gap-8">
      <div class="contact-tooltip-container">
        <span class="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">WeChat</span>
        <div class="contact-tooltip-content font-body">微信：X7cAnna</div>
      </div>
      <div class="contact-tooltip-container">
        <span class="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">Email</span>
        <div class="contact-tooltip-content font-body">邮箱：xqyanna@163.com</div>
      </div>
    </div>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Add CSS before </style>
  if (!content.includes('.contact-tooltip-container')) {
    content = content.replace('</style>', cssToAdd + '\n</style>');
  }

  // For gallery and games, their footer structure might not be flex gap-8.
  // Let's check if they have <div class="flex gap-8">
  // If not, we can replace the first <div class="max-w-7xl ..."> contents.
  if (content.includes('<div class="flex gap-8">')) {
      const footerRegex = /<div class="flex gap-8">[\s\S]*?<\/div>/;
      content = content.replace(footerRegex, footerReplacement);
  } else {
      // For gallery and games that might not have the social links.
      // We will insert the flex gap-8 above the Anna Xiao name.
      const nameRegex = /<p class="font-semibold text-lg text-primary font-body">Anna Xiao<\/p>/;
      if (content.match(nameRegex) && !content.includes('contact-tooltip-container')) {
          content = content.replace(nameRegex, footerReplacement + '\n    <p class="font-semibold text-lg text-primary font-body">Anna Xiao</p>');
      }
  }

  // Add modal HTML before </body>
  if (!content.includes('id="contactModal"')) {
    content = content.replace('</body>', htmlToAdd + '\n</body>');
  }

  // Replace mailto links
  const mailtoRegex = /href="mailto:[^"]+"/g;
  content = content.replace(mailtoRegex, 'href="#" onclick="openContactModal(event)"');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
});
