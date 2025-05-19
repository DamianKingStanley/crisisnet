"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false);
  const [alertsCount, setAlertsCount] = useState(0);

  // Simulate fetching live alerts count
  useEffect(() => {
    const interval = setInterval(() => {
      setAlertsCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    
    // Initial count
    setAlertsCount(1247);
    
    return () => clearInterval(interval);
  }, []);

  const handleLearnMoreClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.98 }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/iamges/radient-bg.avif" as="image" />
      </Head>
      
      <section 
        className="relative bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white min-h-[100vh] flex flex-col justify-center px-6 md:px-20 overflow-hidden"
        style={{
          // backgroundImage: "url('/images/gradient-bg.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center md:text-left relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.div 
              className="inline-block px-4 py-2 mb-6 mt-6 bg-white/20 rounded-full backdrop-blur-sm"
              animate="pulse"
              variants={pulseVariants}
            >
              <span className="font-semibold">🚨 {alertsCount}+ Active Alerts</span>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
              CrisisNet:
            </span> Real-time Global Crisis Alerts
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg sm:text-xl max-w-xl mx-auto md:mx-0 drop-shadow-md"
            variants={itemVariants}
          >
            AI-powered emergency monitoring delivering life-saving insights with 99.9% accuracy and <span className="font-semibold">30-second</span> updates.
          </motion.p>
          
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row justify-center md:justify-start gap-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Link
                href="/alerts"
                className="inline-block bg-white text-indigo-700 font-semibold px-8 py-4 rounded-xl shadow-2xl hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300/50"
                aria-label="Explore crisis alerts"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="flex items-center gap-2">
                  Explore Alerts
                  <motion.span
                    animate={{
                      x: isHovering ? [0, 4, 0] : 0
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: isHovering ? Infinity : 0
                    }}
                  >
                    →
                  </motion.span>
                </div>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <button
                onClick={handleLearnMoreClick}
                className="inline-block border-2 border-white/80 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 backdrop-blur-sm"
                aria-label="Learn more about CrisisNet"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Animated background elements */}
        <motion.div 
          className="hidden md:block absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none select-none"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg
            className="w-full h-full"
            fill="none"
            viewBox="0 0 600 600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <motion.path
              d="M300 600C465.685 600 600 465.685 600 300C600 134.315 465.685 0 300 0C134.315 0 0 134.315 0 300C0 465.685 134.315 600 300 600Z"
              fill="white"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
        
        {/* Floating animated elements */}
        <motion.div 
          className="absolute bottom-20 left-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm"
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-cyan-400/20 backdrop-blur-sm"
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </section>
    </>
  );
}