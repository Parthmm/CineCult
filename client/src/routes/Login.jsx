import React, { useState } from 'react';
import config from "../config.json";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [name, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const login = () => {
        fetch(`http://localhost:${config.PORT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                password: password,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {

                if (data.error) {
                    setError("Username or password try again");
                } else {
                    // set username in local storage 
                    localStorage.setItem('username', name)
                    localStorage.setItem('authToken', data.token);
                    console.log("authtoken: " + data.token);
                    navigate("/dashboard");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setError("Username or password is wrong try again");
            });
    }

    return (
        <div>
            <div className={"titleContainer"}>
                <div>Login</div>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    placeholder="Enter your username here"
                    className={"inputBox"} />
                <label className="errorLabel">{ }</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    placeholder="Enter your password here"
                    className={"inputBox"} />

            </div>
            <br />
            <label className="errorLabel">{error}</label>

            <button onClick={login}> Login </button>
            <button onClick={() => navigate("/register")}>Don't have an account?</button>

        </div>
    )
}


export default Login;
