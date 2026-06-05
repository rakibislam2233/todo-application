import React from 'react'

const ForgotPasswordForm = () => {
  return (
    <form className="space-y-4">
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
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm mt-2"
      >
        Send Reset Link
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Remember your password?{' '}
        <a href="/login" className="text-blue-600 hover:underline font-medium">
          Back to Login
        </a>
      </p>
    </form>
  )
}

export default ForgotPasswordForm