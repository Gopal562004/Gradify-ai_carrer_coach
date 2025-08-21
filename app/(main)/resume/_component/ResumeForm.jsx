// "use client";

// import React, { useState } from "react";
// import { generateResumeFromInput } from "../../../../actions/resume";
// import toast from "react-hot-toast";

// const ResumeForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     linkedin: "",
//     github: "",
//     summary: "",
//     education: [{ degree: "", school: "", year: "" }],
//     experience: [{ title: "", company: "", year: "", description: "" }],
//     projects: [{ name: "", link: "", description: "" }],
//     skills: "",
//     certifications: "",
//   });

//   const handleChange = (e, index, key, section) => {
//     if (section) {
//       const updated = [...formData[section]];
//       updated[index][key] = e.target.value;
//       setFormData({ ...formData, [section]: updated });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const addSectionItem = (section) => {
//     const newItem = Object.keys(formData[section][0]).reduce((acc, key) => {
//       acc[key] = "";
//       return acc;
//     }, {});
//     setFormData({ ...formData, [section]: [...formData[section], newItem] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const role = formData.experience[0]?.title || "Software Developer";
//     const experienceText = formData.experience
//       .map(
//         (exp) =>
//           `${exp.title} at ${exp.company} (${exp.year}): ${exp.description}`
//       )
//       .join(" | ");
//     const educationText = formData.education
//       .map((edu) => `${edu.degree} from ${edu.school} (${edu.year})`)
//       .join(" | ");
//     const skillsArray = formData.skills
//       .split(",")
//       .map((s) => s.trim())
//       .filter(Boolean);

//     toast.promise(
//       generateResumeFromInput({
//         role,
//         skills: skillsArray,
//         experience: experienceText,
//         education: educationText,
//       }),
//       {
//         loading: "Generating resume...",
//         success: "Resume generated and saved!",
//         error: "Failed to generate resume",
//       }
//     );
//   };

//   return (
//     <div className="min-h-screen bg-black text-white px-4 py-10">
//       <div className="max-w-4xl mx-auto bg-[#111111] bg-opacity-90 backdrop-blur-md border border-gray-800 rounded-2xl shadow-xl p-8 space-y-10">
//         <h1 className="text-4xl font-bold text-center text-white">
//           🧾 Build Your Resume
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-10">
//           <Section title="👤 Personal Info">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//               />
//               <Input
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//               />
//               <Input
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Phone Number"
//               />
//               <Input
//                 name="linkedin"
//                 value={formData.linkedin}
//                 onChange={handleChange}
//                 placeholder="LinkedIn URL"
//               />
//               <Input
//                 name="github"
//                 value={formData.github}
//                 onChange={handleChange}
//                 placeholder="GitHub URL"
//               />
//             </div>
//           </Section>

//           <Section title="📝 Summary">
//             <TextArea
//               name="summary"
//               value={formData.summary}
//               onChange={handleChange}
//               placeholder="Brief summary about yourself..."
//             />
//           </Section>

//           <Section title="🎓 Education">
//             {formData.education.map((edu, idx) => (
//               <div
//                 key={idx}
//                 className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
//               >
//                 <Input
//                   placeholder="Degree"
//                   value={edu.degree}
//                   onChange={(e) => handleChange(e, idx, "degree", "education")}
//                 />
//                 <Input
//                   placeholder="School / University"
//                   value={edu.school}
//                   onChange={(e) => handleChange(e, idx, "school", "education")}
//                 />
//                 <Input
//                   placeholder="Year"
//                   value={edu.year}
//                   onChange={(e) => handleChange(e, idx, "year", "education")}
//                 />
//               </div>
//             ))}
//             <AddButton
//               onClick={() => addSectionItem("education")}
//               label="Add Education"
//             />
//           </Section>

