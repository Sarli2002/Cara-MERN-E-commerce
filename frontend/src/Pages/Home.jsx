import React, { useEffect, useState } from 'react'
import Hero from "../components/Hero/Hero"
import Features from "../components/Features/Features"
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProduct'
import LongBanner from '../components/LongBanner/LongBanner'
import NewArrivals from '../components/NewArrivals/NewArrivals'
import Smallbanner from '../components/SmallBanner/SmallBanner'
import NewsLetter from "../components/NewsLetter/NewsLetter"

function Home() {
  // const [popular, setPopular] = useState([]);
  const [featuredproducts, setfeaturedproducts] = useState([]);
  const [newcollection, setNewCollection] = useState([]);

  const fetchInfo = () => { 
    // fetch('http://localhost:4000/popularinwomen') 
    //         .then((res) => res.json()) 
    //         .then((data) => setPopular(data))
    fetch('http://localhost:4000/featuredproducts') 
    .then((res) => res.json()) 
    .then((data) => setfeaturedproducts(data))
    fetch('http://localhost:4000/newcollections') 
            .then((res) => res.json()) 
            .then((data) => setNewCollection(data))
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
      <NewArrivals data={newcollection}/>
      <Smallbanner/>
      <NewsLetter/>
      
    </div>
  )
}

export default Home

