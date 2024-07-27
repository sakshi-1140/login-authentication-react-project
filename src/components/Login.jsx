import React, { useRef } from "react";

function Login({ onLogin, error }) {
  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = userNameRef.current.value;
    const password = passwordRef.current.value;
    //console.log(`login clicked + usename : ${username} password :${password}`);
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <h2>Welcome back!</h2>
      <h1>Sign in to your account</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" ref={userNameRef} required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={passwordRef} required />
        <button type="submit">Login</button>
        <a href="#">Forget Your Password</a>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Don't have any Account?<span>Sign up</span>
      </p>
    </div>
  );
}

export default Login;
