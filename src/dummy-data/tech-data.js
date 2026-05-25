export const techTricksData = [
  {
    id: 101, name: "Force 120Hz Refresh Rate on Any Android Device",
    slug: "force-120hz-android", category: "Android Tips",
    excerpt: "Most Android phones throttle refresh rates to save battery. This developer settings method unlocks the full 120Hz experience.",
    featuredImage: { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60", alt: "Smartphone circuit close-up", width: 800, height: 450, format: "webp" },
    author: { name: "Alex Chen", role: "Android Specialist", bio: "Android power user and custom ROM developer.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-21'), tags: ["android", "120hz", "performance"], readingTime: "4 min read",
    content: "Enable Developer Options by tapping Build Number seven times in Settings → About Phone. Then go to Developer Options and toggle Force Peak Refresh Rate. This forces your display to run at its maximum refresh rate.\n\nBattery impact is roughly 10-15% increased drain. Use Tasker automation to toggle it only during gaming or social media scrolling for the best balance.",
    seoTitle: "Force 120Hz on Android Devices", seoDescription: "Enable full 120Hz refresh rate on Android using developer settings.", canonicalUrl: "https://hotai.news/tech/force-120hz-android", status: "published"
  },
  {
    id: 102, name: "Bypass Google AI Overviews in Search Results",
    slug: "bypass-google-ai-overviews", category: "Tech Tricks",
    excerpt: "Google's AI Overviews push organic results below the fold. These methods bring back traditional search without extensions.",
    featuredImage: { url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60", alt: "Computer screen with search", width: 800, height: 450, format: "webp" },
    author: { name: "Priya Sharma", role: "Developer Advocate", bio: "Full-stack developer specializing in web technologies.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-20'), tags: ["google", "search", "tips"], readingTime: "3 min read",
    content: "Append &udm=14 to any Google search URL to get classic web results without AI Overviews. You can also set this as your default search engine in Chrome by creating a custom search engine with the query URL including this parameter.\n\nAlternatively, use the Web tab filter directly from search results. Google has also added a Settings toggle under Search → AI Features where you can reduce AI Overview frequency.",
    seoTitle: "Skip Google AI Overviews", seoDescription: "Remove Google AI Overviews from search results using URL parameters and browser settings.", canonicalUrl: "https://hotai.news/tech/bypass-google-ai-overviews", status: "published"
  },
  {
    id: 103, name: "Debloat Any Samsung Phone Without Root Access",
    slug: "debloat-samsung-no-root", category: "Android Tips",
    excerpt: "Remove pre-installed Samsung apps and carrier bloatware using ADB commands — no root required, fully reversible.",
    featuredImage: { url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60", alt: "Terminal command interface", width: 800, height: 450, format: "webp" },
    author: { name: "Alex Chen", role: "Android Specialist", bio: "Android power user and custom ROM developer.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-18'), tags: ["samsung", "debloat", "adb"], readingTime: "5 min read",
    content: "Connect your Samsung phone to a computer with ADB installed. Use adb shell pm uninstall -k --user 0 followed by the package name to remove any pre-installed app from your user profile. This is safe because the system partition remains untouched.\n\nCommon packages to remove include com.facebook.system, com.samsung.android.game.gamehome, and carrier-specific apps. If you ever need an app back, a factory reset restores everything.",
    seoTitle: "Debloat Samsung Without Root", seoDescription: "Remove Samsung bloatware and carrier apps using ADB commands without rooting your device.", canonicalUrl: "https://hotai.news/tech/debloat-samsung-no-root", status: "published"
  },
  {
    id: 104, name: "Enable Desktop Mode on Any iPhone Running iOS 19",
    slug: "iphone-desktop-mode-ios-19", category: "iOS Tips",
    excerpt: "iOS 19 includes a hidden desktop mode for external displays. Here is how to activate it for a laptop-like experience from your iPhone.",
    featuredImage: { url: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=60", alt: "iPhone display", width: 800, height: 450, format: "webp" },
    author: { name: "Marcus Rivera", role: "Mobile Optimization Editor", bio: "Specializes in mobile performance tuning across iOS and Android.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-16'), tags: ["iphone", "ios-19", "desktop-mode"], readingTime: "4 min read",
    content: "Connect your iPhone to an external display via USB-C. Go to Settings → Display → External Display and enable Extended Desktop Mode. This gives you a full windowed desktop environment on the external monitor while your iPhone acts as a trackpad.\n\nThe mode supports resizable windows, split-screen multitasking, and keyboard shortcuts. Safari runs in its full desktop version, and Files app provides a Finder-like file management experience.",
    seoTitle: "iPhone Desktop Mode on iOS 19", seoDescription: "Activate the hidden desktop mode in iOS 19 for a laptop-like experience when connected to external displays.", canonicalUrl: "https://hotai.news/tech/iphone-desktop-mode-ios-19", status: "published"
  },
  {
    id: 105, name: "Run Local AI Models on Windows Without a GPU",
    slug: "run-local-ai-windows-no-gpu", category: "Tech Tricks",
    excerpt: "Ollama and llama.cpp now support optimized CPU inference. Here is how to run 7B models on any Windows laptop.",
    featuredImage: { url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=60", alt: "Code on monitor screen", width: 800, height: 450, format: "webp" },
    author: { name: "Priya Sharma", role: "Developer Advocate", bio: "Full-stack developer specializing in AI-assisted workflows.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-14'), tags: ["ollama", "local-ai", "windows"], readingTime: "6 min read",
    content: "Install Ollama from ollama.ai and run ollama pull llama3.2 from a terminal. That is literally all you need to start running a capable language model locally. Ollama automatically detects your hardware and selects the optimal quantization level.\n\nFor machines with 8GB RAM, stick with 3B parameter models. With 16GB, you can comfortably run 7B models. Inference speed on a modern i5 processor averages 8-12 tokens per second, which is adequate for most interactive use cases.",
    seoTitle: "Run AI Models Locally on Windows Without GPU", seoDescription: "Set up local AI inference on any Windows laptop using Ollama — no GPU required.", canonicalUrl: "https://hotai.news/tech/run-local-ai-windows-no-gpu", status: "published"
  },
  {
    id: 106, name: "Reduce Android App Data Usage by 60% With These Hidden Settings",
    slug: "reduce-android-data-usage", category: "Mobile Tips",
    excerpt: "Android has built-in data compression features that most users never discover. These settings can dramatically cut mobile data consumption.",
    featuredImage: { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60", alt: "Mobile network concept", width: 800, height: 450, format: "webp" },
    author: { name: "Marcus Rivera", role: "Mobile Optimization Editor", bio: "Specializes in mobile performance tuning across iOS and Android.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" },
    publishDate: new Date('2026-05-12'), tags: ["android", "data-savings", "mobile"], readingTime: "3 min read",
    content: "Go to Settings → Network → Data Saver and enable it. This restricts background data for all apps and compresses image loading. Then open individual app settings and disable auto-play for videos and high-resolution image loading in apps like Instagram, Twitter, and YouTube.\n\nFor additional savings, disable automatic app updates over mobile data in the Play Store settings and switch Google Maps to offline mode for frequently visited areas.",
    seoTitle: "Cut Android Data Usage by 60%", seoDescription: "Reduce mobile data consumption on Android with hidden data compression and optimization settings.", canonicalUrl: "https://hotai.news/tech/reduce-android-data-usage", status: "published"
  }
];
