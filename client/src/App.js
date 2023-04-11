import './App.css';
import Home from "./views/Home/Home";
import Landing from './views/Landing/Landing';
import Detail from './views/Detail/Detail';
import Form from './views/Form/Form';
import NavBar from './components/NavBar/NavBar';
import {Route, useLocation} from "react-router-dom";

function App() {
  const location = useLocation();  //investigar
  return (
    <div className="App">
      {location.pathname === "/home" && <NavBar/>}
       <Route exact path="/" render={() => <Landing/>}/>
      <Route exact path="/home"  component={Home}/>
      <Route exact path= "/pokemon/:id" render={()=><Detail/>}/>
      <Route exact path="/create" render={()=><Form/>}/>
    </div>
  );
}

export default App;
