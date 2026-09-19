import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"


const experiences = [
  {
    role: "Web Developer",
    company: "Brain Mentors",
    duration: "2022",
    description: "Worked with team to build high-performance apps, integrated AI features, and improved user engagement by 10%."
  },
  {
    role: "Web Developer Intern",
    company: "Mobisoft Technologies",
    duration: "2022 - 2023",
    description: "In this internship , I gained valuable hands on experience and exposure to various aspects of web development."
  },
  {
    role: "Graduate Engineer",
    company: "HCL Technologies",
    duration: "2024 - 2025",
    description: "Built the frontend of a GenAI-powered PV Intake Application using Next.js and TypeScript for a U.S life sciences client, enabling automated patient report processing across global regions."
  }
]

function ExperienceItem({exp, idx, start, end, scrollYProgress, layout}){
  // Entrance window starts slightly before reaching target scroll threshold
  const animStart = idx === 0 ? 0 : Math.max(0, start - 0.15);
  
  const scale = useTransform(scrollYProgress, (v) => {
    if (v >= start) return 1;
    if (v <= animStart) return 0;
    return (v - animStart) / (start - animStart);
  });

  // opacity: once v >= start, locks at 1 permanently so cards never disappear
  const opacity = useTransform(scrollYProgress, (v) => {
    if (v >= start) return 1;
    if (v <= animStart) return 0;
    return (v - animStart) / (start - animStart);
  });

  const y = useTransform(scrollYProgress, (v) => {
    const targetY = idx % 2 === 0 ? 30 : -30;
    if (v >= start) return 0;
    if (v <= animStart) return targetY;
    return targetY * (1 - (v - animStart) / (start - animStart));
  });

  const x = useTransform(scrollYProgress, (v) => {
    if (v >= start) return 0;
    if (v <= animStart) return -24;
    return -24 * (1 - (v - animStart) / (start - animStart));
  });

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