import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, BookOpen, Zap } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl floating" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/30 rounded-full blur-3xl floating" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo/Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center mb-8"
          >
            <div className="relative">
              <div className="w-24 h-24 ai-gradient rounded-2xl flex items-center justify-center shadow-2xl pulse-glow">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-pulse" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
          >
            StudyMate AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Your intelligent study companion that reads, understands, and answers questions from your PDFs. 
            <span className="text-primary font-semibold"> Powered by advanced AI</span> for instant, contextual learning.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: BookOpen, text: "PDF Analysis" },
              { icon: Brain, text: "Smart Q&A" },
              { icon: Zap, text: "Instant Answers" },
              { icon: Sparkles, text: "AI-Powered" }
            ].map((feature, index) => (
              <div
                key={feature.text}
                className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 text-sm font-medium"
              >
                <feature.icon className="w-4 h-4 text-primary" />
                {feature.text}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={onGetStarted}
              variant="ai"
              size="lg"
              className="text-lg px-8 py-4 h-auto"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Learning Now
            </Button>
            
            <Button
              variant="glow"
              size="lg"
              className="text-lg px-8 py-4 h-auto"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              See Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "10K+", label: "Students Helped" },
              { number: "500K+", label: "Questions Answered" },
              { number: "99%", label: "Accuracy Rate" }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};