import './App.css'
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Home from './components/Home'
import LoginDonor from './components/LoginDonor'
import RegisterDonor from './components/RegisterDonor'
import LoginNgo from './components/LoginNgo'
import RegisterNgo from './components/RegisterNgo'
import About from './components/About'
import Donor from './components/Donor'
import Ngo from './components/Ngo'
import DonorDashboard from './components/DonorDashboard'
import NgoDashboard from './components/NgoDashboard'
import Donationform from './components/Donationform'
function ProtectedRoute({children}){
    const token= localStorage.getItem('token');
    return token?children:<Navigate to="/donor/login" />
}
function ProtectedRoute2({children}){
    const token= localStorage.getItem('token');
    return token?children:<Navigate to="/ngo/login" />
}
function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/donor/login" element={<LoginDonor />} />
                <Route path="/donor/register" element={<RegisterDonor />} />
                <Route path="/about" element={<About />} />
                <Route path="/ngo/login" element={<LoginNgo />} />
                <Route path= "/ngo/register" element={<RegisterNgo />} />
                <Route path= "/donor/dashboard" element= {<ProtectedRoute><DonorDashboard /></ProtectedRoute>} />
                <Route path= "/ngo/dashboard" element= {<ProtectedRoute2><NgoDashboard /></ProtectedRoute2>} />
                <Route path= "/donor" element= {<Donor />} />
                <Route path= "/ngo" element= {<Ngo />} />
                <Route path= "/donationform" element={<Donationform />} />
            </Routes>
        </Router>
    );
}
export default App;