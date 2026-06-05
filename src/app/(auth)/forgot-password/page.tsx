import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
      <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-xl ">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Forgot Password</h1>
        <p className="text-center text-gray-500 mb-8 text-sm">Enter your email and we'll send you a link to reset your password</p>
        <ForgotPasswordForm />
      </div>
  );
};

export default ForgotPasswordPage;