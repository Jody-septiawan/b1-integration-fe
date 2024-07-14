import { api } from "@/libs/api";
import { useQuery } from "@tanstack/react-query";

export const useGetFood = ({ isLanding }) => {

  const { data, refetch } = useQuery({
        queryKey: ['get-foods-dashboard', isLanding],
        queryFn: async () => {
            const response = await api.get("/foods");

            return response.data;
        }
    });

    return { data, refetch };
}