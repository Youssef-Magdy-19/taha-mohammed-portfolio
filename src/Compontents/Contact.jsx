import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";

const ContactSection = () => {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";
  const whatsappNumber = "201020666116"; 

  const whatsappMessage = encodeURIComponent(
    t("contactSection.message") // محتوى الرسالة حسب اللغة
  );

  const whatsappLink =`https://wa.me/${whatsappNumber}?text=${whatsappMessage};`

  return (
    <section className="contact bg-gray-50 " id="contact" style={{padding:'30px 0 '}}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{margin:'auto', padding:'0 15px'}}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 " style={{marginBottom:"15px"}}>
          {t("contactSection.title")}
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto" style={{margin:'auto' }}>
          {t("contactSection.description")}
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          style={{marginTop:'30px' , padding:'10px 18px'}}
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition-all shadow-md inline-flex items-center gap-[.5rem]"
        >
            <FaWhatsapp className="text-xl" />
          {t("contactSection.button")}
        </a>
      </motion.div>
    </section>
  );
};

export default ContactSection;
