import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import LoginDonor from './components/LoginDonor'
import RegisterDonor from './components/RegisterDonor'
import LoginNgo from './components/LoginNgo'
import RegisterNgo from './components/RegisterNgo'
import About from './components/About'
import Donor from './components/Donor'
import Ngo from './components/Ngo'

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
                <Route path= "/donor" element= {<Donor />} />
                <Route path= "/ngo" element= {<Ngo />} />
            </Routes>
        </Router>
    );
}
export default App;