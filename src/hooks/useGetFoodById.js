import { api } from "@/libs/api";
import { useQuery } from "@tanstack/react-query";

export const useGetFoodById = ({ id }) => {

  const { data } = useQuery({
        enabled: !!id,
        queryKey: ['get-foods-dashboard', id],
        queryFn: async () => {
            const response = await api.get(`/foods/${id}`);

            return response.data;
        }
    });

    return {data}   
}