import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-4">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        Oops! The page you are looking for does not exist.
      </p>
        <Link
          href="/"
          className="px-4 py-2 bg-white  text-black transition duration-200 border-2 rounded-md text-sm"
        >
          Go Back Home
        </Link>
    </div>
  );
};

export default NotFound;
