import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import config from "../config.json";
import { useNavigate } from "react-router-dom";

function Login() {  // Assuming movieId is passed as a prop to this component
    const navigate = useNavigate();

    return (
        <div>
            <div className={"titleContainer"}>
                <div>Login</div>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input

                    placeholder="Enter your username here"

                    className={"inputBox"} />
                <label className="errorLabel">{ }</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input

                    placeholder="Enter your password here"
                    className={"inputBox"} />
                <label className="errorLabel">{ }</label>
            </div>
            <br />

            <button onClick={() => navigate("/dashboard")}> Login </button>
            <button onClick={() => navigate("/register")}>Don't have an account?</button>

        </div>
    )
}

export default Login;
