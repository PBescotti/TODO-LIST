import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import axios from "axios";
import Message from "./Message";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default App;
