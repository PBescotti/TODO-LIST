interface Props {
  message: string;
}

function Message({ message }: Props) {
  if (message) return <h1>{message}</h1>;
  return <h1>No message</h1>;
}

export default Message;
