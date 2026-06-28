import { section } from "framer-motion/client"
import ParticlesBackground from "../components/ParticlesBackground"

export default function Home(){
  return (
    <section
    id="home" className="w-full h-screen relative bg-black overflow-hidden">
      <ParticlesBackground/>
    <div
    className="absolute inset-0">
    <div
    className="absolute -top-32 -left-32
    w-[70vw] sm:w-[500vw] md:w-[40vw]
    h-[70vw] sm:h-[50vw] md:h-[40vw]
    max-w-[500px] max-h-[500px]
    rounded-full
    bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
    opacity-30 sm:opacity-20 sm:opacity-10
    blur-[100px] sm:blur-[130px] md:blur-[150px]
    animate-pulse
    "
    ></div>
    <div
    className="absolute bottom-0 right-0
    w-[70vw] sm:w-[500vw] md:w-[40vw]
    h-[70vw] sm:h-[50vw] md:h-[40vw]
    max-w-[500px] max-h-[500px]
    rounded-full
    bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
    opacity-30 sm:opacity-20 sm:opacity-10
    blur-[100px] sm:blur-[130px] md:blur-[150px]
    animate-pulse delay-500
    "
    ></div>
    </div>
    </section>
  )
}