"use client";

import { signIn, signUp } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";

const RegisterForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setError(null);
    setIsSuccess(false);
    setIsLoading(true);

    try {
      await signUp.email(
        {
          name: name,
          email: email,
          password: password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            setIsLoading(false);
            setIsSuccess(true);
            setName("");
            setEmail("");
            setPassword("");
          },
          onError: (ctx) => {
            setError(
              ctx.error.message ||
                "Failed to create an account. Try another email.",
            );
            setIsLoading(false);
          },
        },
      );
    } catch (err) {
      setError("An unexpected error occurred during registration.");
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setError(null);
    try {
      await signIn.social(
        {
          provider,
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            setError(
              ctx.error.message || `Failed to sign up with ${provider}.`,
            );
          },
        },
      );
    } catch (err) {
      setError(`An error occurred with ${provider} sign up.`);
    }
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Error Message */}
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}
        {isSuccess && (
          <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg">
            Account created successfully! Please check your email to verify your
            account.
          </div>
        )}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            required
            value={name}
            disabled={isLoading}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            required
            value={email}
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            required
            value={password}
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm text-sm mt-2"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-wider">
          Or sign up with
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Social Logins */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleSocialSignIn("google")}
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        >
          <FcGoogle className="w-4 h-4" />
          <span>Google</span>
        </button>
        <button
          onClick={() => handleSocialSignIn("github")}
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        >
          <SiGithub className="w-4 h-4" />
          <span>GitHub</span>
        </button>
      </div>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline font-medium"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
