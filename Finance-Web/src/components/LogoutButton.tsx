import {useNavigate} from 'react-router-dom';

export default function LogoutButton(){
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem('tokenJwt');
        navigate('/');
    }

    return(
        <a href="" onClick={handleLogout}>Sair</a>
    );
}