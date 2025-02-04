import { Algorithm, ApiResponse, CreateVisulizationModel, LoggedInUser, LoginRegister, Visulization, VisulizationFilters } from "../models/models";
import api from "../utils/api";

export const fetchVisulizations = async (filters: VisulizationFilters   ): Promise<ApiResponse<Visulization[]>> => {
  const response = await api.get<ApiResponse<Visulization[]>>("/visualization", {params: filters});
  return response.data;
};

export const fetchVisulization = async (id: Number  ): Promise<ApiResponse<Visulization>> => {
  const response = await api.get<ApiResponse<Visulization>>("/visualization/" + id);
  return response.data;
};

export const createVisulization = async (vis: CreateVisulizationModel  ): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>("/visualization/", vis );
  return response.data;
};

export const likeVisulization = async (id: number  ): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>("/visualization/" + id + "/like");
  return response.data;
}

export const fetchAlgorithms = async (): Promise<ApiResponse<Algorithm[]>> => {
  const response = await api.get<ApiResponse<Algorithm[]>>("/algorithm/");
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


