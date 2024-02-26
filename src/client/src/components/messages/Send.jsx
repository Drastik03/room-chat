import { IoIosSend } from "react-icons/io";
import "../../index.css";
const Send = ({children, action}) => {
  return (
    <button onClick={action} className="send-button">
        {children}
        <IoIosSend className="icon"/>
    </button>
  )
}

export default Send
