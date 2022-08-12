import React from "react";
export function LoginForm({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
}) {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username:
          <input
            type="text"
            name="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </>
  );
}
