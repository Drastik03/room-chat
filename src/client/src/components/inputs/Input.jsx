import "../../index.css";
const Input = ({children,text,press}) => {
  return (
    <>
        <label className="text-input">{children}</label>
        <input className="input-text" onChange={text} onKeyUp={press}/>
    </>
  )
}

export default Input
