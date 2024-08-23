import React, { useEffect, useState } from 'react'
import Hero from "../components/Hero/Hero"
import Features from "../components/Features/Features"
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProduct'
import LongBanner from '../components/LongBanner/LongBanner'
import NewArrivals from '../components/NewArrivals/NewArrivals'
import Smallbanner from '../components/SmallBanner/SmallBanner'
import NewsLetter from "../components/NewsLetter/NewsLetter"
import Footer from "../components/Footer/Footer"

function Home() {

  const [featuredproducts, setfeaturedproducts] = useState([]);
  const [newarrivals, setNewArrivals] = useState([]);

  const fetchInfo = () => { 
    fetch('https://cara-mern-e-commerce.onrender.com/featuredproducts') 
    .then((res) => res.json()) 
    .then((data) => setfeaturedproducts(data))
    fetch('https://cara-mern-e-commerce.onrender.com/newarrivals') 
            .then((res) => res.json()) 
            .then((data) => setNewArrivals(data))
    }

    useEffect(() => {
      fetchInfo();
    }, [])
  return (
    <div>
      <Hero/>
      <Features/>
      <FeaturedProducts data={featuredproducts}/>
      <LongBanner/>
      <NewArrivals data={newarrivals}/>
      <Smallbanner/>
      <NewsLetter/>
      <Footer/>
      
    </div>
  )
}

export default Home

