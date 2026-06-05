
import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

const RegisterPage = () => {
  return (

      <div className="w-full max-w-md bg-white border border-gray-100 p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Create Account</h1>
        <p className="text-center text-gray-500 mb-8 text-sm">Join us today by creating your account</p>
        <RegisterForm />
      </div>
  );
};

export default RegisterPage;