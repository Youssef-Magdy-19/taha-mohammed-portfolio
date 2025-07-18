import React from 'react'
import { data } from '../data/data'
import CardProject from './CardProject'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'


const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};



const SomeProjects = () => {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const filterData = data.slice(0, 4)
    return (
        <section className='someWorks container flex flex-col items-center ' style={{ padding: '50px 10px' }}>
            <h2 className='font-semibold text-3xl md:text-4xl lg:text-5xl text-blue-400'>{t('works')}</h2>
            <p className='text-base md:text-lg lg:text-xl text-gray-600' style={{ margin: '10px 0' }}>{t('workDesc')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1.5rem]">
                {filterData.map((item, index) => (
                    <CardProject key={index} img={item.img} title={item.title} desc={item.description} id={item.id} animation={itemVariants} />
                ))}
            </div>
            <button className='border border-gray-300 rounded-lg'
                onClick={()=> navigate('/projects')}
                style={{ padding: '7px 15px', marginTop: '20px' }}
            >
                {t('totalProjects')}
            </button>
        </section>
    )
}

export default SomeProjects
