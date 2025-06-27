import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React,{useState} from "react"
import api from "../api"
export default function LoginNgo(){
  const [form, setForm] = useState({ NgoName:"",email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/ngo/login", form);
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
      navigate("/ngo/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

    return(
        <div className="login">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="NGO Name" name="NgoName" onChange={handleChange} value={form.NgoName} required></input>
                <input type="email" placeholder="Email" autoComplete="email" name="email"onChange={handleChange} value={form.email} required/>
                <input type= "password" placeholder="Password" name="password"onChange={handleChange} value={form.password} required></input>
                <button type="submit">Login</button>
            </form>
            <Link to="/ngo/register">Don't have an account?Register Now</Link>
        </div>
    );
}