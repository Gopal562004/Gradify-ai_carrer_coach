// export const dynamic = "force-dynamic";
export const dynamic = "force-dynamic";

import React from "react";
import OnBoardingForm from "./_components/OnboardingForm";
import { industries, Industry } from "@/data/industries";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  const industriesData: Industry[] = industries;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Onboarding</h1>
      <OnBoardingForm industries={industriesData} />
    </div>
  );
};

export default OnboardingPage;
