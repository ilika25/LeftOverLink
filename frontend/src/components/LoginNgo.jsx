import { Link } from "react-router-dom";
export default function LoginNgo(){
    return(
        <div className="login">
            <form>
                <input type="text" placeholder="NGO Name"></input>
                <input type= "password" placeholder="Password"></input>
                <button type="submit">Login</button>
            </form>
            <Link to="/registerdonor">Don't have an account?Register Now</Link>
        </div>
    );
}