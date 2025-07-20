import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {  X } from "lucide-react";
import { data } from "../data/data"; // ملف الداتا
import { useTranslation } from "react-i18next";
import AfterSlider from "../Compontents/AfterSlider";
import BeforeSlider from "../Compontents/BeforeSlider";
import CardProject from "../Compontents/CardProject";
import CTASection from "../Compontents/CTASection";
import { useLoading } from "../context/LoadingContext";


const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};


const ProjectDetails = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const [projectData, setProjectData] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [relatedProjects, setRelatedProjects] = useState([])
  const { setIsLoading } = useLoading();

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0)
    }
  }, [id])

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);



  // البحث عن المشروع عند تغيير ID
  useEffect(() => {
    const foundProject = data.find((item) => item.id === parseInt(id));
    let foundRelatedProjects = data.filter(project => project.category == foundProject.category)
    foundRelatedProjects = foundRelatedProjects.filter(project => project !== foundProject)
    setTimeout(() => {
      setProjectData(foundProject);
      setRelatedProjects(foundRelatedProjects)
    }, 1000); // محاكاة تحميل
  }, [id]);
  const images = projectData?.images || [];
  const beforeImages = projectData?.beforeImages || []

  // أنيميشنات
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const modalAnim = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  if (!projectData) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 mt-20">
        <p>{t('project.notFound')}</p>
      </div>
    );
  }

  return (
    <section className="container min-h-screen" style={{ padding: '50px 0' }}>
      {/* ✅ Breadcrumbs */}
      <motion.nav
        className="project-nav text-gray-600 text-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "15px", marginTop: '50px' }}
      >
        <Link to="/" className="hover:text-blue-500">
          {currentLang === "ar" ? "الرئيسية" : "Home"}
        </Link>
        <span style={{ margin: '0 7px' }}>{">"}</span>
        <Link to="/projects" className="hover:text-blue-500">
          {currentLang === "ar" ? "المشاريع" : "Projects"}
        </Link>
        <span style={{ margin: '0 7px' }}>{">"}</span>
        <span className="font-semibold">{i18n.language == 'ar' ? projectData.title.ar : projectData.title.en}</span>
      </motion.nav>

      {/* ✅ العنوان والوصف */}
      <motion.div
        className="text-center"
        style={{ marginBottom: "15px" }}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className="project-name text-3xl md:text-4xl font-bold text-gray-800" style={{ marginBottom: '7px' }}>
          {i18n.language == 'ar' ? projectData.title.ar : projectData.title.en}
        </h1>
        <p className="project-desc text-gray-600 max-w-2xl" style={{ margin: 'auto' }}>
          {i18n.language == 'ar' ? projectData.description.ar : projectData.description.en}
        </p>
      </motion.div>

      {/* سلايدر ما قبل الشغل */}
      {beforeImages.length >= 2 &&
        <div className="before border-b border-gray-300" style={{ marginBottom: '25px', marginTop: "20px", paddingBottom: '30px' }}>
          <h3 className="text-center font-semibold text-2xl md:text-3xl text-gray-700">{t('beforeProjectTitle')}</h3>
          <BeforeSlider images={beforeImages} />
        </div>
      }

      {/* سلايدر بعد الشغل بمعني نتيجه الشغل */}
      <div className="after border-b border-gray-300" style={{ paddingBottom: '25px' }}>
        <h3 className="text-center font-semibold text-2xl md:text-3xl text-gray-700" style={{ marginBottom: '15px' }}>{t('afterProjectTitle')}</h3>
        <AfterSlider images={images} activeImage={activeImage} setActiveImage={setActiveImage} setIsZoomOpen={setIsZoomOpen} />
      </div>

      {/* ✅ تفاصيل المشروع */}
      <motion.div
        style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', paddingBottom: '20px' }}
        className="project-details max-w-4xl text-gray-700 leading-7 border-b border-gray-300"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold " style={{ marginBottom: '15px' }}>{t('project.projectAbout')}</h2>
        <p>{i18n.language == 'ar' ? projectData.details.ar : projectData.details.en}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginTop: "17px" }}>
          <div>
            <h3 className="text-lg font-semibold" style={{ marginBottom: '7px' }}>{t('project.materials')}</h3>
            <ul className="list-disc list-inside flex items-center gap-[1rem] flex gap-[1rem] flex-wrap">
              {i18n.language == 'ar' ? projectData.materials.ar.map((item,index) => (<li key={index} style={{ marginRight: "20px" }}>{item}</li>)) : projectData.materials.en.map((item,index) => (<li key={index} style={{ marginRight: "20px" }}>{item}</li>))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ marginBottom: '7px' }}>{t('project.title')}</h3>
            <ul className="list-disc list-inside flex items-center gap-[1rem] flex-wrap">
              {i18n.language == 'ar' ? projectData.services.ar.map((item ,index)=> (<li key={index} style={{ marginRight: "20px" }}>{item}</li>)) : projectData.services.en.map((item ,index)=> (<li key={index} style={{ marginRight: "20px" }}>{item}</li>))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* ✅ مودال تكبير الصورة */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            variants={modalAnim}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative max-w-5xl w-full" style={{ padding: '20px' }}>
              <img
                loading='lazy'
                src={images[activeImage]}
                alt="Zoom"
                className="w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setIsZoomOpen(false)}
                style={{ padding: '7px' }}
                className="absolute top-5 right-5 text-white bg-black bg-opacity-60 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* some Related Projects */}
      <motion.div
        className="border-b border-gray-300"
        style={{ padding: '20px 0 30px 0' }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h4 className="text-xl font-semibold text-gray-700" style={{ marginBottom: "15px" }}>{t('relatedProjects')}</h4>
        {relatedProjects.length > 3 ?
          <div className="Related-Projects grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1rem]">
            {relatedProjects.slice(0, 4).map((project, index) => (
              <CardProject key={`${project.id}`} img={project.img} title={project.title} desc={project.description} id={project.id} animation={itemVariants} />
            ))
            }
          </div> :
          <div className="Related-Projects grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1rem]">
            {relatedProjects.slice(0, 4).map((project, index) => (
              <CardProject key={`${project.id}`} img={project.img} title={project.title} desc={project.description} id={project.id} animation={itemVariants} />
            ))
            }
          </div>
        }
      </motion.div>

      <CTASection />
    </section>
  );
};

export default ProjectDetails;
