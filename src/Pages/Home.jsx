import Servies from '../Compontents/Servies'
import HeroSlider from '../Compontents/HeroSlider'
import React, { useEffect } from 'react'
import SomeProjects from '../Compontents/SomeProjects'
import { ArrowUp} from 'lucide-react'
import Idea from '../Compontents/Idea'
import BrandsClient from '../Compontents/BrandsClient'
import Contact from '../Compontents/Contact'
import useWindowScrollToTop from '../hooks/useWindowScrollToTop'
import { useLoading } from '../context/LoadingContext'

const Home = ({currentMode}) => {
const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useWindowScrollToTop()
  return (
    <div style={{paddingTop:'60px'}}>
      <HeroSlider />
      <Servies currentMode={currentMode} />
      <Idea />
      <SomeProjects />
      <BrandsClient />
      <Contact />
    </div>
  )
}

export default Home
