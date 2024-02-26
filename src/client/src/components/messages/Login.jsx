import { IoIosLogIn } from "react-icons/io";
import "../../index.css";
const Login = ({children, action}) => {
  return (
    <button onClick={action} className="send-button">
        {children}
        <IoIosLogIn className="icon"/>
    </button>
  )
}

export default Login
