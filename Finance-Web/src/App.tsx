import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register'; // Importe aqui

function App(){
    return(
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} /> {/* Nova Rota */}
            <Route path='/home' element={<Home/>} />
        </Routes>
    );
}
export default App;