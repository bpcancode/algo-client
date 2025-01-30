import { ApiResponse, Visulization, VisulizationFilters } from "../models/models";
import api from "../utils/api";

export const fetchVisulizations = async (filters: VisulizationFilters   ): Promise<ApiResponse<Visulization[]>> => {
  const response = await api.get<ApiResponse<Visulization[]>>("/visualization", {params: filters});
  return response.data;
};
