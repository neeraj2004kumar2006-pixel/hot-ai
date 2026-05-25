import React from 'react';
import Hero from '../components/Hero';
import TrendingSection from '../components/TrendingSection';
import FeaturedSection from '../components/FeaturedSection';
import Sidebar from '../components/Sidebar';
import AdBanner from '../components/AdBanner';
import { getArticles } from '../utils/dataStore';

const Home = ({ onNavigate }) => {
  const articles = getArticles();

  return (
    <div className="two-column-layout">
      <main aria-label="Main Feed">
        {/* Top banner — below header, above hero */}
        <AdBanner slot="topBanner" />

        <Hero articles={articles} onNavigate={onNavigate} />

        <TrendingSection articles={articles} onNavigate={onNavigate} />

        {/* Mid-page banner — between trending and featured */}
        <AdBanner slot="homeMidBanner" />

        <FeaturedSection articles={articles} onNavigate={onNavigate} />
      </main>
      <Sidebar popularArticles={articles} onNavigate={onNavigate} />
    </div>
  );
};

export default Home;
