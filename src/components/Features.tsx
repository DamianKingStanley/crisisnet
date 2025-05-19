"use client"

import { motion, useAnimation } from 'framer-motion';
import { ShieldCheckIcon, GlobeAltIcon, BoltIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    name: 'Instant Crisis Alerts',
    description:
      'Receive timely, reliable alerts that help you stay prepared for emergencies happening around the world — so you\'re never caught off guard.',
    icon: ShieldCheckIcon,
    color: 'bg-indigo-600',
    hoverColor: 'bg-indigo-700',
    textColor: 'text-indigo-900',
    delay: 0.1
  },
  {
    name: 'AI-Powered Insight',
    description:
      'Our AI analyzes vast amounts of data to surface the most relevant crises and provide actionable context — turning noise into clear, helpful insights.',
    icon: GlobeAltIcon,
    color: 'bg-purple-600',
    hoverColor: 'bg-purple-700',
    textColor: 'text-purple-900',
    delay: 0.2
  },
  {
    name: 'Seamless Cloud Access',
    description:
      'Access CrisisNet anytime, anywhere, on any device — with cloud-powered speed and security that scales to your needs.',
    icon: BoltIcon,
    color: 'bg-pink-600',
    hoverColor: 'bg-pink-700',
    textColor: 'text-pink-900',
    delay: 0.3
  },
];

export default function Features() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const iconHover = {
    scale: 1.1,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  };

  const cardHover = {
    y: -8,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  };

  return (
    <section className="relative bg-white py-24 px-6 md:px-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <motion.div 
        ref={ref}
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate={controls}
        variants={container}
      >
        <motion.div variants={item} className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">CrisisNet?</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-gray-600 text-xl leading-relaxed"
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Empower yourself with a smarter, faster way to understand global crises — crafted to keep you informed and ready.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={item}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={cardHover}
              className={`group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-default overflow-hidden`}
            >
              {/* Hover effect background */}
              <div className={`absolute inset-0 ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Icon container with animation */}
              <motion.div 
                className={`flex items-center justify-center mb-6 w-16 h-16 ${feature.color} text-white rounded-2xl mx-auto`}
                whileHover={iconHover}
              >
                <feature.icon className="w-8 h-8" aria-hidden="true" />
              </motion.div>
              
              <h3 className={`text-2xl font-bold ${feature.textColor} mb-4 text-center`}>
                {feature.name}
              </h3>
              
              <p className="text-gray-700 text-center leading-relaxed">
                {feature.description}
              </p>
              
              {/* Animated underline on hover */}
              <motion.div 
                className={`absolute bottom-0 left-1/2 h-1 ${feature.color} w-0 group-hover:w-1/2`}
                initial={{ x: "-50%" }}
                whileHover={{ 
                  width: "50%",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats counter animation */}
        <motion.div 
          className="mt-20 pt-12 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "99.9%", label: "Accuracy Rate" },
              { value: "30s", label: "Update Speed" },
              { value: "150+", label: "Countries Covered" },
              { value: "24/7", label: "Monitoring" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                  {stat.value}
                </div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}