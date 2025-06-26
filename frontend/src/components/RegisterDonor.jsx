import React,{useState} from 'react';
import api from '../api';
import {useNavigate} from 'react-router-dom'

export default function RegisterDonor(){
    const [form,setForm]= useState({
        DonorName:'',password:'',organisation:'',
        phone:'',email:'',
    });
    const navigate= useNavigate();
    const handleChange= (e) => {
        setForm({...form,[e.target.name]:e.target.value}); //three dot is the spread operator, updates one field without changing previous values
    };
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const res= await api.post('/donor/register',form);
            alert(res.data.message);
            navigate('/donor/login');
        }catch(err){
            alert(err.response.data.error || 'Registration failed');
        }
    };
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="DonorName" onChange={handleChange} placeholder="DonorName" required/>
            <input type="password" name="password"onChange={handleChange} placeholder="Password" required/>
            <input type="text" name="organisation" onChange={handleChange} placeholder="Organisation Name(if applicable)" />
            <input type="tel" name="phone" onChange={handleChange} placeholder="Phoen No." pattern="[0-9]{10}" required/>
            <input type="email" name="email" onChange={handleChange} placeholder="Email" autoComplete="email" required/>
            <input type="text" name="address" onChange={handleChange} placeholder="Address" required/>
            <button type="submit">Register</button>
        </form>
        </>
    );
}