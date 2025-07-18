import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

const AfterSlider = ({ images, activeImage, setActiveImage, setIsZoomOpen }) => {
    const scrollRef = useRef(null);
    const containerRef = useRef(null);
    const [canScroll, setCanScroll] = useState(false);

    const setRefs =(element)=>{
        scrollRef.current = element
        containerRef.current = element
    }

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            setCanScroll(container.scrollWidth > container.clientWidth);
        }
    }, [images]);

    const scrollLeft = () => {
        containerRef.current.scrollBy({ left: -150, behavior: "smooth" });
    };

    const scrollRight = () => {
        containerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    };


    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 1.05, transition: { duration: 0.3 } },
    };
    const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);
    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;
        const scrollAmount = 200; // المسافة اللي هيتحركها في كل ضغطة
        if (direction === "left") {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };
    return (
        <div>
            {/* ✅ السلايدر */}
            <motion.div
                className="slider relative w-full max-w-4xl overflow-hidden rounded-lg shadow-lg h-[400px] md:h-[500px] bg-black"
                style={{ margin: 'auto' }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeImage}
                        src={images[activeImage]}
                        alt="Project"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                        // style={{padding:'0 70px'}}
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        loading="lazy"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.x > 100) prevImage();
                            else if (info.offset.x < -100) nextImage();
                        }}
                    />
                </AnimatePresence>

                {/* أزرار التنقل */}
                <button
                    onClick={prevImage}
                    style={{ padding: '10px' }}
                    className="absolute top-1/2 -translate-y-1/2 left-4 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                >
                    <ChevronLeft size={28} />
                </button>
                <button
                    onClick={nextImage}
                    style={{ padding: '10px' }}
                    className="absolute top-1/2 -translate-y-1/2 right-4 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                >
                    <ChevronRight size={28} />
                </button>

                {/* عداد الصور */}
                <motion.div
                    style={{ padding: '5px 13px' }}
                    className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white rounded-lg text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {activeImage + 1} / {images.length}
                </motion.div>

                {/* زر تكبير */}
                <motion.button
                    onClick={() => setIsZoomOpen(true)}
                    style={{ padding: '7px' }}
                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
                    whileHover={{ scale: 1.1 }}
                >
                    <Maximize2 size={22} />
                </motion.button>
            </motion.div>

            <div className="relative max-w-4xl mx-auto mt-5">
                {/* زرار الشمال */}
                {canScroll &&
                    (<button
                        onClick={() => {
                            scroll("left")
                            scrollLeft()
                        }}
                        className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-10"
                    >
                        <ChevronLeft size={24} />
                    </button>)
                }



                {/* ✅ الصور المصغرة */}
                <motion.div
                    ref={setRefs}
                    style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', scrollBehavior: "smooth" }}
                    className="flex overflow-x-auto gap-3 max-w-4xl hide-scrollbar flex items-center justify-center"
                    initial="hidden"
                    animate="visible"
                >
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`cursor-pointer border-2 rounded-md overflow-hidden flex-shrink-0 ${activeImage === index ? "border-blue-500" : "border-transparent"
                                }`}
                            whileHover={{ scale: 1.05 }}
                        >
                            <img
                                src={img}
                                alt="Thumbnail" loading="lazy"
                                className="w-24 h-20 object-cover hover:opacity-80 transition"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* زرار اليمين */}
                {canScroll &&
                    (<button
                        onClick={() => {
                            scroll("right")
                            scrollRight()
                        }}
                        className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-10"
                    >
                        <ChevronRight size={24} />
                    </button>)
                }
            </div>
        </div>
    )
}
export default AfterSlider