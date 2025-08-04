import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" ">
      <div className="flex justify-center items-center bg-black">
        {/* Auth pages will render here */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
