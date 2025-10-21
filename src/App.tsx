
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { WelcomePage } from './WelcomePage';
import './App.css'; 

function App() {
  return (
    <Routes>
   
      <Route path="/" element={<LoginPage />} />

 
      <Route path="/welcome" element={<WelcomePage />} />

     

    </Routes>
  );
}

export default App;