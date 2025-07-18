import React, { useEffect, useState } from 'react'
import { data } from '../data/data'
import { useTranslation } from 'react-i18next'
import CardProject from '../Compontents/CardProject'
import { AnimatePresence, motion } from 'framer-motion'
import useWindowScrollToTop from '../hooks/useWindowScrollToTop'
import { useLoading } from '../context/LoadingContext'


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};


const Projects = () => {
  const { t } = useTranslation()
  const [filterCategory, setFilterCategory] = useState(data)
  const [category, setCategory] = useState('all')
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterCategory = (category) => {
    const newData = data.filter(item => item.category === category)
    setFilterCategory(newData)
  }
  useWindowScrollToTop()
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ paddingTop: '60px' }}
      className='lasted-work'
    >
      <div className='container' style={{ padding: '50px 0' }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="title text-center"
        >
          <h1 className='text-4xl md:text-5xl font-bold' style={{ marginBottom: '15px' }}>{t("projects")}</h1>
          <p className='text-md md:text-base text-gray-500'>{t("projectsPageDesc")}</p>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          style={{ margin: ' 20px 0' }}
          className="button-filter flex gap-3 flex-wrap justify-center"
        >
          <motion.button
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className={`border border-gray-700 rounded ${category == 'all' ? 'active' : ''}`}
            style={{ padding: '8px 18px' }}
            onClick={() => {
              setFilterCategory(data)
              setCategory('all')
            }}
          >
            {t('all')}
          </motion.button>
          <motion.button
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className={`border border-gray-700 rounded ${category == 'shop' ? 'active' : ''}`}
            style={{ padding: '8px 18px' }}
            onClick={() => {
              handleFilterCategory('shop')
              setCategory('shop')
            }}
          >
            {t('services.shopSigns.title')}
          </motion.button>
          <motion.button
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className={`border border-gray-700 rounded ${category == 'stand' ? 'active' : ''}`}
            style={{ padding: '8px 18px' }}
            onClick={() => {
              handleFilterCategory('stand')
              setCategory('stand')
            }}
          >
            {t('stands')}
          </motion.button>
          <motion.button
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className={`border border-gray-700 rounded ${category == 'charcthers-light' ? 'active' : ''}`}
            style={{ padding: '8px 18px' }}
            onClick={() => {
              handleFilterCategory('charcthers-light')
              setCategory('charcthers-light')
            }}
          >
            {t('services.lightLetters.title')}
          </motion.button>
          <motion.button
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className={`border border-gray-700 rounded ${category == 'house' ? 'active' : ''}`}
            style={{ padding: '8px 18px' }}
            onClick={() => {
              handleFilterCategory('house')
              setCategory('house')
            }}
          >
            {t('house')}
          </motion.button>

        </motion.div>
        <AnimatePresence mode='wait'>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="projects grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1rem]"
          >
            {filterCategory.map((project, index) => (
              <CardProject key={`${project.id} - ${category}`} img={project.img} title={project.title} desc={project.description} id={project.id} animation={itemVariants} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default Projects
