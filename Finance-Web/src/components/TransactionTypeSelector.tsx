import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "../utils/cn";

interface TransactionTypeSelectorProps {
    selectedType: string;
    onTypeChange: (type: string) => void;
    className?:string;
}

export function TransactionTypeSelector({selectedType, onTypeChange}:TransactionTypeSelectorProps){
    return(
        <select 
        value={selectedType}
        onChange={(e)=>onTypeChange(e.target.value)}
        className="bg-white"
        >
            <option value="ALL">Todos</option>
            <option value="INCOME">Receita</option>
            <option value="EXPENSE">Despesa</option>
        </select>
    );
}