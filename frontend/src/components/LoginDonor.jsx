import { Link } from "react-router-dom";
export default function LoginDonor(){
    return(
        <div className="login">
            <form>
                <input type="text" placeholder="Username"></input>
                <input type= "password" placeholder="Password"></input>
                <button type="submit">Login</button>
            </form>
            <Link to="/registerdonor">Don't have an account?Register Now</Link>
        </div>
    );
}