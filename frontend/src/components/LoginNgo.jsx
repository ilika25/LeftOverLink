import { Link } from "react-router-dom";
export default function LoginNgo(){
    return(
        <div className="login">
            <form>
                <input type="text" placeholder="NGO Name" name="NgoName"></input>
                <input type="email" placeholder="email" autoComplete="email" name="email"/>
                <input type= "password" placeholder="Password" name="password"></input>
                <button type="submit">Login</button>
            </form>
            <Link to="/ngo/register">Don't have an account?Register Now</Link>
        </div>
    );
}