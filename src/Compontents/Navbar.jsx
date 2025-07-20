import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
// @ts-ignore
const logoLight = '/images/taha-logo.png'
// @ts-ignore
const logoDark = '/images/taha-white.png'
import { Link, useLocation } from 'react-router-dom'
// @ts-ignore
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwither'
import { HashLink } from 'react-router-hash-link'


const Navbar = ({currentMode , setCurrentMode}) => {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    // ملحوظه مهمه اوي في تغيير صور الايقونات في سيكشن الخدمات محتاجين كل ما المود يتغير الصوره تتغير علي طول تلقاي المشكله كانت ان عامل مخزن لمود الحالي واحد في الهيدر و التاني في الصفحه الرئيسيه فلما بغير المود من الهيدر ده غير ده فالتاني ثابت طالما معملتش اعاده تحميل لصفحة
    // solution => اروح اعمل مخزن واحد لمود الحالي ويكون في الصفحه الرئيسيه و ابعته كبروب لهيدر والبروبس ديه هي الهستخدمها في اللوجيك كله بتاع الهيدر بدل من المخزن وبالتالي لما اعدل علي قيمه المحزن لما ادوس علي الزرار هيتغير في الاتنين فتتغير الصور
    // const [currentMode, setCurrentMode] = useState(localStorage.getItem('currentMode') ?? 'light')
    const [isOpen, setIsOpen] = useState(false)
    // @ts-ignore
    const sidebarRef = useRef()
    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutSide)
        } else {
            document.removeEventListener("mousedown", handleClickOutSide)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutSide)
        }
    }, [isOpen])
    // ده الكود القديم هو صح وكل حاجه بس مش ظابط مع تيلوند
    useEffect(() => {
        if (currentMode == 'dark') {
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
        }
        localStorage.setItem('currentMode', currentMode)
    }, [currentMode])

    return (
        <>
            <header className='fixed z-50 w-full h-[60px] border-b border-gray-300 bg-white'>
                <div className="container flex items-center justify-between">
                    <button className='block md:hidden p-[7px] cursor-pointer' onClick={() => setIsOpen(true)}><Menu className="w-6 h-6 text-gray-500" /></button>
                    {currentMode == 'light' ?
                        <Link to='/' ><img loading='lazy' src={logoLight} className='transition-all' alt="" width={50} height={50} /></Link> :
                        <Link to='/' ><img loading='lazy' src={logoDark} className='transition-all' width={50} height={50} /> </Link>
                    }
                    <nav className='hidden md:block'>
                        <ul className='flex items-center gap-[2rem]'>
                            <li>
                                <Link to="/"
                                    className={`${location.pathname == '/' ? '`active text-blue-500 font-semibold' : 'text-gray-600 '} hover:text-blue-500 transition-all`}
                                >
                                    {t('home')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects"
                                    className={`${location.pathname == '/projects' ? '`active text-blue-500 font-semibold' : 'text-gray-600 '} hover:text-blue-500 transition-all`}
                                >
                                    {t('projects')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/about"
                                    className={`${location.pathname == '/about' ? '`active text-blue-500 font-semibold' : 'text-gray-600 '} hover:text-blue-500 transition-all`}
                                >
                                    {t('about')}
                                </Link>
                            </li>
                            <li>
                                <HashLink smooth to="/#contact"
                                    className={`${location.pathname == '/#contact' ? '`active text-blue-500 font-semibold' : 'text-gray-600 '} hover:text-blue-500 transition-all`}
                                >
                                    {t('contact')}
                                </HashLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex gap-[1rem] items-center">
                        {/* button switch language */}
                        <LanguageSwitcher />
                        {/* button switch mode */}
                        {currentMode == 'light' ?
                            <div className="btn-mode transition-all flex items-center justify-center text-gray-500 hover:text-yellow-500 border border-gray-400 cursor-pointer rounded-full w-[35px] h-[35px]"
                                onClick={() => {
                                    setCurrentMode(() => currentMode == 'light' ? 'dark' : 'light')
                                    localStorage.setItem('currentMode', currentMode)
                                }}
                            >
                                <Sun className="w-6 h-6" />
                            </div>
                            :
                            <div className="btn-mode transition-all flex items-center justify-center text-gray-500 hover:text-white border border-gray-400 cursor-pointer rounded-full w-[35px] h-[35px]"
                                onClick={() => {
                                    setCurrentMode(() => currentMode == 'light' ? 'dark' : 'light')
                                    localStorage.setItem('currentMode', currentMode)
                                }}
                            >
                                <Moon className="w-6 h-6" />
                            </div>
                        }

                    </div>

                </div>
            </header>

            {/* overlay */}
            <div className={`fixed inset-0 bg-black/30 z-40 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}></div>

            {/*  side bar  */}
            <aside ref={sidebarRef} className={`sidebar fixed z-50 top-0 bottom-0 ${i18n.language === 'ar' ? 'right-0' : 'left-0'}  w-[75%] min-h-screen duration-300 transition-all bg-white text-gray-800 shadow-lg transform transition-transform ease-in-out  ${isOpen ? 'translate-x-0' : `${i18n.language === 'ar' ? 'translate-x-full' : '-translate-x-full'}`} `}>
                <button
                    className={`fixed top-5 ${i18n.language === 'ar' ? 'left-5' : 'right-5'}  cursor-pointer text-gray-500 hover:text-red-600`}
                    onClick={() => setIsOpen(false)}
                >
                    <X className="w-6 h-6" />
                </button>
                <nav style={{ marginTop: '50px', padding: '10px 0px' }}>
                    <ul className='flex flex-col justify-center'>
                        <li style={{ padding: '12.5px' }}
                            className={`cursor-pointer hover:bg-gray-100 overflow-hidden ${location.pathname == '/' ? 'resactive text-blue-500 font-semibold' : 'text-gray-600'}  hover:text-blue-600 transition-all`}
                        >
                            <Link onClick={() => setIsOpen(false)}
                                style={{padding:`${i18n.language == 'ar' ? '0 0 0 210px' : '0 210px 0 0 '}`}}
                                to="/"
                            >
                                {t('home')}
                            </Link>
                        </li>
                        <li style={{ padding: '12.5px' }}
                            className={`cursor-pointer hover:bg-gray-100 overflow-hidden ${location.pathname == '/projects' ? 'resactive text-blue-500 font-semibold' : 'text-gray-600'}  hover:text-blue-600 transition-all`}
                        >
                            <Link onClick={() => setIsOpen(false)}
                                style={{padding:`${i18n.language == 'ar' ? '0 0 0 173px' : '0 140px 0 0 '}`}}
                                to="/projects"
                            >
                                {t('projects')}
                            </Link>
                        </li>
                        <li style={{ padding: '12.5px' }}
                            className={`cursor-pointer hover:bg-gray-100 overflow-hidden ${location.pathname == '/about' ? 'resactive text-blue-500 font-semibold' : 'text-gray-600'}  hover:text-blue-600 transition-all`}
                        >
                            <Link onClick={() => setIsOpen(false)}
                                style={{padding:`${i18n.language == 'ar' ? '0 0 0 190px' : '0 180px 0 0 '}`}}
                                to="/about"
                            >
                                {t('about')}
                            </Link>
                        </li>
                        <li style={{ padding: '12.5px' }}
                            className={`cursor-pointer hover:bg-gray-100 overflow-hidden ${location.pathname == '/#contact' ? 'resactive text-blue-500 font-semibold' : 'text-gray-600'}  hover:text-blue-500 transition-all`}
                        >
                            <HashLink smooth to="/#contact" onClick={() => setIsOpen(false)}
                                style={{padding:`${i18n.language == 'ar' ? '0 0 0 170px' : '0 175px 0 0 '}`}}
                            >
                                {t('contact')}
                            </HashLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Navbar
