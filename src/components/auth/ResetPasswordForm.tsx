import React from 'react'

const ResetPasswordForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="••••••••"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </label>
        <input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          placeholder="••••••••"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          required
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm mt-2"
      >
        Reset Password
      </button>
    </form>
  )
}

export default ResetPasswordForm