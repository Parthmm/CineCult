import React, { useState } from 'react';
import config from "../config.json";
import { v4 as uuidv4 } from 'uuid';

import styles from "../styles/Form.module.css"

function Register() {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")

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
                email: email,
                username: username
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
        <div className={styles.form_background}>

            <h1>Cinecult</h1>


            <form className={styles.form_div} onSubmit={addUser}>
                <div className={"titleContainer"}>
                    <h2>User Registration</h2>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        placeholder="Enter full name here"
                        className={styles.input_box} />
                    <label className="errorLabel">{ }</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        placeholder="Enter username here"
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
                        placeholder="Enter password here"
                        className={styles.input_box} />
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
                        className={styles.input_box} />

                </div>
                <br />

                <button className={styles.form_button} type="submit">Register</button>

                <label className="errorLabel">{error}</label>

            </form>
        </div>
    )
}

export default Register;
