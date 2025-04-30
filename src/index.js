/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://us-east-1z7qmmz7jr.auth.us-east-1.amazoncognito.com", // Hosted UI domain
  client_id: "p2i40ahcfq7embinuejq5kdes",
  redirect_uri: window.location.origin + "/callback", // כתובת החזרה
  response_type: "code", // OAuth2 Authorization Code Flow
  scope: "email openid phone", // scopes
  loadUserInfo: true,
  metadata: {
    issuer: "https://us-east-1z7qmmz7jr.auth.us-east-1.amazoncognito.com",
    authorization_endpoint: "https://us-east-1z7qmmz7jr.auth.us-east-1.amazoncognito.com/oauth2/authorize",
    token_endpoint: "https://us-east-1z7qmmz7jr.auth.us-east-1.amazoncognito.com/oauth2/token",
    userinfo_endpoint: "https://us-east-1z7qmmz7jr.auth.us-east-1.amazoncognito.com/oauth2/userInfo",
    end_session_endpoint: "https://us-east-1z7qmmz7jr.auth.us-east-1.amazoncognito.com/logout",
    jwks_uri: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Z7qmmZ7jR/.well-known/jwks.json"
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    {/*<AuthProvider {...cognitoAuthConfig}>*/}
    <AuthProvider {...cognitoAuthConfig} onSigninCallback={(user) => console.log("✅ Auth success!", user)}>

      <App />
    </AuthProvider>
  </React.StrictMode>
);