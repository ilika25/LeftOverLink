import { Link } from "react-router-dom";
export default function LoginDonor(){
    return(
        <div className="login">
            <form>
                <input type="email" placeholder="email" autoComplete="email" name="email" />
                <input type= "password" placeholder="Password" name="password"></input>
                <button type="submit">Login</button>
            </form>
            <Link to="/donor/register">Don't have an account?Register Now</Link>
        </div>
    );
}