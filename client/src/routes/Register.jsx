import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import config from "../config.json";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function Register() {
    const navigate = useNavigate();

    const [name, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const addUser = (e) => {
        e.preventDefault();
        fetch(`http://localhost:${config.PORT}/adduser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: uuidv4(),
                name: name,
                password: password,
                email: email
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
                    setError("Error Registering. Try again.");
                } else {
                    setError("Congrats on creating an account. Please go the the login page.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setError("Username already exists try again");
            });
    }

    return (
        <div>
            <form onSubmit={addUser}>
                <div className={"titleContainer"}>
                    <div>Register</div>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        placeholder="Enter username here"
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
                        placeholder="Enter password here"
                        className={"inputBox"} />
                    <label className="errorLabel">{ }</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        placeholder="Enter email address here"
                        className={"inputBox"} />
                    <label className="errorLabel">{error}</label>
                </div>
                <br />
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;
