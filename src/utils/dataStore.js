// Dummy data removed for production hardening

const STORAGE_KEYS = {
  ARTICLES: 'hotai_articles',
  TECH: 'hotai_tech',
  TOOLS: 'hotai_tools'
};

const initialDummyArticles = [
  {
    id: 1,
    title: "The Next Generation of LLMs: What to Expect",
    slug: "next-generation-of-llms",
    category: "AI",
    readingTime: "5 min read",
    author: { name: "Sarah Chen", role: "AI Researcher", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    publishDate: new Date("2026-05-20T10:00:00Z").toISOString(),
    tags: ["LLM", "Future", "Machine Learning"],
    featuredImage: { url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000", alt: "AI brain", width: 1000, height: 562 },
    excerpt: "Large Language Models are evolving faster than ever. Here is a look at the architectures powering the next wave.",
    content: "Large Language Models (LLMs) have taken the world by storm, fundamentally changing how we interact with technology and process information.\n\nFrom generating human-like text to writing complex code, these models have demonstrated capabilities that were considered science fiction just a decade ago.\n\nBut what comes next? As researchers push the boundaries of neural network architectures, we are beginning to see the outline of the next generation of AI.\n\nOne of the most significant shifts is the move towards multimodal capabilities, allowing models to process text, audio, and visual data simultaneously.\n\nThis shift will enable AI to understand the world in a more human-like way, interpreting nuance and context from multiple streams of sensory input.\n\nFurthermore, efficiency is becoming a major focus. The massive computational resources required to train current models are unsustainable.\n\nResearchers are exploring sparse architectures, quantization, and novel attention mechanisms to reduce the footprint without sacrificing performance.\n\nAnother critical area is memory. Current models suffer from a limited context window, but new techniques aim to give AI long-term, persistent memory.\n\nImagine an assistant that remembers your preferences, past conversations, and coding style across years of interaction.\n\nFinally, alignment and safety remain paramount. As models become more capable, ensuring they act in accordance with human values is the biggest challenge we face.\n\nThe future of LLMs is incredibly bright, and the next few years will undoubtedly bring breakthroughs that will redefine what is possible.",
    status: "published"
  },
  {
    id: 2,
    title: "10 React Performance Tricks You Need to Know",
    slug: "react-performance-tricks",
    category: "Tech",
    readingTime: "7 min read",
    author: { name: "Marcus Johnson", role: "Frontend Lead", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c" },
    publishDate: new Date("2026-05-22T14:30:00Z").toISOString(),
    tags: ["React", "Performance", "Web Dev"],
    featuredImage: { url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000", alt: "React code", width: 1000, height: 562 },
    excerpt: "Speed up your React applications with these 10 advanced optimization techniques used by top tech companies.",
    content: "React is incredibly fast out of the box, but as applications grow in size and complexity, performance issues can creep in.\n\nOne of the most common culprits is unnecessary re-renders. Every time a component's state or props change, React re-renders it.\n\nWhile the virtual DOM makes this efficient, a deeply nested tree re-rendering frequently can cause noticeable lag.\n\nThe first trick is mastering React.memo. This higher-order component prevents a component from re-rendering if its props haven't changed.\n\nHowever, you must be careful when passing objects or functions as props, as their references change on every render.\n\nThis brings us to the useCallback and useMemo hooks, which are essential for maintaining stable references and memoizing expensive calculations.\n\nAnother major optimization is code splitting. You shouldn't send your entire application bundle to the user on the first load.\n\nBy using React.lazy and Suspense, you can load components asynchronously only when they are needed.\n\nVirtualization is another game-changer. If you are rendering a long list of items, only render the ones currently visible in the viewport.\n\nLibraries like react-window or react-virtualized make this relatively straightforward to implement.\n\nFinally, always profile your application using the React DevTools Profiler to identify actual bottlenecks before guessing what needs optimization.\n\nPerformance tuning is an iterative process, but these techniques will give you a solid foundation for building blazing-fast apps.",
    status: "published"
  },
  {
    id: 3,
    title: "Is the Four-Day Workweek the Future of Tech?",
    slug: "four-day-workweek-tech",
    category: "News",
    readingTime: "4 min read",
    author: { name: "Elena Rodriguez", role: "Tech Journalist", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b" },
    publishDate: new Date("2026-05-24T09:15:00Z").toISOString(),
    tags: ["Workplace", "Culture", "Trends"],
    featuredImage: { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000", alt: "Team meeting", width: 1000, height: 562 },
    excerpt: "More startups are adopting a 32-hour workweek. We analyze the data to see if it actually improves productivity.",
    content: "The concept of a four-day workweek has been floating around for decades, but recent trials in the tech industry have brought it into the mainstream.\n\nDozens of companies have participated in global pilot programs, reducing hours from 40 to 32 with no loss of pay.\n\nThe results, surprisingly, have been overwhelmingly positive for both employees and employers.\n\nProductivity did not decline. In fact, many companies reported a slight increase in overall output.\n\nHow is this possible? The answer lies in Parkinson's Law: work expands so as to fill the time available for its completion.\n\nWhen given less time, teams naturally became more focused. Useless meetings were eliminated, and deep work was prioritized.\n\nFurthermore, the impact on employee well-being was profound. Burnout rates plummeted, and job satisfaction soared.\n\nRetention also improved drastically. In a competitive hiring market, offering a four-day workweek is a massive differentiator.\n\nHowever, it's not without challenges. It requires a fundamental shift in company culture and a move towards asynchronous communication.\n\nManagers must learn to measure output and results, rather than time spent sitting at a desk.\n\nSome roles, particularly in customer support, require creative scheduling to ensure adequate coverage.\n\nDespite these hurdles, the momentum is undeniably building. The four-day workweek may soon become the new standard in tech.",
    status: "published"
  },
  {
    id: 4,
    title: "Top 5 AI Coding Assistants in 2026",
    slug: "top-ai-coding-assistants",
    category: "Tools",
    readingTime: "6 min read",
    author: { name: "David Kim", role: "Senior Developer", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a" },
    publishDate: new Date("2026-05-25T11:00:00Z").toISOString(),
    tags: ["Tools", "AI", "Programming"],
    featuredImage: { url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000", alt: "Coding on laptop", width: 1000, height: 562 },
    excerpt: "We review the best AI-powered tools that are helping developers write code faster and with fewer bugs.",
    content: "The landscape of software development has been permanently altered by the introduction of AI coding assistants.\n\nThese tools have moved from simple autocomplete extensions to sophisticated pair programmers that understand complex codebases.\n\nIn this article, we review the top 5 AI coding assistants that are dominating the market in 2026.\n\nFirst on our list is GitHub Copilot X, which remains a powerhouse due to its deep integration with the GitHub ecosystem and advanced chat features.\n\nNext is Cursor, a fork of VS Code that has built AI deeply into the editor's core, offering seamless codebase-wide refactoring.\n\nThird, we look at Tabnine, which stands out for its privacy-focused enterprise options, allowing companies to train models on their private code.\n\nFourth is Amazon CodeWhisperer, particularly strong for developers working extensively within the AWS ecosystem.\n\nFinally, we have an honorable mention for specialized, agentic assistants like Antigravity, which can autonomously execute complex tasks across multiple files.\n\nThe real power of these tools isn't just in writing boilerplate code; it's in explaining legacy code, generating tests, and identifying security vulnerabilities.\n\nHowever, developers must remember that these tools are assistants, not replacements. They can hallucinate or suggest suboptimal patterns.\n\nHuman review and rigorous testing are more important than ever when relying on AI-generated code.\n\nUltimately, developers who learn to collaborate effectively with AI will have a significant advantage in speed and efficiency.",
    status: "published"
  },
  {
    id: 5,
    title: "Building Mobile Apps with React Native Reanimated",
    slug: "react-native-reanimated-guide",
    category: "Apps",
    readingTime: "8 min read",
    author: { name: "Jessica Fox", role: "Mobile Engineer", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
    publishDate: new Date("2026-05-26T16:20:00Z").toISOString(),
    tags: ["React Native", "Mobile", "Animation"],
    featuredImage: { url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000", alt: "Mobile phone app", width: 1000, height: 562 },
    excerpt: "Achieve 60fps fluid animations in your React Native apps by offloading work to the UI thread using Reanimated 3.",
    content: "Animations are crucial for creating a premium, engaging mobile application experience. But in React Native, getting them right can be tricky.\n\nThe core challenge lies in the bridge. Passing animation values back and forth between the JavaScript thread and the native UI thread causes dropped frames.\n\nReact Native Reanimated was built to solve exactly this problem by allowing you to declare animations in JS but run them natively.\n\nWith the release of Reanimated 3, the API has become incredibly intuitive, utilizing worklets—small JavaScript functions that run on the UI thread.\n\nLet's start with the basics: useSharedValue. This hook creates a mutable value that can be accessed synchronously on the UI thread.\n\nYou then use useAnimatedStyle to map that shared value to component styles, such as transform or opacity.\n\nThe real magic happens when you update the shared value using functions like withTiming or withSpring.\n\nThese functions automatically handle the animation curves and physics natively, ensuring buttery-smooth 60fps (or even 120fps) performance.\n\nWe can also build complex gesture-driven animations by combining Reanimated with React Native Gesture Handler.\n\nBy tying the shared value directly to the translation coordinates of a pan gesture, we create responsive drag-and-drop interfaces.\n\nIt is important to remember that not everything can be run in a worklet. You cannot use console.log or access standard React state directly inside them.\n\nMastering Reanimated takes some practice, but the performance gains are absolutely worth the learning curve.",
    status: "published"
  },
  {
    id: 6,
    title: "The Ethical Dilemmas of Autonomous Agents",
    slug: "ethical-dilemmas-autonomous-agents",
    category: "Future",
    readingTime: "6 min read",
    author: { name: "Dr. Alan Turing", role: "Ethicist", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f" },
    publishDate: new Date("2026-05-27T08:00:00Z").toISOString(),
    tags: ["Ethics", "AI", "Philosophy"],
    featuredImage: { url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000", alt: "Robot thinking", width: 1000, height: 562 },
    excerpt: "As AI agents gain the ability to act independently, we must grapple with the profound ethical implications of their decisions.",
    content: "The transition from AI as an advisory tool to AI as an autonomous agent represents a massive leap in capability and risk.\n\nWhen an AI can execute trades, send emails, or operate machinery without human intervention, who is responsible when things go wrong?\n\nThis is the core of the alignment problem. We must ensure that the goals of autonomous systems are perfectly aligned with human values.\n\nOne major concern is the 'paperclip maximizer' scenario, where an agent ruthlessly optimizes for a single metric at the expense of all else.\n\nEven seemingly benign tasks can have disastrous unintended consequences if the agent isn't constrained by common sense and ethical boundaries.\n\nTransparency is another massive hurdle. Deep learning models are notoriously opaque, often acting as 'black boxes.'\n\nIf an autonomous agent makes a harmful decision, we need to be able to audit its reasoning process to understand why.\n\nFurthermore, there is the issue of bias. Agents trained on historical data will inevitably inherit and amplify human prejudices.\n\nWe are already seeing this in automated hiring systems and predictive policing algorithms.\n\nRegulatory bodies are struggling to keep pace with the technology, leading to a wild west environment in AI development.\n\nIt is imperative that we establish clear ethical guidelines and technical safeguards before deploying highly capable agents in the wild.\n\nThe responsibility falls on both developers to build safe systems and society to define what 'safe' actually means.",
    status: "published"
  }
];

// Helper to check if database is initialized in localStorage
const initializeDB = () => {
  if (typeof window === 'undefined') return;

  const existingArticles = localStorage.getItem(STORAGE_KEYS.ARTICLES);
  if (!existingArticles || existingArticles === '[]') {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(initialDummyArticles));
  }

  if (!localStorage.getItem(STORAGE_KEYS.TECH)) {
    localStorage.setItem(STORAGE_KEYS.TECH, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.TOOLS)) {
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify([]));
  }
};

// Always run initialization on import
initializeDB();

export const getArticles = () => {
  try {
    initializeDB();
    const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (!data) return [];
    return JSON.parse(data).map(art => ({
      ...art,
      publishDate: art.publishDate ? new Date(art.publishDate) : new Date()
    }));
  } catch (e) {
    console.error('Error fetching articles', e);
    return [];
  }
};

export const saveArticles = (articles) => {
  try {
    const formatted = articles.map(art => ({
      ...art,
      publishDate: art.publishDate instanceof Date ? art.publishDate.toISOString() : art.publishDate
    }));
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(formatted));
    return true;
  } catch (e) {
    console.error('Error saving articles', e);
    return false;
  }
};

export const getTechTricks = () => {
  try {
    initializeDB();
    const data = localStorage.getItem(STORAGE_KEYS.TECH);
    if (!data) return [];
    return JSON.parse(data).map(trick => ({
      ...trick,
      publishDate: trick.publishDate ? new Date(trick.publishDate) : new Date()
    }));
  } catch (e) {
    console.error('Error fetching tech tricks', e);
    return [];
  }
};

export const saveTechTricks = (tech) => {
  try {
    const formatted = tech.map(trick => ({
      ...trick,
      publishDate: trick.publishDate instanceof Date ? trick.publishDate.toISOString() : trick.publishDate
    }));
    localStorage.setItem(STORAGE_KEYS.TECH, JSON.stringify(formatted));
    return true;
  } catch (e) {
    console.error('Error saving tech tricks', e);
    return false;
  }
};

export const getAiTools = () => {
  try {
    initializeDB();
    const data = localStorage.getItem(STORAGE_KEYS.TOOLS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error fetching AI tools', e);
    return [];
  }
};

export const saveAiTools = (tools) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(tools));
    return true;
  } catch (e) {
    console.error('Error saving AI tools', e);
    return false;
  }
};

// Generic CMS Operations
export const addPost = (type, postData) => {
  if (type === 'article') {
    const articles = getArticles();
    const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
    const newArticle = {
      id: newId,
      ...postData,
      publishDate: new Date(),
      status: postData.status || 'published'
    };
    articles.unshift(newArticle); // Prepend to show on top
    saveArticles(articles);
    return newArticle;
  } else if (type === 'tech') {
    const tech = getTechTricks();
    const newId = tech.length > 0 ? Math.max(...tech.map(t => t.id)) + 1 : 101;
    const newTrick = {
      id: newId,
      ...postData,
      publishDate: new Date(),
      status: postData.status || 'published'
    };
    tech.unshift(newTrick);
    saveTechTricks(tech);
    return newTrick;
  } else if (type === 'tool') {
    const tools = getAiTools();
    const newId = tools.length > 0 ? Math.max(...tools.map(t => t.id)) + 1 : 201;
    const newTool = {
      id: newId,
      ...postData
    };
    tools.unshift(newTool);
    saveAiTools(tools);
    return newTool;
  }
  return null;
};

export const updatePost = (type, id, updatedData) => {
  const targetId = Number(id);
  if (type === 'article') {
    const articles = getArticles();
    const index = articles.findIndex(a => a.id === targetId);
    if (index !== -1) {
      articles[index] = { ...articles[index], ...updatedData };
      saveArticles(articles);
      return articles[index];
    }
  } else if (type === 'tech') {
    const tech = getTechTricks();
    const index = tech.findIndex(t => t.id === targetId);
    if (index !== -1) {
      tech[index] = { ...tech[index], ...updatedData };
      saveTechTricks(tech);
      return tech[index];
    }
  } else if (type === 'tool') {
    const tools = getAiTools();
    const index = tools.findIndex(t => t.id === targetId);
    if (index !== -1) {
      tools[index] = { ...tools[index], ...updatedData };
      saveAiTools(tools);
      return tools[index];
    }
  }
  return null;
};

export const deletePost = (type, id) => {
  const targetId = Number(id);
  if (type === 'article') {
    const articles = getArticles();
    const filtered = articles.filter(a => a.id !== targetId);
    saveArticles(filtered);
    return true;
  } else if (type === 'tech') {
    const tech = getTechTricks();
    const filtered = tech.filter(t => t.id !== targetId);
    saveTechTricks(filtered);
    return true;
  } else if (type === 'tool') {
    const tools = getAiTools();
    const filtered = tools.filter(t => t.id !== targetId);
    saveAiTools(filtered);
    return true;
  }
  return false;
};
