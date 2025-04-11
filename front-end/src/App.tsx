import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import axios from "axios";
import Message from "./Message";
import LoginForm from "./components/LoginForm";

function App() {

  const [message, setMessage] = useState('')

  const handleListButtonClick = () => {
    axios.get("http://localhost:9999/lists/")
    .then((response) => {
      console.log(response.data)
    })
  }

  return (
    <div>
      <Button onClick={handleListButtonClick}>GetLists</Button>
      <Message message={message}/>
      <LoginForm />
    </div>
  );
}

export default App;
