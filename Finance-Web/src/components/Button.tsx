import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";//button used for login and register

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    to?: string;
    variant?:'primary'|'danger';
}

export function Button({className, children, to, onClick, ...props}:ButtonProps){
    const navigate=useNavigate();

    const handleClick=(event:React.MouseEvent<HTMLButtonElement>)=>{
        if(to){
            navigate(to);
        }
        if(onClick){
            onClick(event);
        }
    };

    return(
        <button type="button" onClick={handleClick} className={twMerge("font-p w-20 h-10 bg-blue-500 text-white shadow-blue-500/50 shadow-lg rounded-md transition-all duration-550 hover:scale-108 hover:shadow-xl/100 hover:tracking-wider active:bg-blue-700 active:duration-100 ", className)}
        {...props}
        >
            {children}
        </button>
    );
}