//           <Section title="💼 Experience">
//             {formData.experience.map((exp, idx) => (
//               <div key={idx} className="space-y-2 mb-4">
//                 <Input
//                   placeholder="Job Title"
//                   value={exp.title}
//                   onChange={(e) => handleChange(e, idx, "title", "experience")}
//                 />
//                 <Input
//                   placeholder="Company"
//                   value={exp.company}
//                   onChange={(e) =>
//                     handleChange(e, idx, "company", "experience")
//                   }
//                 />
//                 <Input
//                   placeholder="Year(s)"
//                   value={exp.year}
//                   onChange={(e) => handleChange(e, idx, "year", "experience")}
//                 />
//                 <TextArea
//                   placeholder="Description"
//                   value={exp.description}
//                   onChange={(e) =>
//                     handleChange(e, idx, "description", "experience")
//                   }
//                 />
//               </div>
//             ))}
//             <AddButton
//               onClick={() => addSectionItem("experience")}
//               label="Add Experience"
//             />
//           </Section>

//           <Section title="📁 Projects">
//             {formData.projects.map((proj, idx) => (
//               <div key={idx} className="space-y-2 mb-4">
//                 <Input
//                   placeholder="Project Name"
//                   value={proj.name}
//                   onChange={(e) => handleChange(e, idx, "name", "projects")}
//                 />
//                 <Input
//                   placeholder="Project Link"
//                   value={proj.link}
//                   onChange={(e) => handleChange(e, idx, "link", "projects")}
//                 />
//                 <TextArea
//                   placeholder="Description"
//                   value={proj.description}
//                   onChange={(e) =>
//                     handleChange(e, idx, "description", "projects")
//                   }
//                 />
//               </div>
//             ))}
//             <AddButton
//               onClick={() => addSectionItem("projects")}
//               label="Add Project"
//             />
//           </Section>

//           <Section title="🧠 Skills">
//             <TextArea
//               name="skills"
//               value={formData.skills}
//               onChange={handleChange}
//               placeholder="Comma-separated list (e.g., React, Python, SQL)"
//             />
//           </Section>

//           <Section title="🏅 Certifications">
//             <TextArea
//               name="certifications"
//               value={formData.certifications}
//               onChange={handleChange}
//               placeholder="List certifications separated by commas..."
//             />
//           </Section>

//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
//             >
//               🚀 Generate Resume
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Reusable Components
// const Input = ({ ...props }) => (
//   <input
//     {...props}
//     className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//   />
// );

// const TextArea = ({ ...props }) => (
//   <textarea
//     {...props}
//     rows={3}
//     className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//   />
// );

// const Section = ({ title, children }) => (
//   <div className="border-b border-gray-800 pb-6">
//     <h2 className="text-xl font-semibold text-blue-400 mb-4">{title}</h2>
//     {children}
//   </div>
// );

// const AddButton = ({ onClick, label }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className="mt-2 text-sm text-blue-400 hover:underline"
//   >
//     + {label}
//   </button>
// );

// export default ResumeForm;
"use client";

