import React from 'react'
import Header from '../components/Header'
import Work from '../components/Work'
import About from '../components/About'
import Testimonial from '../components/Testimonial'
import Generate from '../components/Generate'

const Home = () => {
  return (
    <div>
      <Header/>
      <Work/>
      <About/>
      <Testimonial/>
      <Generate/>
    </div>
  )
}

export default Home