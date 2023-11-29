import React, { useState } from 'react';
import config from "../config.json";
import { useNavigate } from "react-router-dom";

//styling 
import styles from "../styles/Form.module.css"

function Login(props) {
    const navigate = useNavigate();

    const [name, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const login = () => {

        //sets local storage and the correct post
        let login = ""
        if (props.reviewer == true) {
            login = "loginreviewer"
            localStorage.setItem('isReviewer', 1)
        }
        else {
            login = "login"
            localStorage.setItem('isReviewer', 0)
        }
        fetch(`http://localhost:${config.PORT}/${login}`, {
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
        <div className={styles.form_background}>

            <h1>Cinecult</h1>

            <div className={styles.form_div}>

                <div className={"titleContainer"}>
                    <h2>Login</h2>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        placeholder="Enter your username here"
                        className={styles.input_box} />
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
                        className={styles.input_box} />

                </div>
                <br />
                <label className="errorLabel">{error}</label>

                <button className={styles.form_button} onClick={login} > Login </button>

                {!props.reviewer && (
                    <>
                        <button className={styles.form_button} onClick={() => navigate("/reviewer-login")}>Are you a reviewer?</button>
                        <button className={styles.form_button} onClick={() => navigate("/register")}>Don't have an account?</button>
                    </>
                )}

            </div>

        </div >
    )
}


export default Login;
