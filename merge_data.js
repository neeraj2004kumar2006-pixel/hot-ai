import fs from 'fs';
import path from 'path';

const dataDir = './src/utils/data';
const dummyDataPath = './src/utils/dummyData.js';

// Read all existing content from dummyData.js
let dummyContent = fs.readFileSync(dummyDataPath, 'utf-8');

// We will extract the 3 arrays using basic regex/eval
// A safer way is to just read the raw files, but since we are generating a new dummyData.js, we can just start fresh or append.
// Actually, it's easier to dynamically import dummyData.js
import { initialDummyArticles, initialTechTricks, initialAiTools } from './src/utils/dummyData.js';

let articles = [...initialDummyArticles];
let techTricks = [...initialTechTricks];
let aiTools = [...initialAiTools];

// Read all batch files
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('batch_') && f.endsWith('.json'));

files.forEach(file => {
  const content = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8'));
  content.forEach(item => {
    // Determine which array it goes to based on category or implicit role
    if (item.category === 'Tech Tricks') {
      // Check for duplicates
      if (!techTricks.find(t => t.id === item.id)) techTricks.push(item);
    } else if (item.category === 'AI Tools' || item.isAiTool || file.includes('batch_7') || file.includes('batch_8') || file.includes('batch_9')) { // assume some batches might be AI Tools
      // If it has category 'AI Tools' but no isAiTool, let's just make it an article with category 'AI Tools', or maybe it is an AI tool.
      // Wait, AI tools have a specific schema (url, pricing, etc).
      // Let's check if it has "pricing" or "website"
      if (item.pricing || item.website || item.category === 'AI Tools' && !item.content) {
        if (!aiTools.find(t => t.id === item.id)) aiTools.push(item);
      } else {
        if (!articles.find(a => a.id === item.id)) articles.push(item);
      }
    } else {
      if (!articles.find(a => a.id === item.id)) articles.push(item);
    }
  });
});

// Function to fix images
const fixImages = (arr) => {
  arr.forEach(item => {
    if (item.featuredImage && item.featuredImage.url && item.featuredImage.url.includes('source.unsplash.com')) {
      item.featuredImage.url = `https://picsum.photos/seed/hotai_${item.id}/1000/562`;
    }
    // Check if tools have logo images to fix
    if (item.logo && item.logo.includes('source.unsplash.com')) {
      item.logo = `https://picsum.photos/seed/logo_${item.id}/150/150`;
    }
  });
};

fixImages(articles);
fixImages(techTricks);
fixImages(aiTools);

// Generate new dummyData.js string
const output = `// Auto-generated from batch merger
export const initialDummyArticles = ${JSON.stringify(articles, null, 2)};

export const initialTechTricks = ${JSON.stringify(techTricks, null, 2)};

export const initialAiTools = ${JSON.stringify(aiTools, null, 2)};
`;

fs.writeFileSync(dummyDataPath, output, 'utf-8');
console.log('Merged successfully! Total Articles:', articles.length, 'TechTricks:', techTricks.length, 'AITools:', aiTools.length);
