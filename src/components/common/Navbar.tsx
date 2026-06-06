"use client";
import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { LogOut, User, Menu, X, CheckCircle, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
              <CheckCircle className="w-6 h-6" />
              <span>TodoApp</span>
            </Link>
          </div>

          {/* Right Side: Auth States */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              // Loading State skeleton
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session?.user ? (
              // User is Logged In
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition focus:outline-none"
                >
                  {session?.user?.image ? (
                    <img
                      src={session?.user.image}
                      alt={session?.user.name}
                      className="w-8 h-8 rounded-full object-cover border border-indigo-100"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-sm">
                      {session?.user.name[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                    {session?.user.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-1 border border-gray-100 dark:border-gray-700 z-20 animate-in fade-in slide-in-from-top-2 duration-150">
                      
                      {/* User Info Header */}
                      <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{session?.user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session?.user.email}</p>
                        
                        {/* Email Verification Badge */}
                        {!session?.user.emailVerified && (
                          <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            <ShieldAlert className="w-3 h-3" /> Unverified
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleSignOut();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-left"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // User is Logged Out
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Open State */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-1 shadow-inner dark:bg-gray-900 dark:border-gray-800">                    
          {session?.user ? (
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                Logged in as <span className="font-semibold text-gray-700 dark:text-gray-200">{session?.user.name}</span>
              </div>
              <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50">Profile</Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link href="/login" className="text-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg">Sign In</Link>
              <Link href="/signup" className="text-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;