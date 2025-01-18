import React from "react";

// PROJECT IMPORTS
import CodeVerification from "@/view/authentication/CodeVerification";
import AuthWrapper from "@/sections/auth/auth-forms/AuthLogin";

// ================================|| VERIFY OTP ||================================ //

const CodeVerificationPage = () => {
  return (
    <AuthWrapper>
      <CodeVerification />
    </AuthWrapper>
  );
};

export default CodeVerificationPage;
