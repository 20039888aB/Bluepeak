import React from "react";
import { motion } from "framer-motion";
import Hero from "../sections/Hero";
import ServicesPreview from "../sections/ServicesPreview";
import SkillsSection from "../sections/SkillsSection";
import TeamSection from "../sections/TeamSection";
import ProjectsPreview from "../sections/ProjectsPreview";
import TestimonialsSection from "../sections/TestimonialsSection";
import StatsSection from "../sections/StatsSection";

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <div className="space-y-20">
        {/* Stats Section */}
        <StatsSection />
        
        {/* Services Preview */}
        <ServicesPreview />
        
        {/* Skills Section */}
        <SkillsSection />
        
        {/* Team Section */}
        <TeamSection />
        
        {/* Projects Preview */}
        <ProjectsPreview />
        
        {/* Testimonials */}
        <TestimonialsSection />
      </div>
    </div>
  );
}
