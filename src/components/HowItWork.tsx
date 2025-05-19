"use client"

import { motion, useAnimation } from 'framer-motion';
import { ChatBubbleBottomCenterTextIcon, MagnifyingGlassIcon, BellAlertIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    title: 'Monitor Real-Time Data',
    description: 'We continuously scan 500+ trusted sources to detect emerging crises worldwide with 99.9% accuracy.',
    icon: MagnifyingGlassIcon,
    color: 'from-blue-500 to-indigo-600',
    delay: 0.2
  },
  {
    title: 'Analyze with AI',
    description: 'Our advanced AI processes millions of data points to identify critical incidents and assess their potential impacts.',
    icon: ChatBubbleBottomCenterTextIcon,
    color: 'from-purple-500 to-indigo-700',
    delay: 0.4
  },
  {
    title: 'Deliver Actionable Alerts',
    description: 'Receive instant, prioritized alerts with clear recommendations tailored to keep you safe and informed.',
    icon: BellAlertIcon,
    color: 'from-pink-500 to-rose-600',
    delay: 0.6
  },
];

export default function HowItWorks() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const cardHover = {
    y: -10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
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

  return (
    <section className="relative py-28 px-6 md:px-20 overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <motion.div 
        ref={ref}
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate={controls}
        variants={container}
      >
        <motion.div 
          variants={item}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">CrisisNet</span> Works
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-gray-600 text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our three-step process ensures you get the most accurate, timely crisis information when it matters most.
          </motion.p>
        </motion.div>

        {/* Process timeline */}
        <div className="relative">
          {/* Animated connecting line */}
          <motion.div 
            className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={item}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={cardHover}
                className="group relative bg-white rounded-2xl p-8 shadow-sm  transition-all duration-300 border border-gray-100 cursor-default"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                  {index + 1}
                </div>

                {/* Icon with gradient background */}
                <motion.div 
                  className={`flex items-center justify-center mb-6 w-16 h-16 rounded-2xl mx-auto bg-gradient-to-br ${step.color} text-white`}
                  whileHover={iconHover}
                >
                  <step.icon className="w-8 h-8" aria-hidden="true" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {step.title}
                </h3>

                <p className="text-gray-700 text-center leading-relaxed">
                  {step.description}
                </p>

                {/* Hover effect border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-${step.color.split(' ')[1]} transition-all duration-300 pointer-events-none`}></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.location.href = '/login'}
          >
            Get Started with CrisisNet
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}