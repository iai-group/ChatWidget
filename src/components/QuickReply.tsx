import { MDBBtn } from "mdb-react-ui-kit";

export default function QuickReplyButton({
  key,
  text,
  message,
  click,
}: {
  key: number;
  text: string;
  message: string;
  click: (message: string, index: number) => void;
}): JSX.Element {
  const handleClick = () => {
    click(message, key);
  };

  return (
    <MDBBtn outline size="sm" color="secondary" onClick={handleClick}>
      {text}
    </MDBBtn>
  );
}
