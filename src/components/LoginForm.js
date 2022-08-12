import React from "react";
export function LoginForm({
  handleLogin,
  username,

  setUsername,
  password,
  setPassword,
}) {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type="text"
          name="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );
}
