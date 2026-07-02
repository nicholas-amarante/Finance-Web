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
                    <div className="absolute top-3 right-3 sm:top-6 sm:right-8 flex flex-col sm:flex-row gap-2 sm:gap-4 z-20">
                        <button onClick={toggleMenu} className='flex justify-center bg-white w-12 h-12 rounded-full pt-2.5 hover:shadow-[1px_1px_20px_-5px] hover:shadow-gray-800 transition-all duration-500'>
                            <img src={profile} alt="" className='h-7 flex '/>
                        </button>
                        {isMenuOpen&&(
                            <div className="absolute top-6 right-3 sm:top-6 sm:right-8 flex items-center gap-2 sm:gap-4 z-20">
                                <Link to={'/profile'}>Perfil</Link>
                                <button onClick={handleLogout} className="font-p bg-gray-700/70 backdrop-blur-md hover:bg-gray-900 hover:scale-110 text-white px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-full transition">
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* BOTÕES PARA QUEM NÃO ESTÁ LOGADO */
                    <div className="absolute top-6 right-3 sm:top-6 sm:right-8 flex gap-2 sm:gap-4 z-20">
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
