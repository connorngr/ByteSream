// src/app/components/common/Hero.tsx
"use client"
import { useState, useEffect } from "react";
import { Article } from "@/types";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";

interface HeroProps {
  articles: Article[];
  interval?: number; // Time in milliseconds between slides
}

export default function Hero({ articles, interval = 5000 }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate through articles
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, interval);
    return () => clearInterval(timer);
  }, [articles, interval]);

  // Get current article
  const currentArticle = articles[currentIndex];

  if (!currentArticle) return null;

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Image with slide effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentArticle.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
          <img
            src={currentArticle.thumbnailUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentArticle.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5
            }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-gradient-to-r from-primary-500 to-primary-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-5 shadow-xl transform -rotate-1 border-2 border-white/30 backdrop-blur-sm animate-pulse">
              ★ Featured Article
            </span>
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight text-white shadow-text">
              {currentArticle.title}
            </h1>
            <p className="text-white text-lg mb-6 opacity-90 shadow-text max-w-2xl">
              {currentArticle.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {currentArticle.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/20 text-white shadow-text backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/articles/${currentArticle.id}`}
              className="inline-block bg-primary text-primary-800 px-6 py-3 rounded-md hover:bg-primary-50 transition transform hover:-translate-y-1 duration-300 shadow-lg font-medium"
            >
              Read Article
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      {articles.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
          {articles.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-white/50 hover:bg-white/80"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Bottom gradient for better text visibility */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
    </section>
  );
}