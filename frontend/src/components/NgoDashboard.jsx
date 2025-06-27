import React,{useEffect,useState} from 'react';
import api from '../api';

export default function NgoDashboard(){
    const [ngo,setNgo]= useState(null);
    useEffect(()=>{
        const token= localStorage.getItem('token');
        if(!token){
            return ;
        }
        const fetchNgoData= async()=>{
            try{
                const res= await api.get('/ngo/profile',{
                    headers:{Authorization: `Bearer ${token}`}
                });
                setNgo(res.data);
            }catch(err){
                console.error(err);
            }
        };
        fetchNgoData();
    },[]);
    if(!ngo) return <p>Loading ...</p>
    return (
        <>
        <h1>Welcome,{ngo.NgoName}!</h1>
        </>
    )
}