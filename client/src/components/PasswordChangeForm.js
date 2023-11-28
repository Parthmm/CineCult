import * as React from "react";
import config from "../config.json";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Form.module.css"

function PasswordChangeForm() {
    const navigate = useNavigate();
    const [oldPW, setOldPW] = React.useState("");
    const [newPW, setNewPW] = React.useState("");
    const [error, setError] = React.useState("");
    const authToken = localStorage.getItem('authToken');

    const handleSubmit = () => {
        fetch(`http://localhost:${config.PORT}/change_password`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: localStorage.getItem('username'),
                old_pw: oldPW,
                new_pw: newPW
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
                setError("Wrong password, try again");
            } else {
                localStorage.removeItem('authToken');
                localStorage.removeItem('username');
                navigate("/");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setError("Password is wrong, please try again.");
        });
    }


    return (
        <div className={styles.form_background}>

            <h1>Change Password</h1>

            <div className={styles.form_div}>

                <br />
                <div className={"inputContainer"}>
                    <input
                        onChange={(e) => {
                            setOldPW(e.target.value)
                        }}
                        placeholder="Enter current password:"
                        className={styles.input_box} />
                    <label className="errorLabel">{ }</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input

                        type="password"
                        onChange={(e) => {
                            setNewPW(e.target.value)
                        }}
                        placeholder="Enter new password:"
                        className={styles.input_box} />

                </div>
                <br />
                <label className="errorLabel">{error}</label>
                <button className={styles.form_button} onClick={handleSubmit} > Submit </button>
                <button className={styles.form_button} onClick={() => navigate("/dashboard")}>Cancel</button>

            </div>

        </div >
    );
}


export default PasswordChangeForm;