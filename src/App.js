/*import React from "react";
import StoreInventory from "./components/store/StoreInventory";
import CostumerScreen from "./components/costumer/CostumerScreen";
import RegisterForm from "./components/users/RegisterForm.jsx";

function App() {
  return (
    <div>
      {/*<button onClick={() => window.location.href = 'http://localhost:3001/login'}>
        🔐 Login
      </button>}
      {<StoreInventory />}
      {<CostumerScreen />}
      <RegisterForm />
     
    </div>
  );
}

export default App;

*/
// App.js


///////////////////////old with react
/*
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "p2i40ahcfq7embinuejq5kdes";
    const logoutUri = "localhost:3000";
    const cognitoDomain = "https://us-east-1z7qmmz7jr.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;*/


/*
import { useAuth } from "react-oidc-context";
import RegisterForm from "./components/users/RegisterForm";
import LoginForm from "./components/users/LoginForm";

function App() {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  if (auth.isAuthenticated) {
    return (
      <div>
        <h3>Hello, {auth.user?.profile.email}</h3>
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  // אם המשתמש לא מחובר – נציג את שני הטפסים
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default App;
*/

/*import AuthTabs from './components/users/AuthTabs';

export default function App() {
  return (
    <div className="App">
      <AuthTabs />
    </div>
  );
}*/


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthTabs from './components/users/AuthTabs';
import { useAuth } from 'react-oidc-context';
import CallbackPage from './CallbackPage';

//import { Route, Routes } from "react-router-dom";
//import CallbackPage from "./CallbackPage";


function Home() {
  const auth = useAuth();
  return (
    <div>
      <h1>🏠 Welcome home!</h1>
      <p>Email: {auth.user?.profile?.email}</p>
      <button onClick={() => auth.removeUser()}>Sign out</button>
    </div>
  );
}


export default function App() {
  const auth = useAuth();

  if (auth.isLoading) return <p>Loading...</p>;
  if (auth.error) return <p>Error: {auth.error.message}</p>;

  return (
    <Router>
      <Routes>
        <Route path="/test" element={<p>✅ This is a test page</p>} />

        {/* דף התחברות/הרשמה */}
        <Route path="/" element={<AuthTabs />} />

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
    </Router>
  );
}

