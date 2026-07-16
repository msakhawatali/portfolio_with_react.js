import Navbar from './components/Navbar'
import ParticlesBackground from './components/ParticlesBackground'
import CustomCursor from './components/CustomCursor'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Testimonials from './sections/Testimonials'
import Products from './sections/Products'
import Contant from './sections/Contant'
import Footer from './sections/Footer'
import React from 'react'
import IntroAnimation from './components/IntroAnimation'

export default function App(){
  const [introDone , setIntroDone] = React.useState(false);
  return (
  <>
  {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
    {introDone && (
    <div className='relative gradient text-white'>
    < CustomCursor />
    {/* <ParticlesBackground/> */}
    <Navbar/>
    <Home/>
    <About/>
    <Skills/>
    <Products/>
    <Experience/>
    <Testimonials/>
    <Contant/>
    <Footer/>
    </div>
    )}
    </>
  )
}
