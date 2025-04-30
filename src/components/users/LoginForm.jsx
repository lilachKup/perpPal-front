import React, { useState } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool
} from "amazon-cognito-identity-js";
import "./RegisterForm.css"; // משתמשים באותו עיצוב

const poolData = {
  UserPoolId: "us-east-1_O8ggAWzoZ",
  ClientId: "ehfkh00ld0q6p3641hnq3mseq"
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
        // אפשרות לניווט:
        // window.location.href = "/dashboard";
      },
      onFailure: (err) => {
        console.error("❌ Login failed", err);
        setMessage("❌ " + err.message);
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
