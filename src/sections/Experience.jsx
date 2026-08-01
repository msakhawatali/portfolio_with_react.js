import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"


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

function ExperienceItem({exp, idx, start, end, scrollYProgress, layout}){
  const scale = useTransform(scrollYProgress, [start, Math.min(end, 1)], [0, 1])
  // opacity: 0 se 1 aaye, phir hamesha 1 rahe — kabhi gaeb na ho
  const opacity = useTransform(scrollYProgress, (v) => {
    if (v < start) return 0;
    if (v >= start) return Math.min((v - start) / (end - start), 1);
    return 1;
  })
  const y = useTransform(scrollYProgress, [start, Math.min(end, 1)], [idx%2===0 ? 30 : -30, 0])
  const x = useTransform(scrollYProgress, [start, Math.min(end, 1)], [-24, 0])

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
      <motion.article className={`absolute ${idx%2 === 0 ? "bottom-12" : "top-12"} bg-gray-900/80 border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
      style={{opacity , y , maxWidth : "90vw"}}
      >
        <h3 className="text-lg font-semibold">
          {exp.role}
        </h3>
        <p className="text-sm text-gray-400 mb-3">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300 break-words">
          {exp.description}
        </p>
      </motion.article>
    </div>
  )
}
return (
  <div className="relative flex items-start">
    <motion.div className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
    style={{scale, opacity}}
    >
    </motion.div>
    <motion.article className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
    style={{opacity, x}}
    >
      <h3 className="text-lg font-semibold break-words">
        {exp.role}
      </h3>
      <p className="text-sm text-gray-400 mb-2 break-words">
        {exp.company} | {exp.duration}
      </p>
      <p className="text-sm text-gray-300 break-words">
        {exp.description}
      </p>
    </motion.article>
  </div>
)
}



export default function Experience(){
const sceneRef = useRef(null);
const [isMobile, setIsMobile] = useState(false)

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener("resize" , checkMobile)
  return () => window.removeEventListener("resize" , checkMobile)
},[])

const SCEN_HIGHT_VH = isMobile ? 160*experiences.length : 120*experiences.length;

const {scrollYProgress} = useScroll({
  target : sceneRef,
  offset:["start start" , "end end"]
})

const thresholds = useMemo(() => experiences.map((_, i) => (i+1) /experiences.length),[])
const lineSize = useTransform(scrollYProgress, (v) => `${v*100}%`)


  return (
    <section id="experience" className="relative bg-black">
      <div ref={sceneRef}
      style={{height : `${SCEN_HIGHT_VH}vh`, minHeight: "120vh"}}
      className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center text-white">
            Experience
          </h2>
          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-[6px] bg-white/15 rounded">
                <motion.div className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left"
                style={{width : lineSize}}
                >
                </motion.div>
                </div>

                  <div className="relative flex justify-between mt-0">
                    {experiences.map((exp, idx) => (
                      <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx-1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                      />
                    ))}
                  </div>
              </div>
            )}

            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                <motion.div className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top"
                style={{height : lineSize}}
                >
                </motion.div>
                </div>

                <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx-1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}