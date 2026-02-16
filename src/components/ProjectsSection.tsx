import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Multi-Agent Research Assistant",
    tech: ["AutoGen", "CrewAI", "LangGraph", "FastAPI", "Next.js"],
    metrics: ["5 specialized agents", "Real-time SSE streaming", "Citation-rich reports"],
    summary: "Orchestrated multi-agent system for autonomous research with topic refinement, paper discovery, and synthesis.",
    details: "A full-stack AI research assistant orchestrating specialized agents (topic refinement, paper discovery, synthesis, report writing, gap analysis) using CrewAI + LangGraph, generating structured, citation-rich literature reports. Implemented real-time agent workflow streaming with FastAPI (SSE) and interactive Next.js frontend for seamless user experience and live progress tracking.",
    github: "https://github.com/SwayamSat/Multi-Agent-Research-Assistant-Using-AutoGen-And-CrewAi",
  },
  {
    title: "Fine-Tuned Phi-3-Mini-3.8B with Personal Data",
    tech: ["Python", "Unsloth", "LoRA", "LLM", "RAG", "Google Colab"],
    metrics: ["3.8B parameters optimized", "Reduced hallucinations", "Custom domain adaptation"],
    summary: "Fine-tuned compact LLM on custom dataset using Unsloth and LoRA for enhanced domain-specific understanding.",
    details: "Fine-tuned a compact 3.8B parameter Phi-3-Mini LLM on custom personal dataset using Unsloth and LoRA techniques, enhancing domain-specific language understanding and reducing hallucinations in RAG workflows. Implemented efficient data preprocessing, custom prompt-response pairs, and low-rank adaptation to improve instruction-following and performance on retrieval-augmented generation tasks. Deployed the optimized model with an inference API, enabling scalable LLM-powered applications tailored to personalized knowledge and high-accuracy contextual responses.",
    github: "https://github.com/SwayamSat/Fine-Tuned-Phi-3-Mini-3.8B-with-personal_data-using-Unsloth",
  },
  {
    title: "Personal AI Wardrobe Stylist",
    tech: ["Next.js", "Supabase", "Gemini Vision", "Deep Learning"],
    metrics: ["92% detection consistency", "38% improved recommendations"],
    summary: "Vision-enabled fashion intelligence system with LLM-driven outfit recommendation engine.",
    details: "A full-stack AI wardrobe application using Gemini Vision API for clothing detection and classification. Features personalized outfit recommendations powered by deep learning models, achieving 92% detection consistency and 38% improvement in recommendation relevance. Built with Next.js frontend, Supabase backend, and real-time image processing pipeline.",
    github: "https://github.com/SwayamSat/Personal-AI-Wardrobe-Stylist",
  },
  {
    title: "S2D – NL to Automated Analytics & ML",
    tech: ["LLMs", "SQLAlchemy", "scikit-learn"],
    metrics: ["8+ analytics tasks automated", "94% classification accuracy", "70% reduced query time"],
    summary: "Natural Language → SQL → ML → Visualization pipeline for automated data analytics.",
    details: "An end-to-end natural language to analytics pipeline that converts plain English queries into SQL, performs ML analysis, and generates visualizations. Automates 8+ analytics tasks with 94% classification accuracy, reducing manual query time by 70%. Leverages LLMs for query understanding, SQLAlchemy for database operations, and scikit-learn for ML modeling.",
    github: "https://github.com/SwayamSat/SPEAK2DATA-Natural-Language-To-Automated-Analytics-Machine-Learning-System",
  },
  {
    title: "FingerFx",
    tech: ["Python", "Computer Vision", "Real-Time Processing", "Gesture Interaction"],
    metrics: ["Real-time filter application", "Natural gesture control", "Dynamic visual effects"],
    summary: "Interactive gesture-controlled visual effects application with real-time image processing and dynamic filters.",
    details: "Developed an interactive gesture-controlled visual effects application that applies dynamic filters (e.g., Black & White, Sparkle, Glitch) in real time using intuitive thumb-index finger movements, enhancing user engagement and creative expression. Engineered responsive image manipulation pipelines with modular filter functions and real-time camera feed processing, enabling seamless visual transformations driven by natural hand gestures. Built a user-centric interface in Python that delivers immersive, real-time visual feedback, showcasing practical applications of computer vision and gesture interaction for interactive media experiences.",
    github: "https://github.com/SwayamSat/FingerFx",
  },
  {
    title: "Micro-Doppler Drone vs Bird Classification",
    tech: ["TensorFlow", "CNN"],
    metrics: ["92% accuracy", "27% reduced false positives"],
    summary: "Radar micro-Doppler signature classification using deep convolutional neural networks.",
    details: "A deep learning system for classifying micro-Doppler radar signatures to distinguish drones from birds. Utilizes convolutional neural networks trained on radar spectrograms, achieving 92% classification accuracy and reducing false positives by 27%. Critical application for airspace security and surveillance systems.",
    github: "https://github.com/SwayamSat/Micro-dropper-based-taget-Classifier-Bird-vs-Drone",
  },
];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">Projects</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-12">Featured Work</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="glass-card rounded-2xl p-6 group hover:glow-blue transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{p.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{t}</span>
                  ))}
                </div>
                <div className="space-y-1 mb-4">
                  {p.metrics.map((m) => (
                    <p key={m} className="text-xs text-primary">✦ {m}</p>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <Button size="sm" variant="outline" className="text-xs flex-1" onClick={() => setSelected(p)}>
                    View Details
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs" asChild>
                    <a href={p.github} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4" /></a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="glass-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">{selected?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">{selected?.details}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 mt-2">
            {selected?.tech.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{t}</span>
            ))}
          </div>
          <div className="mt-3 space-y-1">
            {selected?.metrics.map((m) => (
              <p key={m} className="text-sm text-primary">✦ {m}</p>
            ))}
          </div>
          <Button size="sm" className="mt-4 w-full" asChild>
            <a href={selected?.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 w-4 h-4" /> View on GitHub <ExternalLink className="ml-2 w-3 h-3" />
            </a>
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
