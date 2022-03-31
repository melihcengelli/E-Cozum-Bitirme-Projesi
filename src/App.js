import './App.css';
import Modals from './components/Modals'
import Lists from './components/Lists'
import Header from './components/Header'
import Footer from './components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import{Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import Allworkfields from './pages/Allworkfields';
import Currentworkfields from './components/Currentworkfields';
import TitleUpdateModal from './components/TitleUpdateModal';
function App() {
  const {user} = useSelector((state)=> state.auth)
  const navigate = useNavigate()


  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    },[user]

  )

  return (
    <div>
        <Header/>
        <Modals/>
        <TitleUpdateModal/>
        <div className="App">
          
          <Currentworkfields/>
        </div>
      
    </div>
  );
}

export default App;
