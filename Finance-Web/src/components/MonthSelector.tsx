import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "../utils/cn";

interface MonthSelectorProps {
    selectedMonth: string;            // O mês atual (vem do pai)
    onMonthChange: (month: string) => void; // A função para mudar o mês (vem do pai)
    className?: string;
    divInsideButtonClassName?: string;
    ioIoArrowDownClassName?: string;
}

export function MonthSelector({selectedMonth, onMonthChange, className, divInsideButtonClassName, ioIoArrowDownClassName}:MonthSelectorProps){
    const[isOpen, setIsOpen]=useState(false);
    const months=["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const handleSelect=(months:string)=>{
        onMonthChange(months);
        setIsOpen(false);
    };

    return(
        <div className={("relative inline-block text-left font-p z-20")}>
            <button type="button" onClick={()=> setIsOpen(!isOpen)} className={cn("h-8 w-35 -mt-2 px-4 flex items-center rounded-md border-gray-300 bg-white text-sm font-medium text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500", className)}>
                <span>
                    {selectedMonth}
                </span>
                <div className={cn("absolute bg-orange-300 p-1 rounded-md ml-23", divInsideButtonClassName)}>
                    <IoIosArrowDown className={cn("h-5 w-5 transition-transform duration-150", isOpen?"rotate-180":"rotate-0", ioIoArrowDownClassName)}/>
                </div>
            </button>
            {isOpen&&(
                <div className="absolute transition-transform transform-200 right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
                    <div className="py-1 ">
                        {months.map((months)=>(
                            <button key={months} onClick={()=>handleSelect(months)} className={`block w-full px-4 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-700 ${selectedMonth===months?"bg-blue-100 text-blue-800 font-bold":"text-gray-700"}`}>
                                {months}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}