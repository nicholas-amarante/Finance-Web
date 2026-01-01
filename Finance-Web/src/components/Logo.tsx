import {Link} from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface LogoProps{
    className?:string;
    size?:'sm'|'md'|'lg'|'xl';
    whiteMode?:boolean;
}

export function Logo({className, size='md', whiteMode=false}:LogoProps){
    const sizes={
        sm:'text-lg',
        md:'text-2xl',
        lg:'text-4xl',
        xl:'text-6xl',
    };

    return(
        <Link to="/"
        className={twMerge("font-p absolute ml-20 mt-6 z-20", sizes[size], className)}>
            <span className={whiteMode?"text-white":"text-gray-800"}>
                Byte
            </span>
            <span className='text-white'>
                Finance
            </span>
        </Link>
    )
}