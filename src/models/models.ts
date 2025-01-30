export interface ApiResponse<T> {
    isSuccess: boolean;
    data: T | null;
    errorMessage: string;
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
  