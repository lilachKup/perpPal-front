import React, { useState } from 'react';
import {
  CognitoUserPool,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import { useAuth } from 'react-oidc-context';
import './RegisterForm.css';

const poolData = {
  UserPoolId: 'us-east-1_Z7qmmZ7jR',
  ClientId: 'p2i40ahcfq7embinuejq5kdes'
};

const userPool = new CognitoUserPool(poolData);

export default function RegisterForm() {
  const auth = useAuth(); // ✅ שימוש ב־OIDC
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [storeName, setStoreName] = useState('');
  const [storeHours, setStoreHours] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = () => {
    if (!email || !password || !address || !phoneNumber) {
      setMessage("❌ All fields must be filled");
      return;
    }

    if (userType === 'store' && (!storeName || !storeHours)) {
      setMessage("❌ Please fill in all store details");
      return;
    }

    if (userType === 'customer' && (!firstName || !lastName || !zipCode)) {
      setMessage("❌ Please fill in all customer details");
      return;
    }

    const attributes = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'custom:user_type', Value: userType }),
      new CognitoUserAttribute({ Name: 'custom:address', Value: address }),
      new CognitoUserAttribute({ Name: 'phone_number', Value: phoneNumber })
    ];

    if (userType === 'store') {
      attributes.push(new CognitoUserAttribute({ Name: 'custom:store_name', Value: storeName }));
      attributes.push(new CognitoUserAttribute({ Name: 'custom:store_opening_hours', Value: storeHours }));
    } else {
      attributes.push(new CognitoUserAttribute({ Name: 'custom:first_name', Value: firstName }));
      attributes.push(new CognitoUserAttribute({ Name: 'custom:last_name', Value: lastName }));
      attributes.push(new CognitoUserAttribute({ Name: 'custom:zip_code', Value: zipCode }));
    }

    userPool.signUp(email, password, attributes, null, (err, result) => {
      if (err) {
        console.error(err);
        setMessage('❌ ' + err.message);
      } else {
        console.log('✔️ Registered successfully', result);
        setMessage('✔️ Registered successfully!');
        setRegistrationSuccess(true); // ✅ הצגת כפתור Login
      }
    });
  };

  return (
    <div className="register-form">
      <h2 className="form-title">Sign Up</h2>

      <div className="user-type-tabs">
        <div className={userType === 'customer' ? 'tab active' : 'tab'} onClick={() => setUserType('customer')}>
          Customer
        </div>
        <div className={userType === 'store' ? 'tab active' : 'tab'} onClick={() => setUserType('store')}>
          Store
        </div>
      </div>

      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />

      <label>Address:</label>
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-input" />

      <label>Phone number:</label>
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-input" />

      {userType === 'store' && (
        <>
          <label>Store name:</label>
          <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="form-input" />

          <label>Opening hours:</label>
          <input type="text" value={storeHours} onChange={(e) => setStoreHours(e.target.value)} className="form-input" />
        </>
      )}

      {userType === 'customer' && (
        <>
          <label>First name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-input" />

          <label>Last name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-input" />

          <label>Zip code:</label>
          <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="form-input" />
        </>
      )}

      <button onClick={handleRegister} className="submit-btn">Sign Up</button>

      <p className="form-message">{message}</p>

      {registrationSuccess && (
        <button
          className="submit-btn"
          onClick={() => {
            const domain = "https://us-east-1z7qmmz7jr.auth.us-east-1.amazoncognito.com";
            const clientId = "p2i40ahcfq7embinuejq5kdes";
            const redirectUri = window.location.origin + "/callback";
            const loginUrl = `${domain}/login?client_id=${clientId}&response_type=code&scope=email+openid+phone&redirect_uri=${encodeURIComponent(redirectUri)}`;
            window.location.href = loginUrl;
          }}
        >
          Continue to verify
        </button>
      )}
    </div>
  );
}
