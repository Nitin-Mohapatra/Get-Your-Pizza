import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import CardWrapper from '../components/CardWrapper'
import Footer from './Footer'

export default function Home() {
  return (
    <div>
        {/* endering navbar */}
        <Navbar></Navbar>

        {/* Rendering the carousell */}
        <Carousel></Carousel>

        {/* Rendering card */}
        <CardWrapper></CardWrapper>

        {/* Rendering footer */}
        <Footer></Footer>
        
    </div>
  )
}
