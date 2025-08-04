// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { getUserResume } from "@/actions/resume";
// import { toast } from "react-hot-toast";
// import { jsPDF } from "jspdf";

// const ResumeBuilding = () => {
//   const [resume, setResume] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchResume = async () => {
//       try {
//         const data = await getUserResume();
//         setResume(data);
//       } catch (error) {
//         toast.error("Failed to load resume");
//         console.error("Resume error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResume();
//   }, []);

//   const downloadPDF = () => {
//     if (!resume) return;

//     const doc = new jsPDF();
//     let y = 10;

//     const addSection = (title, items) => {
//       doc.setFont("helvetica", "bold");
//       doc.text(title, 10, y);
//       y += 6;
//       doc.setFont("helvetica", "normal");

//       items.forEach((item) => {
//         const lines = doc.splitTextToSize(item, 180);
//         lines.forEach((line) => {
//           if (y >= 280) {
//             doc.addPage();
//             y = 10;
//           }
//           doc.text(`- ${line}`, 12, y);
//           y += 6;
//         });
//       });

//       y += 4;
//     };

//     doc.setFontSize(14);
//     doc.text("📄 Resume", 10, y);
//     y += 10;

//     if (resume.summary) {
//       addSection("📝 Summary", [resume.summary]);
//     }
//     if (resume.skills) {
//       addSection("🧠 Skills", resume.skills);
//     }
//     if (resume.experience) {
//       addSection("💼 Experience", resume.experience);
//     }
//     if (resume.education) {
//       addSection("🎓 Education", resume.education);
//     }
//     if (resume.projects) {
//       addSection("📁 Projects", resume.projects);
//     }

//     doc.save("resume.pdf");
//   };

//   return (
//     <Card className="bg-black text-white border-none shadow-2xl">
//       <CardContent className="p-6 space-y-6">
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-bold">📄 Preview & Build</h2>
//           {resume && (
//             <button
//               onClick={downloadPDF}
//               className="text-sm bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-white cursor-pointer"
//             >
//               ⬇️ Download PDF
//             </button>
//           )}
//         </div>

//         {loading ? (
//           <p className="text-gray-300">Loading resume preview...</p>
//         ) : resume ? (
//           <div className="space-y-4 text-gray-200">
//             <Section title="📝 Summary">{resume.summary}</Section>

//             <Section title="🧠 Skills">
//               <ul className="list-disc list-inside">
//                 {resume.skills?.map((s, i) => (
//                   <li key={i}>{s}</li>
//                 ))}
//               </ul>
//             </Section>

//             <Section title="💼 Experience">
//               <ul className="list-disc list-inside">
//                 {resume.experience?.map((e, i) => (
//                   <li key={i}>{e}</li>
//                 ))}
//               </ul>
//             </Section>

//             <Section title="🎓 Education">
//               <ul className="list-disc list-inside">
//                 {resume.education?.map((e, i) => (
//                   <li key={i}>{e}</li>
//                 ))}
//               </ul>
//             </Section>

//             <Section title="📁 Projects">
//               <ul className="list-disc list-inside">
//                 {resume.projects?.map((p, i) => (
//                   <li key={i}>{p}</li>
//                 ))}
//               </ul>
//             </Section>
//           </div>
//         ) : (
//           <p className="text-gray-400">
//             No resume generated yet. Fill out the form and click Generate!
//           </p>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// const Section = ({ title, children }) => (
//   <div>
//     <h3 className="text-lg font-semibold text-blue-400 mb-1">{title}</h3>
//     {children}
//   </div>
// );

// export default ResumeBuilding;
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getUserResume } from "@/actions/resume";
import { toast } from "react-hot-toast";
import { jsPDF } from "jspdf";

const ResumeBuilding = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await getUserResume();
        setResume(data);
      } catch (error) {
        toast.error("Failed to load resume");
        console.error("Resume error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  const downloadPDF = () => {
    if (!resume) return;

    const doc = new jsPDF();
    let y = 10;

    const addSection = (title, items) => {
      doc.setFont("helvetica", "bold");
      doc.text(title, 10, y);
      y += 6;
      doc.setFont("helvetica", "normal");

      items.forEach((item) => {
        const lines = doc.splitTextToSize(item, 180);
        lines.forEach((line) => {
          if (y >= 280) {
            doc.addPage();
            y = 10;
          }
          doc.text(`- ${line}`, 12, y);
          y += 6;
        });
      });

      y += 4;
    };

    doc.setFontSize(14);
    doc.text("📄 Resume", 10, y);
    y += 10;

    if (resume.summary) addSection("📝 Summary", [resume.summary]);
    if (resume.skills) addSection("🧠 Skills", resume.skills);
    if (resume.experience) addSection("💼 Experience", resume.experience);
    if (resume.education) addSection("🎓 Education", resume.education);
    if (resume.projects) addSection("📁 Projects", resume.projects);

    doc.save("resume.pdf");
  };

  return (
    <div className="w-full px-2 sm:px-4 lg:px-8 py-8">
      <Card className="bg-black text-white border border-gray-800 shadow-2xl w-full max-w-6xl mx-auto">
        <CardContent className="p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">
              📄 Preview & Build
            </h2>
            {resume && (
              <button
                onClick={downloadPDF}
                className="bg-blue-600 hover:bg-blue-700 transition text-white text-sm px-4 py-2 rounded-lg"
              >
                ⬇️ Download PDF
              </button>
            )}
          </div>

          {loading ? (
            <p className="text-gray-400">Loading resume preview...</p>
          ) : resume ? (
            <div className="space-y-6 text-gray-200 text-sm sm:text-base">
              <Section title="📝 Summary">{resume.summary}</Section>

              <Section title="🧠 Skills">
                <ul className="list-disc list-inside">
                  {resume.skills?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </Section>

              <Section title="💼 Experience">
                <ul className="list-disc list-inside">
                  {resume.experience?.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </Section>

              <Section title="🎓 Education">
                <ul className="list-disc list-inside">
                  {resume.education?.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </Section>

              <Section title="📁 Projects">
                <ul className="list-disc list-inside">
                  {resume.projects?.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </Section>
            </div>
          ) : (
            <p className="text-gray-400">
              No resume found. Fill out the form and generate one.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-blue-400 mb-2">{title}</h3>
    {children}
  </div>
);

export default ResumeBuilding;
