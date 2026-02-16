import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Briefcase } from "lucide-react";

const metrics = [
  { label: "Daily Entries Managed", value: "200+" },
  { label: "Reduced Approval Time", value: "40%" },
  { label: "Improved DB Efficiency", value: "25%" },
];

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="py-24 sm:py-32">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">Experience</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-12">Work History</h2>

          <div className="relative border-l-2 border-border ml-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative pl-8"
            >
              <div className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                <Briefcase className="w-3 h-3 text-primary" />
              </div>
              <div className="glass-card rounded-2xl p-6 hover:glow-yellow transition-shadow duration-300">
                <span className="text-xs text-primary font-medium">Jun 2024 – Jul 2024</span>
                <h3 className="font-heading text-xl font-semibold mt-1">AI & Software Engineering Intern</h3>
                <p className="text-accent text-sm font-medium">Hindustan Aeronautics Limited (HAL)</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Developed full-stack Flask–MySQL gate-pass automation system</li>
                  <li>• Managed 200+ daily employee entries</li>
                  <li>• Built secure admin dashboard & real-time tracking APIs</li>
                </ul>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {metrics.map((m) => (
                    <div key={m.label} className="text-center p-3 rounded-xl bg-background/50">
                      <p className="font-heading text-lg font-bold text-primary">{m.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
