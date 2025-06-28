import React,{useEffect,useState} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function DonorDashboard(){
    const [donor,setDonor]= useState(null);
    const navigate= useNavigate();
    useEffect(()=>{
        const token= localStorage.getItem('token');
        if(!token){
            return ;
        }
        const fetchDonorData= async()=>{
            try{
                const res= await api.get('/donor/profile',{
                    headers:{Authorization: `Bearer ${token}`}
                });
                setDonor(res.data);
            }catch(err){
                console.error(err);
            }
        };
        fetchDonorData();
    },[]);
    if(!donor) return <p>Loading ...</p>
    return (
        <>
        <h1>Welcome,{donor.DonorName}!</h1>
        <h3>Ready to make a difference? Fill out the food donation form now!</h3>
        <button onClick={()=>navigate('/donationform', {state: { donor }})}>Donate Now</button>
        </>
    )
}