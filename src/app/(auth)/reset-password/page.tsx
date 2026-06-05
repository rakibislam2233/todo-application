import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
      <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-xl ">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Reset Password</h1>
        <p className="text-center text-gray-500 mb-8 text-sm">Please enter your new password below</p>
        <ResetPasswordForm />
      </div>
  );
};

export default ResetPasswordPage;