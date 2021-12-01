import './App.css';
import { Route,Routes,Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar'
import Main from  './components/Main/Main'

const App=()=> {
  return (
    <div className="App">
      <Navbar />
      <div className="container">

<Routes>
  <Route path = "/login" element={<Login />}/>
  <Route path = "/" element={<Main />}/>
</Routes>   

    </div>

    </div>
  );
}

export default App;
