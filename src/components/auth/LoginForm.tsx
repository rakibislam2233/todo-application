'use client';
import { signIn } from '@/lib/auth-client';
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email || !password) {
      return;
    }
    try {
      await signIn.email({
        email: email,
        password: password,
        callbackURL: '/'
      })

    }catch (error) {
      console.error('Login error:', error);
    }

  }
  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/'
      });
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  }

  const handleGithubSignIn = async () => {
    try {
      await signIn.social({
        provider: 'github',
        callbackURL: '/'
      });
    } catch (error) {
      console.error('Github Sign-In error:', error);
    }
  }

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <a href="/forgot-password" className="text-xs text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm text-sm mt-2"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-wider">Or continue with</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Social Logins */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          type="button" 
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="w-4 h-4" /> 
          <span>Google</span>
        </button>
        <button 
          type="button" 
          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
          onClick={handleGithubSignIn}
        >
          <SiGithub className="w-4 h-4" />
          <span>GitHub</span>
        </button>
      </div>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline font-medium">
          Register here
        </a>
      </p>
    </div>
  )
}

export default LoginForm;