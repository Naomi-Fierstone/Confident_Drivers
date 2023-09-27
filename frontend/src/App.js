import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from './components/Welcome';
import Login from "./components/Login";
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Login></Login>}></Route>
        <Route path='/confidentdrivers' element ={<Welcome></Welcome>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;