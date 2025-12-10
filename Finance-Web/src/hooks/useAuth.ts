export function useAuth(p0?: unknown){
    const token=localStorage.getItem('tokenJwt');
    return !!token;
}