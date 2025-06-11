import './App.css'
import donate from './assets/donate3.webp'
import donate2 from './assets/donate2.jpg'
import donate3 from './assets/donate3.webp'
import donate4 from './assets/donate4.jpg'
import positive from './assets/positive.avif'
export default function App(){
    return(
        <div className='home'>
            <div className="left">
                <h1>Welcome to LeftOverLink!</h1>
                The food you waste could be someone’s only meal. Let's make the World better for each soul!
                <div className="btns">
                    <button>Donor Registration</button>
                    <button>NGO Registartion</button>
                </div>
                <img src={donate} alt="" style={{height: 'auto',width:'450px'}}/>
            </div>
            <div className="right">
                <h1 style={{fontSize:'30px'}}>''One Link Can End Hunger. Let's create it with LeftOverLink''</h1>
                <button>Learn More About Us</button>
                <img src={donate4} alt="" style={{height:'auto',width:'90%',marginTop:'20px'}}/>
            </div>
        </div>
    );
}