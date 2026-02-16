"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";

const roles = ["AI Engineer", "ML Developer", "Generative AI Builder"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; duration: string; size: string }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${8 + Math.random() * 12}s`,
        size: `${1 + Math.random() * 2}px`,
      }))
    );
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-purple/5 rounded-full blur-[150px]" />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{ left: p.left, bottom: "-10px", animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: p.size }}
        />
      ))}

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto mb-8 w-32 h-32 sm:w-40 sm:h-40"
          >
            {/* Animated glow rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 blur-2xl animate-pulse-glow"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 animate-spin-slow blur-xl"></div>

            {/* Image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/40 shadow-[0_0_40px_rgba(255,200,0,0.25)] hover:shadow-[0_0_60px_rgba(255,200,0,0.4)] transition-all duration-500 hover:scale-105">
              <img
                src="/profile.jpg"
                alt="Swayam Satpathy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">Welcome to my portfolio</p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm <span className="text-primary">Swayam Satpathy</span>
          </h1>
          <div className="h-10 mb-8">
            <span className="text-xl sm:text-2xl text-accent font-heading">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
            Building production-level AI systems with LLMs, automation pipelines, and intelligent analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              id="hero-hire-me"
              size="lg"
              className="font-heading font-semibold text-base px-8"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Hire Me
            </Button>
            <Button
              id="hero-resume"
              size="lg"
              variant="outline"
              className="font-heading font-semibold text-base px-8 border-border hover:border-primary/50"
              asChild
            >
              <a href="https://drive.google.com/uc?export=download&id=16WIMbY1B09ChN1FMLS3KB9cg2oQZev8P" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="h-5 w-5 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
