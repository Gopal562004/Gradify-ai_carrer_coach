// "use client";
// // app/onboarding/page.tsx

// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Industry } from "@/data/industries";
// import useFetch from "../../../../hooks/use-fetch";
// import toast from "react-hot-toast";
// interface OnBoardingFormProps {
//   industries: Industry[];
// }
// import { updateUser } from "../../../../actions/user";
// // const {
// //   loading: updateLoading,
// //   fn: updateUserFn,
// //   data: updateResult,
// //   error: updateError,
// // } = useFetch(updateUser);
 
// const schema = z.object({
//   industryId: z.string().min(1, "Industry is required."),
//   subIndustry: z.string().min(1, "Specialization is required."),
//   experience: z.coerce
//     .number({
//       required_error: "Years of experience is required.",
//       invalid_type_error: "Enter a valid number.",
//     })
//     .nonnegative("Experience must be 0 or more."),
//   skills: z
//     .string()
//     .min(1, "Enter at least one skill.")
//     .refine((val) => val.split(",").length > 0, {
//       message: "Separate multiple skills with commas.",
//     }),
//   bio: z.string().min(1, "Professional bio is required."),
// });

// type FormData = z.infer<typeof schema>;

// const OnBoardingForm: React.FC<OnBoardingFormProps> = ({ industries }) => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const selectedIndustryId = watch("industryId");
//   const selectedIndustryObject = industries.find(
//     (ind) => ind.id === selectedIndustryId
//   );

//   const onSubmit = async (data: FormData) => {
//     const formData = {
//       industry: data.subIndustry, // subIndustry is selected value
//       experience: data.experience,
//       bio: data.bio,
//       skills: data.skills.split(",").map((s) => s.trim()),
//     };

//     try {
//       const res = await updateUser(formData);
//       console.log("User updated successfully:", res);
//       toast.success("Profile updated!");
//       reset();
//     } catch (err) {
//       console.error("Failed to update user:", err);
//       toast.error("Something went wrong.");
//     }
//   };
  

//   const inputClass = (hasError: boolean) =>
//     `w-full px-4 py-2 bg-black border ${
//       hasError ? "border-red-500" : "border-zinc-700"
//     } rounded-lg focus:outline-none focus:ring-2 ${
//       hasError ? "focus:ring-red-500" : "focus:ring-blue-500"
//     }`;

//   return (
//     <div className="min-h-screen bg-black text-white flex justify-center items-center px-4 py-10">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-2xl bg-black rounded-2xl shadow-xl p-8 space-y-6 border border-zinc-800"
//       >
//         <div>
//           <h2 className="text-3xl font-semibold mb-2">Complete Your Profile</h2>
//           <p className="text-gray-400 text-sm">
//             Select your industry to get personalized career insights and
//             recommendations.
//           </p>
//         </div>

//         {/* Industry */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Industry</label>
//           <select
//             {...register("industryId")}
//             className={inputClass(!!errors.industryId)}
//           >
//             <option value="">-- Select Industry --</option>
//             {industries.map((industry) => (
//               <option key={industry.id} value={industry.id}>
//                 {industry.name}
//               </option>
//             ))}
//           </select>
//           {errors.industryId && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.industryId.message}
//             </p>
//           )}
//         </div>

//         {/* Sub-Industry */}
//         {selectedIndustryObject &&
//           selectedIndustryObject.subIndustries.length > 0 && (
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Specialization
//               </label>
//               <select
//                 {...register("subIndustry")}
//                 className={inputClass(!!errors.subIndustry)}
//               >
//                 <option value="">-- Select Sub-Industry --</option>
//                 {selectedIndustryObject.subIndustries.map((sub) => (
//                   <option key={sub} value={sub}>
//                     {sub}
//                   </option>
//                 ))}
//               </select>
//               {errors.subIndustry && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.subIndustry.message}
//                 </p>
//               )}
//             </div>
//           )}

//         {/* Years of Experience */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Years of Experience
//           </label>
//           <input
//             type="number"
//             min={0}
//             {...register("experience")}
//             className={inputClass(!!errors.experience)}
//             placeholder="Enter your years of experience"
//           />
//           {errors.experience && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.experience.message}
//             </p>
//           )}
//         </div>

//         {/* Skills */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Skills</label>
//           <input
//             type="text"
//             {...register("skills")}
//             placeholder="e.g., JavaScript, React, Node.js"
//             className={inputClass(!!errors.skills)}
//           />
//           {errors.skills && (
//             <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
//           )}
//         </div>

