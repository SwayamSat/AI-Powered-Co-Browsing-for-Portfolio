import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, Trophy, BadgeCheck, Star } from "lucide-react";

const achievements = [
  { title: "Smart India Hackathon 2024", desc: "University Level Qualified, 90%+ accuracy", icon: Trophy },
  { title: "HAL Internship Recognition", desc: "Outstanding performance in AI & software engineering", icon: Award },
  { title: "Oracle OCI Data Science Professional", desc: "Certified 2025", icon: BadgeCheck },
  { title: "J.P. Morgan Software Engineering", desc: "Forage Virtual Experience", icon: Star },
];

const AchievementsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 sm:py-32">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">Achievements</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-12">Certifications & Awards</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card rounded-2xl p-5 flex gap-4 items-start hover:glow-purple transition-shadow duration-300"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-glow-purple/10 flex items-center justify-center">
                  <a.icon className="w-5 h-5 text-glow-purple" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold">{a.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
