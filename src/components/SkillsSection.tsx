import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Code, Cpu, Wrench, Cloud, Brain } from "lucide-react";

const categories = [
  {
    title: "Languages",
    icon: Code,
    items: ["Python", "MySQL", "PostgreSQL"],
  },
  {
    title: "Frameworks & Libraries",
    icon: Cpu,
    items: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "OpenCV", "Pandas", "NumPy", "Langchain"],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    items: ["VS Code", "Google Colab", "Git & GitHub", "Docker", "Streamlit Cloud", "Vector Databases"],
  },
  {
    title: "Cloud & MLOps",
    icon: Cloud,
    items: ["AWS (S3, EC2)", "Google Cloud AI Platform", "FastAPI", "Model Deployment Pipelines"],
  },
  {
    title: "Domains",
    icon: Brain,
    items: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Generative AI", "Data Visualization", "LLMops", "RAG"],
  },
];

const SkillsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="py-24 sm:py-32">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">Skills</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-12">Tech Stack</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: ci * 0.1, duration: 0.5 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <cat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1.5 rounded-lg bg-secondary text-foreground border border-border hover:border-accent/40 hover:text-accent hover:shadow-[0_0_12px_hsla(190,100%,50%,0.15)] transition-all duration-200 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
