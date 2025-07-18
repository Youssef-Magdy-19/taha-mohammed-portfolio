import { Languages } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'



const LanguageSwitcher = () => {
    const { i18n } = useTranslation()
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    const languages = [
        { code: 'en-US', label: 'English', flag: 'https://flagcdn.com/gb.svg' },
        { code: 'ar', label: 'العربية', flag: 'https://flagcdn.com/eg.svg' },
    ]

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
        setOpen(false)
    }

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const currentLang = languages.find((lang) => lang.code === i18n.language)

    const handleLanguageChange = (lang) => {
        // أضف كلاس لتعطيل الترانزيشن
        document.documentElement.classList.add('disable-transition')

        // غير اللغة والاتجاه
        i18n.changeLanguage(lang)
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'

        // بعد شوية شيله تاني علشان الترانزيشن ترجع تشتغل
        setTimeout(() => {
            document.documentElement.classList.remove('disable-transition')
        }, 300)
    }

    return (
        <div className="relative text-sm select-none" ref={dropdownRef}>
            <div
                onClick={() => setOpen(!open)}
                style={{ padding: '5px 12px' }}
                className="btn-lang cursor-pointer flex items-center gap-2 bg-gray-200  text-gray-800 border border-gray-400 rounded-md shadow-sm hover:bg-gray-300 transition"
            >
                <img src={currentLang.flag} alt="flag" className="w-5 h-5 rounded-full" />
                <span>{currentLang.label}</span>
                <span className="text-xs">▼</span>
            </div>

            {open && (
                <div style={{ marginTop: "8px" }} className="dropdown absolute right-0 mt-2 w-36 bg-white  border border-gray-200 shadow-lg rounded-md z-50 overflow-hidden animate-fadeIn">
                    {languages.map((lang) => (
                        <div
                            key={lang.code}
                            onClick={() => {
                                changeLanguage(lang.code)
                                handleLanguageChange(lang.code)
                            }}
                            style={{ padding: '7px 12px' }}
                            className={`flex items-center gap-2 cursor-pointer hover:bg-gray-100  transition ${i18n.language === lang.code ? 'font-semibold text-blue-600' : ''
                                }`}
                        >
                            <img src={lang.flag} className="w-4 h-4 rounded-full" />
                            {lang.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageSwitcher