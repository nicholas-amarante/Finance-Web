import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ExpandableMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;
    const isLoggedIn = useAuth();
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    return (
        <div className="z-10 absolute">
            <button onClick={toggleMenu} className="absolute menu">
                <IoIosArrowForward className={`IoIosArrowForward transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>
            {isMenuOpen && (
                <div className="bg-gray-200 w-25 font-p flex flex-col mt-17 ml-5 z-20 p-1 rounded-sm">

                    {currentPath === '/login' && !isLoggedIn && (
                        <>
                            <Link to="/">Inicio</Link>
                            <Link to="/register">Registrar</Link>
                        </>
                    )}

                    {currentPath === '/register' && !isLoggedIn && (
                        <>
                            <Link to="/">Inicio</Link>
                            <Link to="/login">Entrar</Link>
                        </>
                    )}

                    {!isLoggedIn && currentPath==='/' && (
                        <>
                            <Link to="/login">Entrar</Link>
                            <Link to="/register">Registrar</Link>
                        </>
                    )}

                    {isLoggedIn && currentPath==='/' && (
                        <>
                            <Link to="/menu">Menu</Link>
                        </>
                    )}

                    {isLoggedIn && currentPath == '/menu' && (
                        <>
                            <Link to="/">Inicio</Link>
                        </>
                    )}

                    {isLoggedIn && currentPath == '/profile' && (
                        <>
                            <Link to="/">Inicio</Link>
                            <Link to="/menu">Menu</Link>
                        </>
                    )}
                    {isLoggedIn && currentPath.includes('transaction') && (
                        <>
                            <Link to="/">Inicio</Link>
                            <Link to="/menu">Menu</Link>
                        </>
                    )}

                    {isLoggedIn && currentPath=='/transaction' &&(
                        <>
                            <Link to="/">Inicio</Link>
                            <Link to="/menu">Menu</Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}