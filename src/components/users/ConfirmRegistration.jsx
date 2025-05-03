import React, { useState, useEffect } from "react";
import './RegisterForm.css';
import {
  CognitoUser,
  CognitoUserPool
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_Z7qmmZ7jR",
  ClientId: "p2i40ahcfq7embinuejq5kdes"
};

const userPool = new CognitoUserPool(poolData);

export default function ConfirmRegistration() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  // שליפת מייל מה-URL אם הגיע מ-?email=...
  useEffect(() => {
    const emailFromUrl = new URLSearchParams(window.location.search).get("email");
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, []);

  const handleConfirm = () => {
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.error(err);
        setMessage("❌ " + err.message);
      } else {
        setMessage("✔️ Email confirmed! You can now log in.");
        setTimeout(() => {
          window.location.href = "/login"; // או לאן שתרצי
        }, 2000);
      }
    });
  };

  return (
    <div className="register-form">
      <h2 className="form-title">Confirm Your Email</h2>

      <label>Email:</label>
      <input
        type="email"
        value={email}
        readOnly
        onChange={(e) => setEmail(e.target.value)}
        className="form-input"
      />

      <label>Verification Code:</label>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="form-input"
      />

      <button onClick={handleConfirm} className="submit-btn">Confirm</button>
      <p className="form-message">{message}</p>
    </div>
  );
}
