import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface SelectProps extends ComponentProps<'select'> {
    options?: { value: string; label: string }[];
}

export function Select({ className, options, children, ...props }: SelectProps) {
    return (
        <select 
            className={twMerge(
                "appearance-none bg-gray-300 h-12 rounded-lg text-lg sm:w-12/12 lg:w-12/12 xl:w-1/1 pt-4 pl-2 text-gray-800 transition-all duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-black/25 focus:bg-gray-400",
                "bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234B5563%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.2rem_1.2rem] bg-[position:right_1rem_center] bg-no-repeat",
                
                className
            )}
            {...props}
        >
            {options ? (
                <>
                    <option value="" disabled>Selecione uma conta</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </>
            ) : (
                children
            )}
        </select>
    );
}