import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { ArrowLeft, ArrowRight } from "lucide-react"
// @ts-ignore
import Koshary from '../images/stores/Koshary-alkhediw/Koshary5.JPG'
// @ts-ignore
import char from '../images/Charcaters/chars-light/char8.JPG'
// @ts-ignore
import villa from '../images/houses/villa/villa1.jpg'
import { useNavigate } from "react-router-dom"

const slides = [
  {
    image: Koshary,
    title1: "slider.slide1.title1",
    title2: "slider.slide1.title2",
    btn1: "slider.slide1.btn1",
    btn2: "slider.slide1.btn2",
    desc: "slider.slide1.description"
  },
  {
    image: char,
    title1: "slider.slide2.title1",
    title2: "slider.slide2.title2",
    btn1: "slider.slide2.btn1",
    btn2: "slider.slide2.btn2",
    desc: "slider.slide2.description"
  },
  {
    image: villa,
    title1: "slider.slide3.title1",
    title2: "slider.slide3.title2",
    btn1: "slider.slide3.btn1",
    btn2: "slider.slide3.btn2",
    desc: "slider.slide3.description"
  }
]

const HeroSlider = () => {
  const [current, setCurrent] = useState(0)
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearTimeout(timer)
  }, [current])

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative w-full h-[calc(75vh-60px)] md:h-[calc(60vh-60px)] lg:h-[calc(70vh-60px)] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[current].image})` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          // @ts-ignore
          onDragEnd={(e, info) => {
            if (info.offset.x < -100) nextSlide()
            else if (info.offset.x > 100) prevSlide()
          }}
        >
          <div className="absolute inset-0 bg-black/50 z-0" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <motion.h2
              className="text-3xl sm:text-5xl font-bold mb-4"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {t(slides[current].title1)} <span className="text-blue-300">{t(slides[current].title2)}</span>
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl max-w-[700px]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{ margin: "15px 0" ,padding:'0 10px' }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {t(slides[current].desc)}
            </motion.p>
            <div className="flex items-center gap-[1rem] md:gap-[2rem]">
              <motion.button
                className="text-md md:text-lg border border-white rounded-lg cursor-pointer"
                style={{ padding: '7px 20px' }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                onClick={() => { navigate('/projects') }}
              >
                {t(slides[current].btn1)}
              </motion.button>
              <motion.button
                className="text-md md:text-lg bg-blue-400 rounded-lg cursor-pointer flex items-center gap-[.5rem]"
                style={{ padding: '7px 10px' }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                onClick={() => { navigate('/about') }}
              >
                {t(slides[current].btn2)}
                {i18n.language == "ar" ?
                  <ArrowLeft className='w-5 h-5' style={{ marginTop: '2.5px' }} /> :
                  <ArrowRight className='w-5 h-5' style={{ marginTop: '2.5px' }} />
                }
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* نقاط التقليب */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${index === current ? "bg-white scale-125" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider
