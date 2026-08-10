import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

interface TransactionCategoriesSelectorProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    className?:string;
}

interface Category{
    name:string;
}

export function TransactionCategoriesSelector({
    selectedCategory,
    onCategoryChange,
    className=""
}: TransactionCategoriesSelectorProps){
    const [categories, setCategories]=useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories]=useState<boolean>(true);

    useEffect(()=>{
        const carregarCategorias = async () => {
            try {
                const token = localStorage.getItem('tokenJwt');
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };

                const response = await fetch('http://localhost:8080/api/category', { method: 'GET', headers });

                if (response.ok) {
                    const data = await response.json();
                    const lista = Array.isArray(data) ? data : (data.content || []);
                    setCategories(lista);
                } else {
                    console.error("Erro ao buscar categorias:", response.status);
                }
            } catch (erro) {
                console.error("Erro de conexão ao buscar categorias:", erro);
            } finally {
                setLoadingCategories(false);
            }
        };

        carregarCategorias();
    }, []);
    

    return (
        <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            disabled={loadingCategories}
            className={cn("bg-white", className)}
        >
            <option value="ALL">
                {loadingCategories ? "Carregando..." : "Todas as Categorias"}
            </option>
            
            {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                    {cat.name}
                </option>
            ))}
        </select>
    );
}
