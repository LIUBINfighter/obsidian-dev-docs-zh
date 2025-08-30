import { apiReferenceSidebar } from './scripts/generateApiSidebar.js';

console.log('=== Typings API Sidebar Test ===');
console.log('Total groups:', apiReferenceSidebar.length);
console.log('First 3 groups:');
apiReferenceSidebar.slice(0, 3).forEach((group, index) => {
  console.log(`${index + 1}. ${group.text} (${group.items.length} items)`);
  if (group.items.length > 0) {
    console.log(
      `   First item: ${group.items[0].text} -> ${group.items[0].link}`,
    );
  }
});

console.log('\n=== Sample Links Check ===');
console.log('Links should start with: /zh/typings/typescript-api/');
const sampleLinks = apiReferenceSidebar
  .slice(0, 2)
  .flatMap((group) => group.items.slice(0, 2).map((item) => item.link));
sampleLinks.forEach((link) => console.log(link));
