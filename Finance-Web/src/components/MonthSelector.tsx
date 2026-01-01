import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export function MonthSelector(){
    const[isOpen, setIsOpen]=useState(false);
    const[selectMonth, setSelectMonth]=useState("Janeiro");
    const months=["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
}