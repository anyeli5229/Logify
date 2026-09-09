import { getUser } from "@/services/AuthService"
import { useQuery } from "@tanstack/react-query"

export const useAuth = () => {
    const token = localStorage.getItem("AUTH_TOKEN");
    const { data, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        enabled: !!token,
        retry: 1,
        refetchOnWindowFocus: false
    });

    return { data, isLoading, isError } 
} 