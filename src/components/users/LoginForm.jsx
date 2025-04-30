import React, { useState } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool
} from "amazon-cognito-identity-js";
import "./RegisterForm.css";

const poolData = {
  UserPoolId: "us-east-1_Z7qmmZ7jR",
  ClientId: "p2i40ahcfq7embinuejq5kdes"
};

const userPool = new CognitoUserPool(poolData);

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken();
        console.log("✅ Logged in!", idToken);
        setMessage("✅ Logged in!");
        localStorage.setItem("idToken", idToken);
        // אפשר לנתב:
        // window.location.href = "/home";
      },
      onFailure: (err) => {
        console.error("❌ Login failed", err);
        if (err.code === "UserNotConfirmedException") {
          setMessage("❗ Email not confirmed. Please check your inbox.");
          window.location.href = `/confirm?email=${encodeURIComponent(email)}`;
        } else {
          setMessage("❌ " + err.message);
        }
      }
    });
  };

  return (
    <div className="register-form">
      <h2 className="form-title">Login</h2>

      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />

      <button onClick={handleLogin} className="submit-btn">Login</button>

      <p className="form-message">{message}</p>
    </div>
  );
}
