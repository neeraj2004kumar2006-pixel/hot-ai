import React from 'react';
import Hero from '../components/Hero';
import TrendingSection from '../components/TrendingSection';
import FeaturedSection from '../components/FeaturedSection';
import Sidebar from '../components/Sidebar';
import AdBanner from '../components/AdBanner';
import { dummyArticles } from '../dummy-data/news-data';

const Home = ({ onNavigate }) => {
  return (
    <div className="two-column-layout">
      <main aria-label="Main Feed">
        {/* Top banner — below header, above hero */}
        <AdBanner slot="topBanner" />

        <Hero articles={dummyArticles} onNavigate={onNavigate} />

        <TrendingSection articles={dummyArticles} onNavigate={onNavigate} />

        {/* Mid-page banner — between trending and featured */}
        <AdBanner slot="homeMidBanner" />

        <FeaturedSection articles={dummyArticles} onNavigate={onNavigate} />
      </main>
      <Sidebar popularArticles={dummyArticles} onNavigate={onNavigate} />
    </div>
  );
};

export default Home;
