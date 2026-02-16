import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Github, Linkedin, Download, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const socials = [
  { icon: Phone, label: "+91-7809673864", href: "tel:+917809673864" },
  { icon: Mail, label: "swayam.satpathy24@gmail.com", href: "mailto:swayam.satpathy24@gmail.com" },
  { icon: Github, label: "github.com/SwayamSat", href: "https://github.com/SwayamSat" },
  { icon: Linkedin, label: "linkedin.com/in/swayamsatpathy", href: "https://linkedin.com/in/swayamsatpathy" },
];

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({ title: "Validation Error", description: result.error.errors[0].message, variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      // TODO: Replace with edge function call once Cloud is enabled
      await new Promise((r) => setTimeout(r, 1000));
      toast({ title: "Message Sent!", description: "Thanks for reaching out. I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3">Contact</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Let's Build Intelligent Systems Together</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Have a project in mind or want to collaborate? Drop me a message.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="contact-name"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-secondary border-border focus:border-primary/50"
              />
              <Input
                id="contact-email"
                placeholder="Your Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-secondary border-border focus:border-primary/50"
              />
              <Textarea
                id="contact-message"
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-secondary border-border focus:border-primary/50"
              />
              <Button type="submit" disabled={sending} className="w-full font-heading font-semibold">
                <Send className="mr-2 h-4 w-4" /> {sending ? "Sending..." : "Send Message"}
              </Button>
            </form>

            <div className="space-y-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <s.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm">{s.label}</span>
                </a>
              ))}
              <Button variant="outline" className="w-full mt-4 font-heading border-border hover:border-primary/50" asChild>
                <a href="https://drive.google.com/uc?export=download&id=16WIMbY1B09ChN1FMLS3KB9cg2oQZev8P" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
