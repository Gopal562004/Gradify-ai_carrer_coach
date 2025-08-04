import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashboardView from "./_component/DashboardView";

export default async function DashboardPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const rawInsights = await getIndustryInsights();

  const parsedSalary = rawInsights.salaryRanges.map((item) => ({
    role: item.role,
    min: item.min / 1000,
    max: item.max / 1000,
    median: item.median / 1000,
  }));

  const insights = {
    ...rawInsights,
    salaryRanges: parsedSalary,
  };

  return <DashboardView insights={insights} />;
}
