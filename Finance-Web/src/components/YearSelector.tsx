import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "../utils/cn";

interface YearSelectorProps{
    selectedYear:number;
    onYearChange:(year:number)=>void;
    className?:string;
    divInsideButtonClassName?:string;
    ioIoArrowDownClassName?:string;
}

export function YearSelector({selectedYear, onYearChange, className, divInsideButtonClassName, ioIoArrowDownClassName}: YearSelectorProps){
    const [isOpen, setIsOpen]=useState(false);
    const generatedYears=()=>{
        const currentYear=new Date().getFullYear();
        const years=[];
        for(let i=currentYear+1; i>=currentYear-10; i--){
            years.push(i);
        }
        return years;
    };

    const years=generatedYears();

    const handleSelect=(years:number)=>{
        onYearChange(years);
        setIsOpen(false);
    };

    return(
        <div className="relative inline-block text-left font-p z-20">
            <button type="button" onClick={()=> setIsOpen(!isOpen)} className={cn("h-8 w-35 -mt-2 px-4 flex items-center  rounded-md border-gray-300 bg-white text-sm font-medium text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500", className)}>
                <span>
                    {selectedYear}
                </span>
                <div className={cn("absolute bg-orange-300 p-1 rounded-md ml-23", divInsideButtonClassName)}>
                    <IoIosArrowDown className={cn("h-5 w-5 transition-transform duration-150", isOpen?"rotate-180":"rotate-0", ioIoArrowDownClassName)} />
                </div>
            </button>
            {isOpen&&(
                <div className="absolute transition-transform transform-200 right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
                    <div className="py-1">
                        {years.map((years)=>(
                            <button key={years} onClick={()=>handleSelect(years)} className={`block w-full px-4 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-700 ${selectedYear===years?"bg-blue-100 text-blue-800 font-bold":"text-gray-700"}`}>
                                {years}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}