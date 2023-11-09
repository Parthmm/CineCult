import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import config from "../config.json";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    return (
        <div>
            <div className={"titleContainer"}>
                <div>Register</div>
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
            <div className={"inputContainer"}>
                <input
                    className={"inputButton"}
                    type="button"

                    value={"Log in"} />
            </div>

            <button>Rahted</button>

        </div>
    )
}

export default Register;
