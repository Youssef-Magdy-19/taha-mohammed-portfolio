import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    const { t, i18n } = useTranslation()
    return (
        <section className='flex items-center justify-center min-h-screen'>
            <div className='flex flex-col gap-[2rem]'>
                <p className='text-4xl md:5xl font-semibold'>{t('PageNotFound.content')}</p>
                <Link to='/'
                    className='flex items-center justify-center gap-[1rem] border border-gray-300 rounded'
                    style={{ padding: '8px 20px' }}
                >
                    {t('PageNotFound.btn')}
                    {i18n.language == "ar" ?
                        <ArrowLeft className='w-5 h-5' style={{ marginTop: '2.5px' }} /> :
                        <ArrowRight className='w-5 h-5' style={{ marginTop: '2.5px' }} />
                    }
                </Link>
            </div>
        </section>
    )
}
export default PageNotFound