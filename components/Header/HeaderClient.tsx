"use client";

import React from "react";
import {
  FileText,
  Mail,
  Briefcase,
  ClipboardList,
  LayoutTemplate,
} from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileIcon, LayoutDashboard } from "lucide-react";
import { StarIcon } from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const HeaderClient = () => {
  return (
    <div className="flex items-center space-x-4">
      <SignedIn>
        <Link href="/dashboard">
          <Button variant="outline" className="flex items-center gap-2 text-sm">
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden md:block">Industry Insights</span>
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="white" className="flex items-center gap-2 text-sm">
              <StarIcon className="w-4 h-4 text-yellow-500" />
              <span className="hidden md:block">Career Tools</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-black border-none shadow-lg">
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href="/resume"
                className="flex items-center gap-2 text-white hover:text-blue-400"
              >
                <LayoutTemplate className="w-4 h-4 text-blue-500" />
                Build Resume
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/ai-cover-letter"
                className="flex items-center gap-2 text-white hover:text-green-400"
              >
                <Mail className="w-4 h-4 text-green-500" />
                Cover Letter
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/interview"
                className="flex items-center gap-2 text-white hover:text-purple-400"
              >
                <ClipboardList className="w-4 h-4 text-purple-500" />
                Interview Prep
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox: "w-10 h-10",
              userButtonAvatar: "rounded-full",
              userButtonAction: "hidden",
            },
          }}
        />
      </SignedIn>

      <SignedOut>
        <Link href="/sign-in">
          <Button
            variant="outline"
            className="flex items-center gap-2 cursor-pointer"
          >
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button
            variant="outline"
            className="flex items-center gap-2 cursor-pointer"
          >
            Sign Up
          </Button>
        </Link>
      </SignedOut>
    </div>
  );
};

export default HeaderClient;
