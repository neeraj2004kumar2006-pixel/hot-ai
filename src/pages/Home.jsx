import React from 'react';
import Hero from '../components/Hero';
import TrendingSection from '../components/TrendingSection';
import FeaturedSection from '../components/FeaturedSection';
import Sidebar from '../components/Sidebar';
import AdBanner from '../components/AdBanner';
import SectionDivider from '../components/SectionDivider';
import { getArticles } from '../utils/dataStore';

const Home = ({ onNavigate }) => {
  const articles = getArticles();

  return (
    <div className="two-column-layout">
      <main style={{ minWidth: 0 }} aria-label="Main Feed">
        {/* Top banner — below header, above hero */}
        <AdBanner slot="topBanner" />

        <Hero articles={articles} onNavigate={onNavigate} />

        <SectionDivider topColor="var(--bg-color)" bottomColor="var(--surface)" />

        <div style={{ backgroundColor: 'var(--surface)', paddingBottom: '20px' }}>
          <TrendingSection articles={articles} onNavigate={onNavigate} />
        </div>

        {/* Mid-page banner — between trending and featured */}
        <AdBanner slot="homeMidBanner" />

        <SectionDivider topColor="var(--surface)" bottomColor="var(--bg-color)" />

        <FeaturedSection articles={articles} onNavigate={onNavigate} />
      </main>
      <Sidebar popularArticles={articles} onNavigate={onNavigate} />
    </div>
  );
};

export default Home;
