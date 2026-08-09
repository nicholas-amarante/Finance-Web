import { cn } from "../utils/cn";

interface TransactionTypeSelectorProps {
    selectedType: string;
    onTypeChange: (type: string) => void;
    className?:string;
}

export function TransactionTypeSelector({selectedType, onTypeChange, className}:TransactionTypeSelectorProps){
    return(
        <select 
        value={selectedType}
        onChange={(e)=>onTypeChange(e.target.value as 'ALL' | 'INCOME' | 'EXPENSE')}
        className={cn("bg-white", className)}
        >
            <option value="ALL">Todos</option>
            <option value="INCOME">Receita</option>
            <option value="EXPENSE">Despesa</option>
        </select>
    );
}