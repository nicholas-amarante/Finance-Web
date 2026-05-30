import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import Index from './pages/Index';
import Register from './pages/Register';
import Menu from './pages/Menu';
import CreateTransaction from './pages/CreateTransaction';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

function App(){
    return(
        <Routes>
            <Route path='/' element={<Index/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />

            <Route path='/menu' element={<Menu/>} />
            <Route path='/transaction' element={<CreateTransaction/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route element={<PrivateRoute/>}>
            </Route>
        </Routes>
    );
}
export default App;
