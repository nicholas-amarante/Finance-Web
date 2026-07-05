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
        <nav className="flex justify-between items-center w-full p-4">
            <div></div> 

            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20 inline-block text-left">
                        <button onClick={toggleMenu} className='flex justify-center items-center bg-white w-12 h-12 rounded-full hover:shadow-[1px_1px_20px_-5px] hover:shadow-gray-800 transition-all duration-500 focus:outline-none'>
                            <img src={profile} alt="Profile" className='h-7 w-7 object-contain'/>
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl py-2 flex flex-col gap-1 border border-gray-100 items-center justify-center">
                                <Link to={'/profile'} className="w-full text-center py-2 text-gray-700 hover:bg-gray-100 transition rounded-t-xl font-p">
                                    Perfil
                                </Link>
                                <button onClick={handleLogout} className="w-10/12 my-1 font-p bg-gray-700 hover:bg-gray-900 text-white py-2 text-sm rounded-full transition">
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                     /* BOTÕES PARA QUEM NÃO ESTÁ LOGADO */
                    <div className="absolute top-6 right-6 sm:top-8 sm:right-10 flex gap-2 sm:gap-4 z-20">
                        <button onClick={() => navigate("/login")} className="font-p bg-white/70 backdrop-blur-md hover:bg-white hover:scale-110 text-gray-800 px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-full transition">
                            Entrar
                        </button>
                        <button onClick={() => navigate("/register")} className="font-p bg-gray-700/70 backdrop-blur-md hover:bg-gray-900 hover:scale-110 text-white px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-full transition">
                            Register
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}