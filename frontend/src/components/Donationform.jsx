import React,{ useState,useEffect } from "react";
import api from "../api"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Donationform(){
    const location= useLocation();
    const initialDonor= location.state?.donor;
    const [donor,setDonor]= useState(initialDonor||null); //data coming from the user dashboard
    const [form,setForm]= useState({
        foodType: "",
        quantity:"",
        pickupAddress:""
    });
    const [image,setImage]= usestate(null);
    useEffect(()=>{
        if(!donor){
            const token= localStorage.getItem("token");
            if(!token) return;
            const fetchDonor= async ()=>{
                try{
                    const res= await api.get("/donor/profile",{
                        headers:{Authorization:`Bearer ${token}`}
                    });
                    setDonor(res.data);
                }catch(err){
                    alert("Session expired! Please login again");
                    Navigate("/donor/login");
                }
            };
            fetchDonor();
        }
    },[donor]);
    const handleChange= (e)=>{
        setForm((prev)=>({...prev,[e.target.name]:e.target.value}));
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) { // 2MB limit
        alert("Image size should be less than 2MB");
        e.target.value = null; // Reset input
        return;
    }
        setImage(file);
    };
    const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token){
        alert("Token not found. Please login again.");
        navigate("/donor/login")
    }
    const formData = new FormData();
    formData.append("foodType", form.foodType);
    formData.append("quantity", form.quantity);
    formData.append("pickupAddress", form.pickupAddress);
    if (image) formData.append("image", image);

    try {
      await api.post("/donation/submit", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Donation submitted successfully!");
      setForm({ foodType: "", quantity: "", pickupAddress: "" });
      setImage(null);
    } catch (err) {
      alert("Error submitting donation. Please try again.");
    }
  };
    return(
        <form onSubmit={handleSubmit}>
            <h2>Food Donation Form</h2>
            <fieldset>
                <legend>Donor Info</legend>
                <label>Donor Name</label>
                <input type="text" value={donor.DonorName} readOnly />

                <label>Email</label>
                <input type="email" value={donor.email} readOnly />

                <label>Phone</label>
                <input type="number" value={donor.phone} readOnly />
                <label>Organisation</label>
                <input type="text" value={donor.organisation || "Not Applicable"} readOnly />
            </fieldset>

            <fieldset>
                <legend>Food Details</legend>
                <label>Food Type</label>
                <select
                    name="foodType"
                    value={form.foodType}
                    onChange={handleChange}
                    required>
                    <option value="">Select food option</option>
                    <option value="Cooked">Cooked</option>
                    <option value="Uncooked">Uncooked</option>
                    <option value="Packed">Packed</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                </select>
                <label>Quantity</label>
                <input type="text" name="quantity" value={form.quantity} onChange={handleChange} required />
                <label>Pickup Address</label>
                <textarea
                    name="pickupAddress"
                    value={form.pickupAddress}
                    onChange={handleChange}
                    required
                >
                </textarea>
                <label>Food Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </fieldset>
            <button type="submit">Submit Donation</button>
        </form>
    )
}