/**
 * Hot AI — Central Ad Configuration
 * 
 * Toggle any ad slot on/off from this single file.
 * When ready for production, replace slotId values with real
 * Google AdSense / Ezoic / manual banner slot IDs.
 * 
 * provider: 'adsense' | 'ezoic' | 'manual' | 'none'
 * enabled: true = slot renders, false = slot hidden + zero layout impact
 * sizes: { width, height } in pixels — used for skeleton/placeholder aspect ratio
 * responsive: if true, ad adapts width to container
 * devices: 'all' | 'desktop' | 'mobile'
 * lazyLoad: if true, ad only initializes when scrolled into view
 */

const AD_PROVIDER = 'test'; // Change to 'adsense' | 'ezoic' | 'manual' when ready

const adSlots = {
  // ─── HOMEPAGE ──────────────────────────────────────
  topBanner: {
    enabled: true,
    slotId: '', // INSERT ADSENSE SLOT ID HERE
    provider: AD_PROVIDER,
    label: 'Leaderboard',
    sizes: { width: 728, height: 90 },
    responsive: true,
    position: 'home-top',
    devices: 'all',
    lazyLoad: false,
  },
  homeMidBanner: {
    enabled: true,
    slotId: '', // INSERT ADSENSE SLOT ID HERE
    provider: AD_PROVIDER,
    label: 'In-Feed',
    sizes: { width: 728, height: 90 },
    responsive: true,
    position: 'home-mid',
    devices: 'all',
    lazyLoad: true,
  },

  // ─── SIDEBAR ───────────────────────────────────────
  sidebarTop: {
    enabled: true,
    slotId: '', // INSERT ADSENSE SLOT ID HERE
    provider: AD_PROVIDER,
    label: 'Sidebar',
    sizes: { width: 300, height: 250 },
    responsive: false,
    position: 'sidebar-top',
    devices: 'desktop',
    lazyLoad: false,
  },
  sidebarMiddle: {
    enabled: true,
    slotId: '', // INSERT ADSENSE SLOT ID HERE
    provider: AD_PROVIDER,
    label: 'Sidebar',
    sizes: { width: 300, height: 600 },
    responsive: false,
    position: 'sidebar-mid',
    devices: 'desktop',
    lazyLoad: true,
  },

  // ─── ARTICLE PAGE ──────────────────────────────────
  articleInline1: {
    enabled: true,
    slotId: '', // INSERT ADSENSE SLOT ID HERE
    provider: AD_PROVIDER,
    label: 'In-Article',
    sizes: { width: 728, height: 90 },
    responsive: true,
    position: 'article-after-p2',
    devices: 'all',
    lazyLoad: true,
  },
  articleInline2: {
    enabled: true,
    slotId: '', // INSERT ADSENSE SLOT ID HERE
    provider: AD_PROVIDER,
    label: 'In-Article',
    sizes: { width: 300, height: 250 },
    responsive: true,
    position: 'article-after-p6',
    devices: 'all',
    lazyLoad: true,
  },
  articlePreRelated: {
    enabled: true,
    slotId: '', // INSERT ADSENSE SLOT ID HERE
    provider: AD_PROVIDER,
    label: 'Pre-Related',
    sizes: { width: 728, height: 90 },
    responsive: true,
    position: 'article-pre-related',
    devices: 'all',
    lazyLoad: true,
  },

  // ─── FOOTER ────────────────────────────────────────
  footerBanner: {
    enabled: true,
    slotId: '', // INSERT ADSENSE SLOT ID HERE
    provider: AD_PROVIDER,
    label: 'Footer',
    sizes: { width: 728, height: 90 },
    responsive: true,
    position: 'footer',
    devices: 'all',
    lazyLoad: true,
  },

  // ─── MOBILE ────────────────────────────────────────
  mobileSticky: {
    enabled: true,
    slotId: '', // INSERT ADSENSE SLOT ID HERE
    provider: AD_PROVIDER,
    label: 'Sticky',
    sizes: { width: 320, height: 50 },
    responsive: false,
    position: 'mobile-sticky',
    devices: 'mobile',
    lazyLoad: false,
  },
};

/**
 * Get a slot config by key. Returns null if slot doesn't exist.
 */
export const getAdSlot = (key) => adSlots[key] || null;

/**
 * Check if a slot is enabled and should render.
 */
export const isSlotEnabled = (key) => {
  const slot = adSlots[key];
  return slot ? slot.enabled : false;
};

/**
 * Get all enabled slots as an array of [key, config] pairs.
 */
export const getEnabledSlots = () =>
  Object.entries(adSlots).filter(([, config]) => config.enabled);

/**
 * Get the current global ad provider.
 */
export const getAdProvider = () => AD_PROVIDER;

export default adSlots;
