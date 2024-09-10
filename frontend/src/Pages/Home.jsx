import React from 'react';
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProduct';
import LongBanner from '../components/LongBanner/LongBanner';
import NewArrivals from '../components/NewArrivals/NewArrivals';
import Smallbanner from '../components/SmallBanner/SmallBanner';
import NewsLetter from "../components/NewsLetter/NewsLetter";
import Footer from "../components/Footer/Footer";
import { useQuery } from '@tanstack/react-query';

function Home() {

  // Fetching featured products with React Query
  const { data: featuredproducts = [], isLoading: isLoadingFeatured, error: errorFeatured } = useQuery({
    queryKey: ['featuredproducts'],
    queryFn: async () => {
      const res = await fetch('https://cara-mern-e-commerce.onrender.com/featuredproducts');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }
  });

  // Fetching new arrivals with React Query
  const { data: newarrivals = [], isLoading: isLoadingNewArrivals, error: errorNewArrivals } = useQuery({
    queryKey: ['newarrivals'],
    queryFn: async () => {
      const res = await fetch('https://cara-mern-e-commerce.onrender.com/newarrivals');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }
  });

  // Loading and error handling for featured products
  if (isLoadingFeatured || isLoadingNewArrivals) {
    return <div className='loading'>Loading...</div>;
  }

  if (errorFeatured || errorNewArrivals) {
    return <div>Error: {errorFeatured?.message || errorNewArrivals?.message}</div>;
  }

  return (
    <div>
      <Hero />
      <Features />
      <FeaturedProducts data={featuredproducts} />
      <LongBanner />
      <NewArrivals data={newarrivals} />
      <Smallbanner />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Home;
