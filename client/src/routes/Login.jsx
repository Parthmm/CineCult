import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import config from "../config.json";
import { useNavigate } from "react-router-dom";

function Login() {  // Assuming movieId is passed as a prop to this component
    const navigate = useNavigate();

    return (
        <div>
            <p>Hello</p>
            <button onClick={() => navigate("/dashboard")}> Login </button>
        </div>
    )
}

export default Login;
