import { FormEvent, useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.get('http://localhost:9999/users/')
    // const formData = { email: email, password: password };
    // axios.post("http://localhost:9999/users/login", formData)
    // .then((res) => {
    //     setMessage(res.data);
    // })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{email}</div>
      <br />
      <div>{password}</div>
      <br />
      Email:{" "}
      <input
        id="email-input"
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      <br />
      Password:{" "}
      <input
        id="password-input"
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
      <br />
      <button type="submit">Login</button>

      {message}
    </form>
  );
};

export default LoginForm;
