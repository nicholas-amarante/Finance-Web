export function useAuth(){
    const token=localStorage.getItem('tokenJwt');
    return !!token;
}