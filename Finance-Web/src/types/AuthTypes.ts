export interface LoginUserDTO {
    email: string;
    password?: string;
}

export interface TokenResponse {
    token: string;
}