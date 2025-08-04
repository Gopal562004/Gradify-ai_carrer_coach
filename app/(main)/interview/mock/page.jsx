"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";

export default function MockInterviewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <Link href="/interview">
          <Button variant="link" className="gap-2 pl-0 text-sm sm:text-base">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-title">
            Mock Interview
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Test your knowledge with industry-specific questions
          </p>
        </div>
      </div>

      {/* Quiz Component */}
      <Quiz />
    </div>
  );
}
