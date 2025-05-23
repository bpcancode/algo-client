export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T | null;
  errorMessage: string;
}

export interface LoginRegister {
  username: string;
  password: string;
}

export interface LoggedInUser {
  user: User;
  token: string;
}

export interface User {
  id: number;
  username: string;
}

export interface Visulization {
  id: number;
  title: string;
  userName: string;
  userId: number;
  html: string;
  css: string;
  js: string;
  views: number;
  voteCount: number;
  isVoted: boolean;
  trendScore: number;
  algorithm: string;
}

export interface CreateVisulizationModel {
  title: string;
  html: string;
  css: string;
  js: string;
  algorithmId: number;
}

export type VisulizationFilters = {
  FromDate?: string;
  ToDate?: string;
  IsTrending?: boolean;
  LikeGreaterThan?: number;
  LikeLessThan?: number;
  ViewCountGreaterThan?: number;
  ViewCountLessThan?: number;
  AlgorithmId?: number;
  IsViewsDecending?: boolean;
  IsVoteDecending?: boolean;
};

export type Algorithm = {
  id: number;
  title: string;
}
