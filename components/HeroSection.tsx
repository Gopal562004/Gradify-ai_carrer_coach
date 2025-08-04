"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Briefcase,
  FileText,
  MessageSquare,
  Pencil,
  Star,
  User,
} from "lucide-react";

const HeroSection = () => {
  const features = [
    {
      title: "Career Path Guidance",
      desc: "Discover career paths based on your interests and skills.",
      icon: Briefcase,
    },
    {
      title: "AI Resume Builder",
      desc: "Build an ATS-optimized resume quickly with AI.",
      icon: FileText,
    },
    {
      title: "Interview Preparation",
      desc: "Practice mock interviews with instant AI feedback.",
      icon: MessageSquare,
    },
    {
      title: "AI Cover Letter",
      desc: "Generate tailored cover letters for each job.",
      icon: Pencil,
    },
    {
      title: "Skill Assessment",
      desc: "Assess your strengths and areas for improvement.",
      icon: Star,
    },
    {
      title: "Career Counseling",
      desc: "Connect with industry mentors for expert guidance.",
      icon: User,
    },
  ];

  return (
    <div className="min-h-screen bg-black  text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Empower Your Career Journey 🚀
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Personalized career guidance, AI resume builder, interview practice,
          and more!
        </p>
        <Link href="/dashboard">
          <Button variant="white" className="px-6 py-3 text-sm cursor-pointer">
            Get Started
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-black p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <Icon className="w-10 h-10 text-white mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-center">{feature.desc}</p>
            </div>
          );
        })}
      </section>

      {/* Accordion FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          FAQs - How We Help You
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does career guidance work?</AccordionTrigger>
            <AccordionContent className="bg-gray-800 text-gray-300">
              Once you sign up, our AI will assess your background and interests
              to suggest suitable paths.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is the resume builder free?</AccordionTrigger>
            <AccordionContent className="bg-gray-800 text-gray-300">
              Yes! Basic AI resume building is free for students.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I practice interviews?</AccordionTrigger>
            <AccordionContent className="bg-gray-800 text-gray-300">
              Absolutely! Get mock interviews with instant feedback.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Career Journey Today!
        </h2>
        <Link href="/dashboard">
          <Button className="px-6 py-3 text-lg bg-white text-black hover:bg-gray-200 transition duration-200 cursor-pointer">
            Join Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default HeroSection;
