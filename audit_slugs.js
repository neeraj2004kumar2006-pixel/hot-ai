import fs from 'fs';
import { initialDummyArticles, initialTechTricks, initialAiTools } from './src/utils/dummyData.js';
import { generateSlug } from './src/utils/helpers.js';

const allContent = [...initialDummyArticles, ...initialTechTricks, ...initialAiTools];

let missingSlugs = 0;
let invalidSlugs = 0;
let routeMismatches = 0;
const slugMap = new Set();
let duplicates = 0;

console.log('--- Slug Validation Audit ---');

allContent.forEach(item => {
  const title = item.title || item.name;
  if (!title) return;
  
  const declaredSlug = item.slug;
  const generatedSlug = generateSlug(title);
  const actualSlugToUse = declaredSlug || generatedSlug;

  if (!declaredSlug) {
    missingSlugs++;
  }

  // Check if it's a valid url safe slug
  if (!/^[a-z0-9-]+$/.test(actualSlugToUse)) {
    invalidSlugs++;
    console.log(`Invalid slug format: ${actualSlugToUse} for title: ${title}`);
  }

  // Check mismatch
  if (declaredSlug && declaredSlug !== generatedSlug) {
    routeMismatches++;
    // console.log(`Mismatch: Declared: [${declaredSlug}] vs Generated: [${generatedSlug}]`);
  }

  // Check duplicates
  if (slugMap.has(actualSlugToUse)) {
    duplicates++;
    console.log(`Duplicate slug found: ${actualSlugToUse}`);
  } else {
    slugMap.add(actualSlugToUse);
  }
});

console.log(`\nAudit Results:`);
console.log(`Total items checked: ${allContent.length}`);
console.log(`Missing explicitly defined slugs: ${missingSlugs}`);
console.log(`Invalid slug formats: ${invalidSlugs}`);
console.log(`Route Mismatches (declared slug differs from title slug): ${routeMismatches}`);
console.log(`Duplicate slugs: ${duplicates}`);
