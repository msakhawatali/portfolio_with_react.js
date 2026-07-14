import { section } from "framer-motion/client"
import ParticlesBackground from "../components/ParticlesBackground"
import { motion } from "framer-motion"
import { useMemo } from "react"
import React from "react"

export default function Home(){
const roles = useMemo(() => ["Software Engineer", "Web Developer", "Python Developer"], [])

const [index , setIndex] = React.useState(0);
const [subIndex, setSubIndex] = React.useState(0);
const [deleting, setDeleting] = React.useState(false);

React.useEffect(() => {

  const current = roles[index];
  const timeout = setTimeout(() => {
    if (!deleting && subIndex < current.length) setSubIndex(v => v + 1);
    else if (!deleting && subIndex === current.length) setTimeout (() => setDeleting(true), 1200);
    else if (deleting && subIndex > 0) setSubIndex (v => v - 1);
    else if (deleting && subIndex === 0) {setDeleting(false); setIndex(p => (p + 1) % roles,length);}
  }, deleting ? 40 : 60)

  return () => clearTimeout(timeout);
}, [subIndex, index, deleting, roles])


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

    <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
        <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
          <motion.div
          className=" mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
          initial={{opacity:0, y:12}}
          animate= {{opacity:1 , y:0}}
          transition={{duration:0.6}}
          >
            <span>
              {roles[index].substring(0, subIndex)}
            </span>
            <span className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle"
            style={{height:"1em"}}
            >
            </span>
          </motion.div>
          <h1>Hello i'm sakhawat</h1>
        </div>
      </div>
    </div>
    </section>
  )
}