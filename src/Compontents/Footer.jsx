// @ts-ignore
import React from 'react'
// @ts-ignore
const logoLight = '/images/taha-logo.png'
// @ts-ignore
const logoDark = '/images/taha-white.png';
import { Link } from 'react-router-dom'
import { FaFacebookF, FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'


const Footer = ({ currentMode }) => {
  const { t, i18n } = useTranslation()
  const whatsappNumber = "201020666116";
  const whatsappLink = `https://wa.me/${whatsappNumber}`
  return (
    <footer className='w-full flex flex-col-reverse items-center md:flex-row md:justify-between md:items-center border-t border-t-gray-300' style={{ padding: "0px 20px", marginTop: '40px' }}>
      <div className='flex gap-3 items-center'>
        {currentMode == 'light' ?
          <Link to='/' className={`footer-logo ${i18n.language == 'ar' ? 'right-[7%]' : 'left-[7%]'}`}><img src={logoLight} loading='lazy' className='transition-all' alt="" width={40} height={40} /></Link> :
          <Link to='/' className={`footer-logo ${i18n.language == 'ar' ? 'right-[7%]' : 'left-[7%]'}`}><img src={logoDark} loading='lazy' className='transition-all' width={40} height={40} /> </Link>
        }
        <div className='hidden md:block h-7 border-r border-gray-500/60'></div>
        <p className='text-gray-500 text-xs md:text-sm '>{t('footer.copyright')} | {t('footer.developed')}</p>
      </div>
      <div className={`footer-links flex gap-2 items-center justify-end  `}>
        <a href='https://www.facebook.com/share/1AEQoCdaWL/' target='_blank' className='cursor-pointer border border-gray-300 rounded-full flex items-center justify-center w-8 h-8 ' >
          <FaFacebookF className='w-5 h-5' />
        </a>
        <a href={whatsappLink} target='_blank' className='cursor-pointer border border-gray-300 rounded-full flex items-center justify-center w-8 h-8 ' >
          <FaWhatsapp className='w-5 h-5' />
        </a>
        <a href='#' target='_blank' className='cursor-pointer border border-gray-300 rounded-full flex items-center justify-center  w-8 h-8 ' >
          <FaInstagram className='w-5 h-5' />
        </a>
      </div>
    </footer>
  )
}

export default Footer
