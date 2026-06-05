import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='w-full min-h-screen flex justify-center items-center px-4 md:px-8 py-8 md:py-12'>
        {children}
    </main>
  )
}

export default AuthLayout