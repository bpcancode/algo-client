import { ApiResponse, LoggedInUser, LoginRegister, Visulization, VisulizationFilters } from "../models/models";
import api from "../utils/api";

export const fetchVisulizations = async (filters: VisulizationFilters   ): Promise<ApiResponse<Visulization[]>> => {
  const response = await api.get<ApiResponse<Visulization[]>>("/visualization", {params: filters});
  return response.data;
};

export const fetchVisulization = async (id: Number  ): Promise<ApiResponse<Visulization>> => {
  const response = await api.get<ApiResponse<Visulization>>("/visualization/" + id);
  return response.data;
};

export const login = async (user: LoginRegister  ): Promise<ApiResponse<LoggedInUser>> => {
  const response = await api.post<ApiResponse<LoggedInUser>>("/signin/", user );
  return response.data;
};

export const register = async (user: LoginRegister  ): Promise<ApiResponse<LoggedInUser>> => {
  const response = await api.post<ApiResponse<LoggedInUser>>("/signup/", user );
  return response.data;
};


