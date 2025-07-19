import { motion } from 'framer-motion';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';


const CardProject = ({ img, title, desc, id , animation }) => {
    const { i18n, t } = useTranslation()

    return (
        <motion.div
            variants={animation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className='card flex flex-col  gap-[.5rem] border border-gray-300 rounded-[10px] shadow-md'
        >
            <img loading='lazy' src={img} className='w-full h-[180px]' style={{ borderRadius: '10px 10px 0 0' }} />
            <div className="body-card flex flex-col justify-between" style={{ padding: '5px 15px 15px 10px', height:'calc(100% - 190px)' }}>
                <h4 className='font-bold text-xl '>{i18n.language == 'ar' ? title.ar : title.en}</h4>
                <p className='text-sm md:text-md text-gray-500' style={{margin:'10px 0'}}>{i18n.language == 'ar' ? desc.ar : desc.en}</p>
                <Link to={'/projects/' + id} className='flex items-center gap-[.5rem] text-blue-400' >
                    {t('view')}
                    {i18n.language == "ar" ?
                        <ArrowLeft className='w-5 h-5' style={{ marginTop: '2.5px' }} /> :
                        <ArrowRight className='w-5 h-5' style={{ marginTop: '2.5px' }} />
                    }
                </Link>
            </div>
        </motion.div>
    )
}

export default CardProject
