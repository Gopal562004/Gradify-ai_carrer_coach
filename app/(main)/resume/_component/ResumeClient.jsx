"use client";

import React, { useState } from "react";
import ResumeForm from "./ResumeForm";
import ResumeBuilding from "./ResumeBuilding";
import CheckAtsScore from "./CheckAtsScore";
import { Button } from "@/components/ui/button";

const ResumeClient = () => {
  const [activeTab, setActiveTab] = useState("form");

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 py-8">
      {/* Mini Navbar */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <Button
          variant={activeTab === "form" ? "default" : "outline"}
          onClick={() => setActiveTab("form")}
          className="bg-gray-800 text-white border-white hover:bg-white hover:text-black"
        >
          📝 Resume Form
        </Button>
        <Button
          variant={activeTab === "preview" ? "default" : "outline"}
          onClick={() => setActiveTab("preview")}
          className="bg-gray-800 text-white border-white hover:bg-white hover:text-black"
        >
          📄 Preview
        </Button>
        <Button
          variant={activeTab === "ats" ? "default" : "outline"}
          onClick={() => setActiveTab("ats")}
          className="bg-gray-800 text-white border-white hover:bg-white hover:text-black"
        >
          📊 ATS Score
        </Button>
      </div>

      {/* Conditional Rendering */}
      <div className="w-full sm:max-w-4xl mx-auto space-y-10">
        {activeTab === "form" && <ResumeForm />}
        {activeTab === "preview" && <ResumeBuilding />}
        {activeTab === "ats" && <CheckAtsScore />}
      </div>
    </div>
  );
};

export default ResumeClient;
