import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Brain, MessageSquare, Eye, Rocket, BarChart3, Layers } from "lucide-react";

const services = [
  { title: "AI Model Development", desc: "Custom ML/DL models tailored to your data and business needs.", icon: Brain },
  { title: "LLM Application Development", desc: "Build intelligent apps powered by large language models.", icon: MessageSquare },
  { title: "NLP & Computer Vision Systems", desc: "Text understanding and image analysis solutions at scale.", icon: Eye },
  { title: "End-to-End ML Deployment", desc: "From prototype to production with CI/CD and monitoring.", icon: Rocket },
  { title: "Data Analytics Automation", desc: "Automated pipelines turning raw data into actionable insights.", icon: BarChart3 },
  { title: "Full-Stack AI Applications", desc: "Complete AI-powered web applications with modern architecture.", icon: Layers },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 sm:py-32">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">Services</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-12">What I Offer</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card rounded-2xl p-6 group hover:-translate-y-1 hover:glow-yellow transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
