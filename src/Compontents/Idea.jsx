import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Lightbulb } from "lucide-react" // أيقونة الإبداع

const Idea = () => {
    const { t, i18n } = useTranslation()
    const isRTL = i18n.language === "ar"

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.3,
                duration: 0.6,
                ease: "easeOut"
            }
        })
    }
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="ideaSection bg-white" style={{ padding: '70px 0px' }}>
            <div className="container max-w-4xl mx-auto text-center">
                <motion.div
                    className={`flex items-center justify-center gap-3 `}
                    style={{ marginBottom: '8px' }}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                >
                    <Lightbulb className="w-8 h-8 text-blue-500" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 relative inline-block">
                        {t("aboutSection.title")}
                    </h2>
                </motion.div>

                <span className="block w-20 h-1 bg-blue-500 mt-2 mx-auto rounded-full" style={{ margin: 'auto' }}></span>

                {[1, 2, 3].map((i) => (
                    <motion.p
                        key={i}
                        custom={i}
                        // @ts-ignore
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        className="text-lg mt-6 text-gray-600"
                        style={{padding:'0 15px' , marginTop:'20px'}}
                    >
                        {t(`aboutSection.paragraph${i}`)}
                    </motion.p>
                ))}
            </div>
        </section>
    )
}

export default Idea
