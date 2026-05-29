const fs = require('fs');
const path = require('path');

// Simulate the logic in helpers.js to generate slug
function generateSlug(text) {
  if (!text) return '';
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function getArticleSlug(article) {
  if (article.slug) return article.slug;
  const title = article.title || article.name || '';
  return generateSlug(title);
}

// Load data manually from dummyData.js because dataStore loads from localStorage
const dummyDataFile = path.join(__dirname, 'src', 'utils', 'dummyData.js');
let dummyDataCode = fs.readFileSync(dummyDataFile, 'utf8');

// Quick and dirty extraction
let initialArticles = [];
let initialTechTricks = [];
let initialAiTools = [];

try {
  // Use a hacky eval to get the data out
  const codeToEval = dummyDataCode.replace(/export const/g, 'const') + `\nmodule.exports = { initialDummyArticles, initialTechTricks, initialAiTools };`;
  const module = { exports: {} };
  eval(codeToEval);
  initialArticles = module.exports.initialDummyArticles || [];
  initialTechTricks = module.exports.initialTechTricks || [];
  initialAiTools = module.exports.initialAiTools || [];
} catch (e) {
  console.error("Error evaluating dummyData", e);
}

console.log(`Found ${initialArticles.length} Articles`);
console.log(`Found ${initialTechTricks.length} Tech Tricks`);
console.log(`Found ${initialAiTools.length} AI Tools`);

const allContent = [...initialArticles, ...initialTechTricks, ...initialAiTools];

let broken = 0;
let duplicates = 0;
let slugs = new Set();

allContent.forEach(item => {
  const slug = getArticleSlug(item);
  if (!slug) {
    console.log(`[BROKEN] Missing slug for ID ${item.id}`);
    broken++;
  } else {
    if (slugs.has(slug)) {
      console.log(`[DUPLICATE] Duplicate slug: ${slug} (ID: ${item.id})`);
      duplicates++;
    } else {
      slugs.add(slug);
    }
  }
});

console.log(`\nScan complete. ${broken} broken, ${duplicates} duplicates.\n`);

// Let's also check if the URL '/article/windows-11-advanced-power-user-hacks' exists
const testSlug = 'windows-11-advanced-power-user-hacks';
const foundInArticles = initialArticles.find(a => getArticleSlug(a) === testSlug);
const foundInTechTricks = initialTechTricks.find(a => getArticleSlug(a) === testSlug);
const foundInAiTools = initialAiTools.find(a => getArticleSlug(a) === testSlug);

console.log(`Looking for test slug: ${testSlug}`);
console.log(`  In Articles: ${foundInArticles ? 'YES (id: '+foundInArticles.id+')' : 'NO'}`);
console.log(`  In Tech Tricks: ${foundInTechTricks ? 'YES (id: '+foundInTechTricks.id+')' : 'NO'}`);
console.log(`  In AI Tools: ${foundInAiTools ? 'YES (id: '+foundInAiTools.id+')' : 'NO'}`);

