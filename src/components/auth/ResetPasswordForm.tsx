import { resetPassword } from '@/lib/auth-client';
import React, { useState } from 'react'

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const token = new URLSearchParams(window.location.search).get('token');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!token) {
      console.error("Token is missing in the URL");
      return;
    }
    if(newPassword !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword({
        token,
        newPassword,
      })
    }catch (error) {
      console.error("Error sending reset link:", error);
    }
  }
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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