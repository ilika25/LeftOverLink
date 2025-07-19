import './styles/Home.css';
import { useNavigate } from 'react-router-dom';
import donate from '../assets/donate3.webp';
import rightImage from '../assets/image.jpg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="left">
        <div className="left-content">
          <h1>
            Welcome to <span className="highlight">LeftOverLink</span>!
          </h1>
          <p className="subtext">
            The food you waste could be someone’s only meal. <br />
            Let’s build a world where every plate counts 🍽️
          </p>
          <div className="btns">
            <button className="donorbtn" onClick={() => navigate('/donor')}>Donor Dashboard</button>
            <button className="ngobtn" onClick={() => navigate('/ngo')}>NGO Dashboard</button>
          </div>
          <img src={donate} alt="Donate Visual" className="main-image" />
        </div>
      </div>

      <div
        className="right"
        style={{
          backgroundImage: `url(${rightImage})`,
        }}
      >
        <div className="overlay">
          <h2 className="quote">
            “One link can end hunger —<br />
            Let’s create it with <span className="highlight">LeftOverLink</span>.”
          </h2>
          <button className="learnmorebtn" onClick={() => navigate('/about')}>
            Learn More About Us
          </button>
        </div>
      </div>
    </div>
  );
}
