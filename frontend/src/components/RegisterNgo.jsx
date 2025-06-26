import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../api'

export default function RegisterNgo(){
    const [form,setForm] =useState({
        NgoName:"",password:"",address:"",phone:"",email:""
    });
    const navigate= useNavigate();
    const handleChange= (e)=>{
        setForm({...form,[e.target.name]: e.target.value});
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const res= await api.post('/ngo/register',form);
            alert(res.data.message);
            navigate('/ngo/login');
        }catch(err){
            alert(err.response.data.error || 'Registration failed');
        }
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="NgoName" onChange={handleChange} placeholder="NGO Name" required/>
            <input type="password" name="password" onChange={handleChange} placeholder="Password" required/>
            <input type="text" name="address" onChange={handleChange} placeholder="Address" required/>
            <input type="tel" name="phone" onChange={handleChange} placeholder="Phone No." pattern="[0-9]{10}" required/>
            <input type="email" name="email" onChange={handleChange} placeholder="Email" autoComplete="email" required/>
            <button type="submit">Register</button>
        </form>
        </>
    );
}