import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
      <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-xl ">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-8 text-sm">Please enter your details to sign in</p>
        <LoginForm />
      </div>
  );
};

export default LoginPage;