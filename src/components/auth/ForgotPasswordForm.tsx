"use client";

import { forgetPassword } from '@/lib/auth-client';
import Link from 'next/link';
import React, { useState } from 'react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      await forgetPassword({
        email,
        redirectTo: '/reset-password',
      }, {
        onRequest: () => setIsLoading(true),
        onError: (ctx) => {
          setError(ctx.error.message || "Something went wrong. Please try again.");
          setIsLoading(false);
        },
        onSuccess: () => {
          setSuccess(true);
          setIsLoading(false);
          setEmail('');
        }
      });
    } catch (err) {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Error Message */}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg">
          Reset link has been sent to your email successfully!
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="you@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm mt-2 flex justify-center items-center"
      >
        {isLoading ? "Sending..." : "Send Reset Link"}
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Remember your password?{' '}
        <Link href="/login" className="text-blue-600 hover:underline font-medium">
          Back to Login
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;