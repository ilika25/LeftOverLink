
import { useNavigate } from "react-router-dom";
import donate from '../assets/donate3.webp'
export default function Home(){
    const navigate= useNavigate();
    return(
        <div className='home'>
            <div className="left">
                <h1>Welcome to LeftOverLink!</h1>
                The food you waste could be someone’s only meal. Let's make the World better for each soul!
                <div className="btns">
                    <button className='donorbtn' onClick={()=>navigate('/login')}>Donor Registration</button>
                    <button className='ngobtn' onClick={()=>navigate('/register')}>NGO Registartion</button>
                </div>
                <img src={donate} alt="" style={{height: 'auto',width:'500px'}}/>
            </div>
            <div className="right">
                <h1 style={{fontSize:'30px', marginTop:'280px'}}><b>''One Link Can End Hunger. <br />Let's create it with LeftOverLink''</b></h1>
                <button className='learnmorebtn' onClick={()=>navigate('/about')}>Learn More About Us</button>
            </div>
        </div>
    );
}