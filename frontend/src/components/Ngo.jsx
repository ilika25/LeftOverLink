import { useNavigate } from "react-router-dom";
export default function Ngo(){
    const navigate= useNavigate();
    return(
        <>
        <h1>Welcome to the NGO Community</h1>
        <h4>Click on the register button to register your ngo with our site, If already registered, login</h4>
        <button onClick={()=>navigate('/ngo/login')}>Login</button>
        </>
    );
}