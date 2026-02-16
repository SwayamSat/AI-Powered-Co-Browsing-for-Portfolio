import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { label: "Projects Built", value: 10, suffix: "+" },
  { label: "Avg Accuracy", value: 92, suffix: "%" },
  { label: "Tech Stack Items", value: 30, suffix: "+" },
  { label: "Internships", value: 1, suffix: "" },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-24 sm:py-32">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">About Me</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-8">Who I Am</h2>
          <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed mb-12">
            Results-oriented <span className="text-foreground font-medium">Data Science and AI Engineer</span> skilled in{" "}
            <span className="text-accent">Machine Learning</span>, <span className="text-accent">Deep Learning</span>,{" "}
            <span className="text-accent">NLP</span>, <span className="text-accent">Computer Vision</span>, and{" "}
            <span className="text-accent">Generative AI</span>. Passionate about building scalable AI systems that integrate
            LLMs, automation pipelines, and intelligent analytics to solve real-world problems.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} started={isVisible} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatCard = ({ label, value, suffix, started }: { label: string; value: number; suffix: string; started: boolean }) => {
  const count = useCountUp(value, 1500, started);
  return (
    <div className="glass-card rounded-2xl p-6 text-center">
      <p className="font-heading text-3xl sm:text-4xl font-bold text-primary">
        {count}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
};

export default AboutSection;
