export const dynamic = "force-dynamic"; // Force dynamic rendering
import Image from "next/image";
import Link from "next/link";
import HeaderClient from "./HeaderClient";
import { checkUser } from "../../lib/checkUser"; // Import your checkUser function

const Header = async () => {
  const user = await checkUser(); // ✅ Get current user (server-side)

  // You can now log or use user info, for example:
  // console.log(
  //   "Current User from Clerk:",
  //   user.id,
  //   user.emailAddresses[0]?.emailAddress || "No email",
  // );

  return (
    <header className="w-full shadow-sm sticky top-0 z-5 bg-black">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="My App Logo" width={40} height={40} />
          <span className="text-lg font-semibold">Ai-Carrer</span>
        </Link>

        {/* Right: Auth Buttons */}
        <HeaderClient />
      </nav>
    </header>
  );
};

export default Header;
