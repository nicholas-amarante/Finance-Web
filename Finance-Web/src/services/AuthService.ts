import api from './api';

// Tipagem para os dados de cadastro
export interface RegisterDTO {
    name: string;
    cpf: string;
    email: string;
    password: string;
    role: 'ROLE_ADMIN' | 'ROLE_CUSTOM'; // Geralmente o front manda CUSTOM por padrão
}

export interface LoginDTO {
    email: string;
    password?: string;
}

export interface TokenResponse {
    token: string;
}

export const AuthService = {
    login: async (credentials: LoginDTO): Promise<string> => {
        try {
            const response = await api.post<TokenResponse>('/user/login', credentials);
            if (response.data.token) {
                localStorage.setItem('meu_token_jwt', response.data.token);
                return response.data.token;
            } else {
                throw new Error("Token não recebido");
            }
        } catch (error: any) {
            console.error("Erro no login:", error);
            throw new Error(error.response?.data?.message || "Falha ao conectar no servidor");
        }
    },

    // --- NOVA FUNÇÃO DE REGISTRO ---
    register: async (data: RegisterDTO): Promise<void> => {
        try {
            // Remove caracteres não numéricos do CPF antes de enviar
            const cleanData = { ...data, cpf: data.cpf.replace(/\D/g, '') };
            await api.post('/user/register', cleanData);
        } catch (error: any) {
            console.error("Erro no cadastro:", error);
            throw new Error(error.response?.data?.message || "Falha ao criar conta.");
        }
    },

    logout: () => {
        localStorage.removeItem('meu_token_jwt');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('meu_token_jwt');
    }
};