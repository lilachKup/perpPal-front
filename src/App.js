/*import React from "react";
import StoreInventory from "./components/store/StoreInventory";
import CostumerScreen from "./components/costumer/CostumerScreen";
import RegisterForm from "./components/users/RegisterForm.jsx";

*/


import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthTabs from './components/users/AuthTabs';
import { useAuth } from 'react-oidc-context';
import CallbackPage from './CallbackPage';
import ConfirmRegistration from "./components/users/ConfirmRegistration";
import StoreInventory from './components/store/StoreInventory';
import CustomerScreen from './components/costumer/CostumerScreen';



//import { Route, Routes } from "react-router-dom";
//import CallbackPage from "./CallbackPage";

function Home() {
  const auth = useAuth();
  const user = auth.user?.profile;

  if (!user) return <p>Loading user...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>👤 Email: {user.email}</h2>
      <h3>🧠 Raw ID Token Profile:</h3>
      <pre style={{ background: '#eee', padding: '1rem' }}>
        {JSON.stringify(auth, null, 2)}
      </pre>
    </div>
  );
}


/*function Home() {
  const auth = useAuth();
  const user = auth.user?.profile;

  if (!user) return <p>Loading user...</p>;

  const userType = user["custom:user_type"];
  const userId = user.sub;

  console.log("User type:", userType);
  if (userType === "customer") {
    return <CustomerScreen userId={userId} />;
  } else {
    return <StoreInventory userId={userId} />;
  }
}*/



export default function App() {
  const auth = useAuth();

  if (auth.isLoading) return <p>Loading...</p>;
  if (auth.error) return <p>Error: {auth.error.message}</p>;

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/test" element={<p>✅ This is a test page</p>} />

        {/* דף התחברות/הרשמה */}
        <Route path="/" element={<AuthTabs />} />

        <Route path="/confirm" element={<ConfirmRegistration />} />

        {/* דף חזרה מההתחברות */}
        <Route path="/callback" element={<CallbackPage />} />

        {/* דף בית רק למשתמשים מחוברים */}
        <Route
          path="/home"
          element={
            auth.isLoading ? (
              <p>Loading...</p>
            ) : auth.isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

      </Routes>
    </BrowserRouter >
  );
}

