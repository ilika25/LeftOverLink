import React,{useEffect,useState} from 'react';
import api from '../api';

export default function DonorDashboard(){
    const [donor,setDonor]= useState(null);
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
        </>
    )
}