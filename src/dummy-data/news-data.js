export const dummyArticles = [
  {
    id: 1,
    title: "Google DeepMind Achieves Real-Time Protein Folding on Mobile Chips",
    slug: "deepmind-protein-folding-mobile",
    category: "AI News",
    excerpt: "DeepMind's latest AlphaFold iteration runs protein structure prediction directly on smartphone processors, opening the door to on-device biomedical research.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
      alt: "AI neural network visualization",
      width: 1200, height: 675, format: "webp"
    },
    author: { name: "Sarah Nakamura", role: "AI Research Editor", bio: "Former computational biologist covering the intersection of AI and life sciences.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-24'),
    tags: ["deepmind", "protein-folding", "mobile-ai"],
    readingTime: "7 min read",
    content: "Google DeepMind has announced a breakthrough version of AlphaFold that runs entirely on mobile device hardware. The new model, dubbed AlphaFold Nano, compresses the protein structure prediction pipeline into a package small enough for Qualcomm's latest Snapdragon processors.\n\nIn benchmark testing, AlphaFold Nano achieved 94% of the accuracy of its server-based counterpart while completing predictions in under 30 seconds on a standard Android device. The team accomplished this through aggressive model distillation and a novel quantization approach that preserves critical structural accuracy.\n\nThe implications extend well beyond convenience. Researchers in remote field stations, clinics in developing nations, and emergency response teams could soon run protein analysis without cloud connectivity. DeepMind plans to release the model as an open-source SDK by Q3 2026.",
    seoTitle: "DeepMind AlphaFold Nano: Protein Folding on Mobile Devices",
    seoDescription: "Google DeepMind brings protein structure prediction to smartphones with AlphaFold Nano, achieving 94% accuracy on mobile chips.",
    canonicalUrl: "https://hotai.news/articles/deepmind-protein-folding-mobile",
    status: "published"
  },
  {
    id: 2,
    title: "Anthropic's Claude 4 Introduces Persistent Memory Across Conversations",
    slug: "anthropic-claude-4-persistent-memory",
    category: "AI News",
    excerpt: "Claude 4's new memory architecture lets the assistant recall context from previous sessions, fundamentally changing how users interact with AI over time.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1684369175764-a17d18f613a8?w=800&auto=format&fit=crop&q=60",
      alt: "Abstract digital brain concept",
      width: 1200, height: 675, format: "webp"
    },
    author: { name: "David Ortiz", role: "Senior Tech Analyst", bio: "Tracks enterprise AI adoption and large language model developments.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-23'),
    tags: ["claude", "anthropic", "memory"],
    readingTime: "6 min read",
    content: "Anthropic has rolled out Claude 4 with a headline feature that many AI users have been requesting for years: persistent memory. Unlike previous versions where each conversation started from scratch, Claude 4 can now maintain a structured memory bank that persists across sessions.\n\nThe system works through what Anthropic calls Contextual Memory Threads. When users discuss preferences, ongoing projects, or personal details, Claude stores summarized context in an encrypted, user-controlled memory layer. Users can review, edit, or delete any stored memory at any time.\n\nEarly testers report significant productivity gains. Software developers say Claude now remembers their codebase architecture and coding conventions. Writers find it retains their style preferences and ongoing narrative threads without re-explanation.",
    seoTitle: "Claude 4 Persistent Memory: How Anthropic Changed AI Conversations",
    seoDescription: "Anthropic's Claude 4 introduces persistent memory across conversations, enabling long-term context retention for users.",
    canonicalUrl: "https://hotai.news/articles/anthropic-claude-4-persistent-memory",
    status: "published"
  },
  {
    id: 3,
    title: "The Hidden ChatGPT Feature That Saves Developers 3 Hours a Day",
    slug: "chatgpt-hidden-developer-feature",
    category: "ChatGPT",
    excerpt: "Most developers overlook ChatGPT's Project Mode — a workspace feature that maintains full codebase context and generates pull-request-ready patches.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
      alt: "Developer coding on monitor",
      width: 1200, height: 675, format: "webp"
    },
    author: { name: "Priya Sharma", role: "Developer Advocate", bio: "Full-stack developer and technical writer specializing in AI-assisted development workflows.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-22'),
    tags: ["chatgpt", "developer-tools", "productivity"],
    readingTime: "5 min read",
    content: "OpenAI quietly shipped Project Mode in the latest ChatGPT update, and most developers have completely missed it. Unlike standard chat, Project Mode maintains a persistent workspace where you can upload your entire repository structure, define coding standards, and generate context-aware code changes.\n\nThe key difference is scope. In a regular ChatGPT session, the model loses context after a few exchanges. Project Mode indexes your uploaded files and maintains a running understanding of your architecture, dependencies, and conventions throughout the session.\n\nIn our testing across three development teams, Project Mode reduced average debugging time by 40% and eliminated the repetitive context-setting that eats into every AI-assisted coding session. The feature is available to all Plus and Team subscribers.",
    seoTitle: "ChatGPT Project Mode: The Developer Feature You're Missing",
    seoDescription: "Discover ChatGPT's Project Mode — a hidden workspace that maintains full codebase context and saves developers hours daily.",
    canonicalUrl: "https://hotai.news/articles/chatgpt-hidden-developer-feature",
    status: "published"
  },
  {
    id: 4,
    title: "Why Your iPhone Battery Drains Faster After iOS 19 — And How to Fix It",
    slug: "iphone-battery-drain-ios-19-fix",
    category: "Mobile Tips",
    excerpt: "iOS 19's new ambient intelligence features are silently consuming battery. Here are the specific settings to adjust without losing functionality.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=60",
      alt: "iPhone on charging pad",
      width: 1200, height: 675, format: "webp"
    },
    author: { name: "Marcus Rivera", role: "Mobile Optimization Editor", bio: "Specializes in mobile performance tuning and battery optimization across iOS and Android.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-21'),
    tags: ["ios", "battery", "mobile-tips"],
    readingTime: "4 min read",
    content: "If your iPhone battery life dropped noticeably after updating to iOS 19, you are not alone. Apple's latest update introduced several always-on intelligence features that continuously process data in the background, and most of them are enabled by default.\n\nThe biggest culprits are Predictive Routing, which constantly analyzes your location patterns, and Smart Scene Detection, which processes camera feed data even when the camera app is closed. Together, these features can consume 15-25% more battery per day.\n\nTo fix this without downgrading, go to Settings → Privacy → Intelligence Services and disable Predictive Routing. Then navigate to Settings → Camera → Smart Features and toggle off Background Scene Analysis. These two changes alone restored normal battery life for 80% of users in our testing.",
    seoTitle: "Fix iOS 19 Battery Drain: Settings That Actually Work",
    seoDescription: "iOS 19 drains iPhone battery faster due to ambient intelligence features. Learn which settings to disable for better battery life.",
    canonicalUrl: "https://hotai.news/articles/iphone-battery-drain-ios-19-fix",
    status: "published"
  },
  {
    id: 5,
    title: "Meta Open-Sources Its 400B Parameter Model — What This Means for AI",
    slug: "meta-open-source-400b-model",
    category: "AI News",
    excerpt: "Meta's decision to release Llama 4 Ultra under an open license could reshape the competitive landscape between closed and open-source AI development.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
      alt: "Matrix-style data streams",
      width: 1200, height: 675, format: "webp"
    },
    author: { name: "Sarah Nakamura", role: "AI Research Editor", bio: "Former computational biologist covering the intersection of AI and life sciences.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-20'),
    tags: ["meta", "open-source", "llama"],
    readingTime: "8 min read",
    content: "Meta has released Llama 4 Ultra, a 400 billion parameter language model, under a permissive open-source license. The move represents the largest open-weight model release in history and directly challenges the closed-model approach favored by OpenAI and Google.\n\nBenchmark results show Llama 4 Ultra matching or exceeding GPT-4.5 on reasoning, coding, and multilingual tasks. The model supports 128K context windows and includes built-in tool-use capabilities that previously required expensive API integrations.\n\nThe release has already triggered a wave of community fine-tuning efforts. Within 48 hours of launch, over 200 specialized variants appeared on Hugging Face, covering domains from legal analysis to medical diagnosis. Enterprise adoption is expected to accelerate as companies gain the ability to run state-of-the-art AI entirely on their own infrastructure.",
    seoTitle: "Meta Llama 4 Ultra: The 400B Open-Source Model Changing AI",
    seoDescription: "Meta open-sources Llama 4 Ultra, a 400B parameter model rivaling GPT-4.5, reshaping the AI competitive landscape.",
    canonicalUrl: "https://hotai.news/articles/meta-open-source-400b-model",
    status: "published"
  },
  {
    id: 6,
    title: "How to Force 120Hz on Any Android Phone — The Developer Settings Method",
    slug: "force-120hz-android-developer-settings",
    category: "Tech Tricks",
    excerpt: "Most Android phones cap their refresh rate to save battery. This developer settings trick unlocks the full 120Hz experience system-wide.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
      alt: "Close-up of smartphone circuit board",
      width: 1200, height: 675, format: "webp"
    },
    author: { name: "Alex Chen", role: "Android Specialist", bio: "Android power user and custom ROM developer with 10 years of mobile tweaking experience.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-19'),
    tags: ["android", "120hz", "developer-settings"],
    readingTime: "4 min read",
    content: "Many Android phones with 120Hz displays default to adaptive refresh rates that frequently drop to 60Hz. If you want a consistently smooth experience, there is a simple developer settings method to force the highest refresh rate at all times.\n\nFirst, enable Developer Options by going to Settings → About Phone and tapping Build Number seven times. Then navigate to Settings → Developer Options → Force Peak Refresh Rate and toggle it on. This forces your display to maintain its maximum refresh rate regardless of the content being displayed.\n\nKeep in mind that this will increase battery consumption by approximately 10-15%. For the best balance, consider using automation apps like Tasker to enable peak refresh rate only during specific activities like gaming or scrolling social media.",
    seoTitle: "Force 120Hz on Android: Developer Settings Method Explained",
    seoDescription: "Unlock your Android phone's full 120Hz refresh rate using this simple developer settings trick for smoother scrolling.",
    canonicalUrl: "https://hotai.news/articles/force-120hz-android-developer-settings",
    status: "published"
  },
  {
    id: 7,
    title: "ChatGPT Advanced Voice Mode Now Understands Emotional Context",
    slug: "chatgpt-voice-emotional-context",
    category: "ChatGPT",
    excerpt: "OpenAI's updated voice mode can detect frustration, excitement, and uncertainty in your tone, adjusting its responses accordingly.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60",
      alt: "Humanoid robot face close-up",
      width: 1200, height: 675, format: "webp"
    },
    author: { name: "David Ortiz", role: "Senior Tech Analyst", bio: "Tracks enterprise AI adoption and large language model developments.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-18'),
    tags: ["chatgpt", "voice", "emotional-ai"],
    readingTime: "5 min read",
    content: "OpenAI has shipped a major update to ChatGPT's Advanced Voice Mode that introduces emotional context awareness. The system now analyzes vocal patterns including pitch variation, speaking speed, and pause duration to infer the user's emotional state and adjust its responses.\n\nWhen the system detects frustration, it simplifies its responses, offers step-by-step guidance, and adopts a more patient conversational tone. When it picks up excitement or enthusiasm, it matches the energy with more detailed and exploratory responses.\n\nOpenAI emphasizes that no audio recordings are stored and emotional inference happens entirely on-device. The feature is available to all ChatGPT Plus subscribers on iOS and Android, with desktop support expected within the month.",
    seoTitle: "ChatGPT Voice Mode Now Reads Emotional Context in Your Voice",
    seoDescription: "OpenAI updates ChatGPT Advanced Voice Mode with emotional context detection, adjusting responses based on user tone.",
    canonicalUrl: "https://hotai.news/articles/chatgpt-voice-emotional-context",
    status: "published"
  },
  {
    id: 8,
    title: "Samsung Galaxy S26 Ultra Leak Reveals On-Device AI Processing Engine",
    slug: "samsung-s26-ultra-on-device-ai",
    category: "Mobile Tips",
    excerpt: "Leaked specifications suggest Samsung's next flagship will include a dedicated neural processing unit capable of running 7B parameter models locally.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
      alt: "Futuristic technology concept",
      width: 1200, height: 675, format: "webp"
    },
    author: { name: "Marcus Rivera", role: "Mobile Optimization Editor", bio: "Specializes in mobile performance tuning and battery optimization across iOS and Android.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-17'),
    tags: ["samsung", "galaxy-s26", "on-device-ai"],
    readingTime: "5 min read",
    content: "Reliable leaker Ice Universe has shared detailed specifications of the Samsung Galaxy S26 Ultra, and the standout feature is a dedicated AI processing engine built directly into the Exynos 2600 chipset. The Neural Processing Unit can reportedly run language models up to 7 billion parameters entirely on-device.\n\nThis means Galaxy AI features like real-time translation, document summarization, and photo editing would work without any cloud connectivity. Samsung's internal testing documents show response times under 500 milliseconds for most AI tasks, comparable to cloud-based processing.\n\nThe device is expected to launch in January 2027 with 16GB of RAM specifically to support on-device model execution. Samsung has reportedly partnered with both Google and Qualcomm to optimize the AI runtime environment.",
    seoTitle: "Samsung Galaxy S26 Ultra: On-Device AI Engine Leaked",
    seoDescription: "Leaked Samsung Galaxy S26 Ultra specs reveal a dedicated NPU capable of running 7B parameter AI models locally.",
    canonicalUrl: "https://hotai.news/articles/samsung-s26-ultra-on-device-ai",
    status: "published"
  },
  {
    id: 9,
    title: "Cursor vs Windsurf vs GitHub Copilot: Which AI Code Editor Actually Ships Faster",
    slug: "cursor-vs-windsurf-vs-copilot-comparison",
    category: "AI Tools",
    excerpt: "We tested three AI-powered code editors on real production tasks across five languages. The results surprised us.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=60",
      alt: "Code on computer screen",
      width: 1200, height: 675, format: "webp"
    },
    author: { name: "Priya Sharma", role: "Developer Advocate", bio: "Full-stack developer and technical writer specializing in AI-assisted development workflows.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-16'),
    tags: ["cursor", "copilot", "code-editors"],
    readingTime: "9 min read",
    content: "We spent two weeks testing Cursor, Windsurf, and GitHub Copilot on identical production tasks across Python, TypeScript, Go, Rust, and SQL. Each editor was evaluated on code completion accuracy, multi-file refactoring capability, debugging assistance, and overall time-to-ship.\n\nCursor excelled at large-scale refactoring and understanding project-wide context. Its ability to process entire repositories and suggest coordinated changes across multiple files was significantly ahead of the competition. However, it occasionally over-engineered simple tasks.\n\nGitHub Copilot remained the fastest for single-file completion and inline suggestions, particularly in TypeScript and Python. Windsurf surprised us with the best debugging experience and the most intuitive conversational interface for exploring unfamiliar codebases.",
    seoTitle: "Cursor vs Windsurf vs Copilot: AI Code Editor Comparison 2026",
    seoDescription: "Head-to-head comparison of Cursor, Windsurf, and GitHub Copilot on real production tasks across five programming languages.",
    canonicalUrl: "https://hotai.news/articles/cursor-vs-windsurf-vs-copilot-comparison",
    status: "published"
  },
  {
    id: 10,
    title: "The ADB Commands Every Android Power User Should Know in 2026",
    slug: "essential-adb-commands-2026",
    category: "Tech Tricks",
    excerpt: "From debloating carrier software to enabling hidden display modes, these ADB commands unlock capabilities your phone manufacturer does not advertise.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60",
      alt: "Terminal command line interface",
      width: 1200, height: 675, format: "webp"
    },
    author: { name: "Alex Chen", role: "Android Specialist", bio: "Android power user and custom ROM developer with 10 years of mobile tweaking experience.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-15'),
    tags: ["adb", "android", "power-user"],
    readingTime: "6 min read",
    content: "Android Debug Bridge remains the most powerful tool in any Android power user's arsenal. With the right commands, you can remove pre-installed bloatware, override system settings, and enable features that are hidden behind manufacturer restrictions.\n\nThe most immediately useful command is package uninstallation without root. Running adb shell pm uninstall -k --user 0 followed by the package name removes any system app from your user profile without actually touching the system partition. This means the app is gone from your experience but can be restored with a factory reset if needed.\n\nOther essential commands include forcing dark mode on apps that do not support it natively, adjusting the minimum display brightness below the manufacturer's default, and extracting APKs from your device for backup purposes. Each of these operations is safe, reversible, and does not require root access.",
    seoTitle: "Essential ADB Commands for Android Power Users in 2026",
    seoDescription: "Master these ADB commands to debloat, customize, and unlock hidden features on any Android device without root.",
    canonicalUrl: "https://hotai.news/articles/essential-adb-commands-2026",
    status: "published"
  },
  {
    id: 11,
    title: "Notion AI Now Generates Full Project Plans from Meeting Transcripts",
    slug: "notion-ai-project-plans-meeting-transcripts",
    category: "Apps",
    excerpt: "Notion's latest AI update converts raw meeting recordings into structured project plans with tasks, owners, deadlines, and dependency chains.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60",
      alt: "Team working on laptops",
      width: 1200, height: 675, format: "webp"
    },
    author: { name: "David Ortiz", role: "Senior Tech Analyst", bio: "Tracks enterprise AI adoption and large language model developments.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-14'),
    tags: ["notion", "productivity", "meeting-ai"],
    readingTime: "4 min read",
    content: "Notion has shipped a significant update to its AI assistant that can transform meeting transcripts into fully structured project plans. Upload a recording or paste a transcript, and Notion AI identifies action items, assigns ownership based on conversational context, estimates timelines, and maps task dependencies.\n\nThe feature integrates directly with Notion's existing database and project management tools. Generated plans appear as native Notion pages with linked databases, timeline views, and automated status tracking. Team members mentioned in the meeting are automatically tagged and notified.\n\nIn our testing with a 45-minute product planning meeting, Notion AI correctly identified 12 out of 14 action items and accurately assigned 10 of them to the right team members. The dependency mapping was particularly impressive, correctly identifying which tasks needed to be completed before others could begin.",
    seoTitle: "Notion AI Turns Meeting Transcripts Into Project Plans",
    seoDescription: "Notion's AI update converts meeting recordings into structured project plans with tasks, owners, and dependency chains.",
    canonicalUrl: "https://hotai.news/articles/notion-ai-project-plans-meeting-transcripts",
    status: "published"
  },
  {
    id: 12,
    title: "European AI Act Enforcement Begins: What Developers Need to Know",
    slug: "eu-ai-act-enforcement-developer-guide",
    category: "AI News",
    excerpt: "The EU AI Act's first enforcement phase kicks in June 2026, affecting model transparency, training data disclosure, and risk classification for all AI products serving European users.",
    featuredImage: {
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60",
      alt: "Laptop with data analytics",
      width: 1200, height: 675, format: "webp"
    },
    author: { name: "Sarah Nakamura", role: "AI Research Editor", bio: "Former computational biologist covering the intersection of AI and life sciences.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-13'),
    tags: ["eu-ai-act", "regulation", "compliance"],
    readingTime: "7 min read",
    content: "The European Union's AI Act enters its first enforcement phase in June 2026, and the requirements are more specific than many developers anticipated. Any AI system serving users in EU member states must now comply with transparency obligations, training data documentation, and risk classification frameworks.\n\nThe most immediately impactful requirement is the obligation for general-purpose AI models to disclose training data summaries. This affects any company deploying large language models, image generators, or recommendation systems within the EU. Fines for non-compliance start at 15 million euros or 3% of global turnover.\n\nDevelopers building AI-powered applications should focus on three areas: implementing clear AI content labeling, maintaining documentation of training data sources and preprocessing methods, and establishing human oversight mechanisms for high-risk use cases. The regulation provides a 12-month grace period for existing systems, but new deployments must be compliant from day one.",
    seoTitle: "EU AI Act 2026: Developer Compliance Guide",
    seoDescription: "The EU AI Act enforcement begins June 2026. Learn the transparency, data disclosure, and risk requirements for AI developers.",
    canonicalUrl: "https://hotai.news/articles/eu-ai-act-enforcement-developer-guide",
    status: "published"
  }
];