import React, { useState } from "react";
import { generateResumeFromInput } from "../../../../actions/resume";
import toast from "react-hot-toast";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    summary: "",
    education: [{ degree: "", school: "", year: "" }],
    experience: [{ title: "", company: "", year: "", description: "" }],
    projects: [{ name: "", link: "", description: "" }],
    skills: "",
    certifications: "",
  });

  const [loading, setLoading] = useState(false);  
  const handleChange = (e, index, key, section) => {
    if (section) {
      const updated = [...formData[section]];
      updated[index][key] = e.target.value;
      setFormData({ ...formData, [section]: updated });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addSectionItem = (section) => {
    const newItem = Object.keys(formData[section][0]).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});
    setFormData({ ...formData, [section]: [...formData[section], newItem] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const role = formData.experience[0]?.title || "Software Developer";
    const experienceText = formData.experience
      .map(
        (exp) =>
          `${exp.title} at ${exp.company} (${exp.year}): ${exp.description}`
      )
      .join(" | ");
    const educationText = formData.education
      .map((edu) => `${edu.degree} from ${edu.school} (${edu.year})`)
      .join(" | ");
    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
      try{
    await toast.promise(generateResumeFromInput({
        role,
        skills: skillsArray,
        experience: experienceText,
        education: educationText,
      }),
      {
        loading: "Generating resume...",
        success: "Resume generated and saved!",
        error: "Failed to generate resume",
      }
    );
  }
  finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen bg-black text-white px-2 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-6xl mx-auto bg-black bg-opacity-90 backdrop-blur-md border border-gray-800 rounded-lg shadow-xl p-6 sm:p-10 space-y-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white">
          🧾 Build Your Resume
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          <Section title="👤 Personal Info">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <Input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
              />
              <Input
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="GitHub URL"
              />
            </div>
          </Section>

          <Section title="📝 Summary">
            <TextArea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Brief summary about yourself..."
            />
          </Section>

          <Section title="🎓 Education">
            {formData.education.map((edu, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
              >
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleChange(e, idx, "degree", "education")}
                />
                <Input
                  placeholder="School / University"
                  value={edu.school}
                  onChange={(e) => handleChange(e, idx, "school", "education")}
                />
                <Input
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => handleChange(e, idx, "year", "education")}
                />
              </div>
            ))}
            <AddButton
              onClick={() => addSectionItem("education")}
              label="Add Education"
            />
          </Section>

          <Section title="💼 Experience">
            {formData.experience.map((exp, idx) => (
              <div key={idx} className="space-y-2 mb-4">
                <Input
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => handleChange(e, idx, "title", "experience")}
                />
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    handleChange(e, idx, "company", "experience")
                  }
                />
                <Input
                  placeholder="Year(s)"
                  value={exp.year}
                  onChange={(e) => handleChange(e, idx, "year", "experience")}
                />
                <TextArea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) =>
                    handleChange(e, idx, "description", "experience")
                  }
                />
              </div>
            ))}
            <AddButton
              onClick={() => addSectionItem("experience")}
              label="Add Experience"
            />
          </Section>

          <Section title="📁 Projects">
            {formData.projects.map((proj, idx) => (
              <div key={idx} className="space-y-2 mb-4">
                <Input
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) => handleChange(e, idx, "name", "projects")}
                />
                <Input
                  placeholder="Project Link"
                  value={proj.link}
                  onChange={(e) => handleChange(e, idx, "link", "projects")}
                />
                <TextArea
                  placeholder="Description"
                  value={proj.description}
                  onChange={(e) =>
                    handleChange(e, idx, "description", "projects")
                  }
                />
              </div>
            ))}
            <AddButton
              onClick={() => addSectionItem("projects")}
              label="Add Project"
            />
          </Section>

          <Section title="🧠 Skills">
            <TextArea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Comma-separated list (e.g., React, Python, SQL)"
            />
          </Section>

          <Section title="🏅 Certifications">
            <TextArea
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              placeholder="List certifications separated by commas..."
            />
          </Section>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading} // ✅ disable while loading
              className={`px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
                loading
                  ? "bg-gray-600 text-white cursor-not-allowed"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                    />
                  </svg>
                  <span>Generating...</span>
                </span>
              ) : (
                "🚀 Generate Resume"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Components
const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  />
);

const TextArea = ({ ...props }) => (
  <textarea
    {...props}
    rows={3}
    className="w-full px-4 py-2 bg-black text-white border border-gray-700 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  />
);

const Section = ({ title, children }) => (
  <div className="border-b border-gray-800 pb-6">
    <h2 className="text-xl font-semibold text-blue-400 mb-4">{title}</h2>
    {children}
  </div>
);

const AddButton = ({ onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="mt-2 text-sm text-blue-400 hover:underline"
  >
    + {label}
  </button>
);

export default ResumeForm;
