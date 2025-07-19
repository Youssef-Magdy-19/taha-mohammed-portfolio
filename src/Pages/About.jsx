// @ts-ignore
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CheckCircle, Award, PhoneCall } from "lucide-react";
// @ts-ignore
const whyChooseUs = "/images/whychoose.jpeg"
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { HashLink } from "react-router-hash-link";
import { useLoading } from "../context/LoadingContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const zoomImage = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
};

const listParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const listItem = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const AboutPage = () => {
  const { t } = useTranslation();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useWindowScrollToTop()
  return (
    <section className="aboutPage bg-gray-50 text-gray-800" >
      <div className="container">
        {/* ✅ العنوان الرئيسي */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          // @ts-ignore
          variants={fadeScale}
          style={{ padding: '40px 0' }}
          className="text-center"
        >
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{ marginBottom: '15px' }}
          >
            {t("aboutPage.pageTitle")}
          </h1>
          <p
            className="aboutPage-desc text-gray-600 max-w-2xl"
            style={{ marginLeft: 'auto', marginRight: 'auto', }}
          >
            {t("aboutPage.introDesc")}
          </p>
        </motion.div>

        {/* ✅ Why Choose Us */}
        <div className="max-w-6xl grid md:grid-cols-2 gap-10 items-center" style={{ padding: '35px 20ox', marginLeft: 'auto', marginRight: 'auto', marginBottom: "35px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            // @ts-ignore
            variants={zoomImage}
          >
            <img
              src={whyChooseUs}
              loading='lazy'
              alt="Why Choose Us"
              className="rounded-xl shadow-lg w-full h-[220px]"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            // @ts-ignore
            variants={fadeUp}
          >
            <h2 className="text-2xl font-bold" style={{ marginBottom: "20px" }}>{t("aboutPage.whyChooseUsTitle")}</h2>
            <motion.ul
              variants={listParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 flex flex-col gap-3"
            >
              {t("aboutPage.whyChooseUsList", { returnObjects: true }).
                // @ts-ignore
                map((item, index) => (
                  <motion.li key={index} variants={listItem} className="flex items-center gap-3">
                    <CheckCircle className="text-blue-500" size={22} />
                    <span>{item}</span>
                  </motion.li>
                ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* ✅ Achievements */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          // @ts-ignore
          variants={fadeUp}
          style={{ padding: '35px 0' }}
          className="Achievements bg-blue-50"
        >
          <div className="max-w-6xl text-center" style={{ margin: 'auto' }}>
            <Award className="text-blue-500" style={{ marginBottom: "15px", marginLeft: "auto", marginRight: 'auto' }} size={40} />
            <h2 className="text-2xl font-bold" style={{ marginBottom: '15px' }}>{t("aboutPage.achievementsTitle")}</h2>
            <p className="achievementsDesc text-gray-600 max-w-3xl" style={{ margin: 'auto' }}>
              {t("aboutPage.achievementsDesc")}
            </p>
          </div>
        </motion.div>

        {/* ✅ Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          // @ts-ignore
          variants={fadeUp}
          style={{ padding: '40px', margin: '0' }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold" style={{ marginBottom: "15px" }}>{t("aboutPage.ctaTitle")}</h3>
          <p className="about-cta text-gray-600" style={{ marginBottom: "20px" }}>{t("aboutPage.ctaDesc")}</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <HashLink smooth to="/#contact"
              style={{ padding: '10px 20px', marginLeft: 'auto', marginRight: 'auto' }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg"
            >
              <PhoneCall size={20} /> {t("aboutPage.ctaButton")}
            </HashLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;
