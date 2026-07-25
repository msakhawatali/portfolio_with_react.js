import { useTransform } from "framer-motion"


const experiences = [
  {
  role : "web developer",
  company : "Habble42",
  duration : "2026",
  description : "Built Application"
  },
  {
  role : "web developer",
  company : "Habble42",
  duration : "2026",
  description : "Built Application"
  },
  {
  role : "web developer",
  company : "Habble42",
  duration : "2026",
  description : "Built Application"
  }
]

function EnperienceItem({exp, idx, start, end, scrollYProgress, layout}){
  const scale = useTransform(scrollYProgress, [start, end], [0,1])
  const opacity = useTransform(scrollYProgress, [start, end], [0,1])
const y = useTransform(scrollYProgress, [start, end], [idx%2===0 ? 30 : -30, 0])
const x = useTransform(scrollYProgress, [start, end], [-24, 0])

if (layout === "desktop"){
  return (
    <div className="relative flex flex-1 justify-center items-center min-w-0">
      <motion.div className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
      style={{scale, opacity}}
      >

      </motion.div>
      <motion.div className={`absolute ${idx%2 === 0 ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
      style={{height:40 , opacity}}
      >

      </motion.div>
      <motion.article className={`absolute ${idx%2 === 0 ? "bottom-12" : "top-12"} bg-gray-900/80 border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
      style={{opacity , y , maxWidth : "90vw"}}
      transition ={{duration : 0.4 , delay : idx*0.15}}
      >
      
      </motion.article>
    </div>
  )
}
}



export default function Experience(){
  return (
    <section id="experience" className="relative bg-black"></section>
  )
}