//         {/* Bio */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Professional Bio
//           </label>
//           <textarea
//             rows={4}
//             {...register("bio")}
//             placeholder="Tell us about yourself..."
//             className={inputClass(!!errors.bio)}
//           />
//           {errors.bio && (
//             <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
//           )}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-white transition text-black py-3 rounded-lg font-semibold"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OnBoardingForm;
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Industry } from "@/data/industries";
import useFetch from "@/hooks/use-fetch";
import toast from "react-hot-toast";
import { updateUser } from "@/actions/user";
import { redirect } from "next/navigation";

interface OnBoardingFormProps {
  industries: Industry[];
}

const schema = z.object({
  industryId: z.string().min(1, "Industry is required."),
  subIndustry: z.string().min(1, "Specialization is required."),
  experience: z.coerce
    .number({
      required_error: "Years of experience is required.",
      invalid_type_error: "Enter a valid number.",
    })
    .nonnegative("Experience must be 0 or more."),
  skills: z
    .string()
    .min(1, "Enter at least one skill.")
    .refine((val) => val.split(",").length > 0, {
      message: "Separate multiple skills with commas.",
    }),
  bio: z.string().min(1, "Professional bio is required."),
});

type FormData = z.infer<typeof schema>;

const OnBoardingForm: React.FC<OnBoardingFormProps> = ({ industries }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedIndustryId = watch("industryId");
  const selectedIndustryObject = industries.find(
    (ind) => ind.id === selectedIndustryId
  );

  const { fn: updateUserFn, loading: updateLoading } = useFetch(updateUser);

  const onSubmit = async (data: FormData) => {
    const formData = {
      industry: data.subIndustry,
      experience: data.experience,
      bio: data.bio,
      skills: data.skills.split(",").map((s) => s.trim()),
    };

    try {
      const res = await updateUserFn(formData);
      if (res) {
        toast.success("Profile updated!");
        reset();
        redirect("/dashboard");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      console.error("Failed to update user:", err);
      toast.error("Something went wrong.");
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-2 bg-black border ${
      hasError ? "border-red-500" : "border-zinc-700"
    } rounded-lg focus:outline-none focus:ring-2 ${
      hasError ? "focus:ring-red-500" : "focus:ring-blue-500"
    }`;

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-black rounded-2xl shadow-xl p-8 space-y-6 border border-zinc-800"
      >
        <div>
          <h2 className="text-3xl font-semibold mb-2">Complete Your Profile</h2>
          <p className="text-gray-400 text-sm">
            Select your industry to get personalized career insights and
            recommendations.
          </p>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium mb-1">Industry</label>
          <select
            {...register("industryId")}
            className={inputClass(!!errors.industryId)}
          >
            <option value="">-- Select Industry --</option>
            {industries.map((industry) => (
              <option key={industry.id} value={industry.id}>
                {industry.name}
              </option>
            ))}
          </select>
          {errors.industryId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.industryId.message}
            </p>
          )}
        </div>

        {/* Sub-Industry */}
        {selectedIndustryObject &&
          selectedIndustryObject.subIndustries.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Specialization
              </label>
              <select
                {...register("subIndustry")}
                className={inputClass(!!errors.subIndustry)}
              >
                <option value="">-- Select Sub-Industry --</option>
                {selectedIndustryObject.subIndustries.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              {errors.subIndustry && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subIndustry.message}
                </p>
              )}
            </div>
          )}

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Years of Experience
          </label>
          <input
            type="number"
            min={0}
            {...register("experience")}
            className={inputClass(!!errors.experience)}
            placeholder="Enter your years of experience"
          />
          {errors.experience && (
            <p className="text-red-500 text-sm mt-1">
              {errors.experience.message}
            </p>
          )}
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium mb-1">Skills</label>
          <input
            type="text"
            {...register("skills")}
            placeholder="e.g., JavaScript, React, Node.js"
            className={inputClass(!!errors.skills)}
          />
          {errors.skills && (
            <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Professional Bio
          </label>
          <textarea
            rows={4}
            {...register("bio")}
            placeholder="Tell us about yourself..."
            className={inputClass(!!errors.bio)}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full transition py-3 rounded-lg font-semibold ${
            updateLoading
              ? "bg-gray-400 text-black cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200"
          }`}
          disabled={updateLoading}
        >
          {updateLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default OnBoardingForm;
