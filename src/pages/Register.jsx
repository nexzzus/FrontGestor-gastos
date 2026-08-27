import React from 'react';
import RegisterForm from "../components/register/RegisterForm.jsx";

const Register = () => {
    return (
        <div className={"w-full h-full bg-background flex flex-col items-center justify-center"}>
        <RegisterForm/>
        </div>
    );
};

export default Register;