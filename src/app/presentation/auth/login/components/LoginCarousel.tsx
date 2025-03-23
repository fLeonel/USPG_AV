'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const LoginCarousel = () => {
  const slides = [
    {
      image: "/img/Img1.webp",
      title: "Bienvenido a USPG Virtual Assistance",
      description: "Un sistema académico moderno para gestionar notas, eventos y notificaciones.",
    },
    {
      image: "/img/login_intro.webp",
      title: "Organiza tus actividades",
      description: "Visualizá tu calendario, recordatorios y eventos de forma intuitiva.",
    },
    {
      image: "/img/3DLogin4.jpeg",
      title: "Gestiona tus notas",
      description: "Consultá tu rendimiento académico con reportes claros y detallados.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start p-4 text-center">
      <div className="relative w-[500px] h-[360px] mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 h-24" />
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.h1
        key={slide.title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold"
      >
        {slide.title}
      </motion.h1>

      <motion.p
        key={slide.description}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg mt-2"
      >
        {slide.description}
      </motion.p>
    </div>
  );
};
