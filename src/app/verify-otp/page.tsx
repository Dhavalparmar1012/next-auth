// PROJECT IMPORTS
import AuthWrapper from "@/sections/auth/auth-forms/AuthLogin";
import CodeVerification from "@/view/authentication/CodeVerification";

// ================================|| VERIFY OTP ||================================ //

const CodeVerificationPage = () => (
  <AuthWrapper>
    <CodeVerification />
  </AuthWrapper>
);

export default CodeVerificationPage;
