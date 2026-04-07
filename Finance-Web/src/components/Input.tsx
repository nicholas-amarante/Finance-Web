import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentProps<'input'> {}

export function Input({className , type='text', ...props}:InputProps){
    return(
        <input
        type={type}
        className={twMerge("bg-gray-300 h-12 px-4 rounded-lg sm:w-12/12 lg4 pl-:w-12/12 xl:w-1/1 pt-2 text-lg focus:outline-none focus:ring-1 focus:ring-black/25 transition-all duration-300 ease-in-out focus:bg-gray-400")}
        {...props}
        />
    );
}