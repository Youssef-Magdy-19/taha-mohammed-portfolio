// @ts-ignore
import React from 'react'
// @ts-ignore
const koshary = '/images/koshary.png'
// @ts-ignore
const beach = '/images/beach.png'
// @ts-ignore
const happy = '/images/happy.jpeg'
// @ts-ignore
const Bingo = '/images/bingo.jpg'
// @ts-ignore
const bazoka = '/images/bazoka.png'
// @ts-ignore
const kids = '/images/kids1.jpg'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const logoShops = [
  { img: koshary }, { img: happy }, { img: bazoka }, { img: Bingo }, { img: beach }, { img: kids }
]
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const BrandsClient = () => {
  const { t } = useTranslation()
  return (
    <section className='someClients container text-center' style={{ padding: '50px 0' }}>
      <h2 className='font-semibold text-3xl md:text-4xl lg:text-5xl text-blue-400' style={{ marginBottom: '15px' }}>{t('clientsSection.title')}</h2>
      <p className='text-base md:text-lg lg:text-xl text-gray-600'>{t('clientsSection.description')}</p>
      <div className="w-full lg:w-[80%] grid grid-cols-2 md:grid-cols-3 gap-[2rem] " style={{ margin: 'auto' }}>
        {logoShops.map((logo, index) => (
          <motion.div key={index}
            className='flex items-center justify-center'
            style={{ margin: 'auto' }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img src={logo.img} loading='lazy' className='w-full rounded-lg' />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default BrandsClient
