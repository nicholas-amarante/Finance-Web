import {useNavigate} from 'react-router-dom';

export default function LogoutButton(){
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem('tokenJwt');
        navigate('/');
    }

    return(
        <button onClick={handleLogout} className='bg-red-400'>
            Sair
        </button>
    );
}