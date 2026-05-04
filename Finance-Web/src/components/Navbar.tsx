import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import profile from "../assets/profile.png";

export function Navbar(){
    const [isLoggedIn, setIsLoggedIn]=useState(false);
    const navigate=useNavigate();

    const [isMenuOpen, setIsMenuOpen]=useState(false);
    const toggleMenu=()=>{
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(()=>{
        const token=localStorage.getItem('tokenJwt');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout=()=>{
        localStorage.removeItem('tokenJwt');
        setIsLoggedIn(false);
        navigate('/');
    }

    return(
        <nav className="flex    ">

            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <div className="absolute top-6 right-8 flex gap-4 z-20">
                        <button onClick={toggleMenu} className='flex justify-center bg-white w-12 h-12 rounded-full pt-2.5 hover:shadow-[1px_1px_20px_-5px] hover:shadow-gray-800 transition-all duration-500'>
                            <img src={profile} alt="" className='h-7 flex '/>
                        </button>
                        {isMenuOpen&&(
                            <div className='absolute bg-gray-200 w-20 font-p flex flex-col mt-14 -left-8 items-end z-20 p-2 rounded-sm'>
                                <Link to={''}>Perfil</Link>
                                <Link to={'/menu'}>Menu</Link>
                                <button onClick={handleLogout}>Sair</button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* BOTÕES PARA QUEM NÃO ESTÁ LOGADO */
                    <div className="absolute top-6 right-8 flex gap-4 z-20">
                        <button onClick={() => navigate("/login")} className="font-p bg-white/70 backdrop-blur-md hover:bg-white hover:scale-110 text-gray-800 px-6 py-2 rounded-full transition">
                            Entrar
                        </button>
                        <button onClick={() => navigate("/register")} className="font-p bg-gray-700/70 backdrop-blur-md hover:bg-gray-900 hover:scale-110 text-white px-6 py-2 rounded-full transition">
                            Register
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}