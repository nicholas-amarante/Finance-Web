import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

interface TransactionCategoriesSelectorProps {
    selectedCategory: string;
    onCategoryChange: (type: string) => void;
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

                // Ajuste a URL para o seu endpoint de categorias no Java
                const response = await fetch('http://localhost:8080/api/categories', { method: 'GET', headers });

                if (response.ok) {
                    const data = await response.json();
                    // Suporta tanto retorno em Array direto quanto paginado (.content)
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
        <div className={`flex flex-row ${className}`}>
            <div className="-mt-1.5">
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    disabled={loadingCategories}
                    className="bg-white text-gray-700 text-xs font-semibold rounded-xl px-3 py-1.5 border border-gray-200 shadow-sm focus:outline-none cursor-pointer disabled:opacity-50"
                >
                    <option value="ALL">
                        {loadingCategories ? "Carregando..." : "Todas as Categorias"}
                    </option>
                    
                    {categories.map((cat) => (
                        <option value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
