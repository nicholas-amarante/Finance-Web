import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import {useLocation, Link} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "./LogoutButton";

export default function ExpandableMenu(){
    const [isMenuOpen, setIsMenuOpen]=useState(false);
    const location=useLocation();
    const currentPath=location.pathname;
    const isLoggedIn=useAuth;
    const toggleMenu=()=>{
        setIsMenuOpen(!isMenuOpen);
    };
    
    return(
        <div className="z-10 menu">
        <button onClick={toggleMenu}
            className={`absolute ${isMenuOpen?'rotate-90':'rotate-0'}`}>
            <IoIosArrowForward className='IoIosArrowForward '/>
        </button>
        {isMenuOpen&&(
            <div className="bg-gray-200 font-p flex flex-col mt-30 z-20 p-1 rounded-sm">
                <Link to="/">home</Link>
                {currentPath==='/login'&& isLoggedIn(
                    <>
                        <Link to="/register">register</Link>
                    </>
                )}
                {currentPath==='/register'&&(
                    <>
                        <Link to="/login">login</Link>
                    </>
                )}
                {isLoggedIn() && currentPath!=='/user' &&(
                    <>
                        <Link to="/user">menu</Link>
                    </>
                )}
                {isLoggedIn()&&(
                    <>
                        <LogoutButton/>
                    </>
                )}
            </div>
        )}
        </div>
    )
}