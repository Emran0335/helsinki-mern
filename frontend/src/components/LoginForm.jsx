import React, { useEffect, useState } from "react";
import loginService from "../services/login";
import noteService from "../services/notes";

const LoginForm = ({ setErrorMessage, user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user?.token);
    }
  }, [setUser]);
  // login details
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const newUser = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(newUser));
      noteService.setToken(newUser.token);
      setUser(newUser);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="#">username</label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="#">password</label>
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
