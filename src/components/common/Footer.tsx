'use client';

import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const hoverEffect = {
    scale: 1.05,
    color: "#ffffff",
    transition: { duration: 0.2 }
  };

  const tapEffect = {
    scale: 0.98
  };

  return (
    <motion.footer 
      className="bg-gradient-to-b from-indigo-900 to-indigo-950 text-indigo-200 py-16 px-6 md:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={container}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand section */}
        <motion.div 
          className="text-center md:text-left"
          variants={item}
        >
          <h3 className="text-2xl font-bold mb-3 text-white">CrisisNet</h3>
          <p className="text-sm max-w-sm leading-relaxed">
            Real-time crisis alerts powered by AI & cloud computing — helping you stay safe and informed.
          </p>
          <p className="mt-4 text-xs text-indigo-400">
            &copy; {currentYear} CrisisNet. All rights reserved.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.nav 
          className="flex flex-col md:flex-row gap-4 md:gap-8 items-center"
          variants={container}
        >
          {[
            { href: "/", label: "Home" },
            { href: "/alerts", label: "Alerts" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" }
          ].map((link) => (
            <motion.div key={link.href} variants={item}>
              <Link 
                href={link.href} 
                className="hover:text-white transition-colors text-sm font-medium"
              >
                <motion.span
                  whileHover={hoverEffect}
                  whileTap={tapEffect}
                  className="block py-1"
                >
                  {link.label}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Social links */}
        <motion.div 
          className="flex gap-5 text-xl"
          variants={container}
        >
          {[
            { href: "https://github.com", icon: <FaGithub />, label: "GitHub" },
            { href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
            { href: "https://linkedin.com", icon: <FaLinkedin />, label: "LinkedIn" }
          ].map((social) => (
            <motion.div key={social.label} variants={item}>
              <Link 
                href={social.href} 
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <motion.span
                  whileHover={hoverEffect}
                  whileTap={tapEffect}
                  className="block"
                >
                  {social.icon}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Additional footer info */}
      <motion.div 
        className="mt-12 pt-6 border-t border-indigo-800 text-center text-xs text-indigo-500"
        variants={item}
      >
        <p>CrisisNet is not responsible for the accuracy of third-party data sources.</p>
      </motion.div>
    </motion.footer>
  );
}