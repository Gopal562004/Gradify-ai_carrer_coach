"use client";

export default function InterviewLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 py-6">
      <div className="w-full mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-white bg-clip-text">
            🎯 Interview Practice
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Practice smart. Improve with every assessment.
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
