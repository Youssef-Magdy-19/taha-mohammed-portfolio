
// @ts-ignore
import React, { useEffect, useState } from 'react'
// @ts-ignore
const stand = '/images/iconStandd.png'
// @ts-ignore
const standdark = '/images/image.png'
// @ts-ignore
const panel = '/images/icon4.png'
// @ts-ignore
const paneldark = '/images/icon4-dark.png'
// @ts-ignore
const letter = '/images/3d.png'
// @ts-ignore
const letterdark = '/images/letter-dark.png'
// @ts-ignore
const home = '/images/home.png'
// @ts-ignore
const homedark = '/images/home-dark.png'
// @ts-ignore
const shop = '/images/shop.png'
// @ts-ignore
const shopDark = '/images/shop-dark.png'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

// @ts-ignore
const services = [
    {
        image: [shop, shopDark],
        title: "services.shopSigns.title",
        desc: "services.shopSigns.description"
    },
    {
        image: [letter, letterdark],
        title: "services.lightLetters.title",
        desc: "services.lightLetters.description"
    },
    {
        image: [home, homedark],
        title: "services.homes.title",
        desc: "services.homes.description"
    },
    {
        image: [stand, standdark],
        title: "services.stands.title",
        desc: "services.stands.description"
    },
    {
        image: [panel, paneldark],
        title: "services.interiorPanels.title",
        desc: "services.interiorPanels.description"
    }
]

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};


const Servies = ({ currentMode }) => {
    const { i18n, t } = useTranslation()

    return (
        <section className='servies' key={i18n.language} style={{ padding: '70px 0 50px 0' }}>
            <div className='container'>
                <h2 className='font-semibold text-3xl md:text-4xl lg:text-5xl text-center' style={{ marginBottom: "50px" }}>{t('services.title')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[1.5rem]">
                    {services.map((service, index) => (
                        <motion.div key={index}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="service flex flex-col items-center text-center p-4"

                        >
                            <img
                                loading='lazy'
                                src={currentMode === "dark" ? service.image[1] : service.image[0]}
                                className="w-30 h-30 md:w-40 md:h-40 lg:w-50 lg:h-50"
                                alt={t(service.title)}
                            />
                            <h3 style={{ margin: '10px 0' }} className='font-semibold text-lg'>{t(`${services[index].title}`)}</h3>
                            <p className='text-gray-600 text-sm md:text-md w-[90%] md:w-full'>{t(`${services[index].desc}`)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Servies
