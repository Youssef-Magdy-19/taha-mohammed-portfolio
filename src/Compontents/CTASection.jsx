import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";


const CTASection = () => {
    const { t } = useTranslation()
    const whatsappNumber = "201020666116";

    const whatsappMessage = encodeURIComponent(
        t("contactSection.message") // محتوى الرسالة حسب اللغة
    );

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage};`
    return (
        <motion.section
            className="cta bg-blue-500 text-white rounded-2xl text-center shadow-lg max-w-4xl"
            style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '40px', padding: '30px 20px' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >
            <h2 className="text-2xl md:text-3xl font-bold" style={{ marginBottom: '15px' }}>
                {t('title')}
            </h2>
            <p className="text-lg mb-6" style={{ marginBottom: '22px',padding:'0 10px' }}>
                {t('description')}
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
                <HashLink smooth to="/#contact"
                    style={{ padding: '10px 18px' }}
                    className="pd-contact-btn bg-white text-blue-500 font-semibold rounded-full shadow hover:bg-gray-100 transition"
                >
                    {t('contactBtn')}
                </HashLink>
                <a
                    href={whatsappLink}
                    target="_blank"
                    style={{  padding: '10px 18px' }}
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all shadow-md inline-flex items-center gap-[.5rem]"
                >
                    <FaWhatsapp className="text-xl" />
                    {t("contactSection.button")}
                </a>
            </div>
        </motion.section>
    );
};

export default CTASection;
