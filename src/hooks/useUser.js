import { api } from "@/libs/api"
import { useUserStore } from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import React from "react";

export const useUser = () => {
    const router = useRouter();
    const { token, setUser} = useUserStore();

    useQuery({
        enabled: !!token,
        queryKey: ["get-user-info", token],
        queryFn: async () => {
            const response =  await api.get("/auth/check");
            const data = response.data;
            setUser(data);
        }
    });

    React.useEffect(() => {
       const localToken = localStorage.getItem("token");
        if(!localToken) {
            router.push("/login")
        }
    },[])
}