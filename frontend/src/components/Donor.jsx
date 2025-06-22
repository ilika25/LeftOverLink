import { useNavigate } from "react-router-dom";
export default function Donor(){
    const navigate= useNavigate();
    return(
        <>
        <h1>Welcome to the Donor Community</h1>
        <button onClick={()=>navigate('/logindonor')}>Login</button>
        </>
    );
}