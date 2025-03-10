import axios, { AxiosResponse } from 'axios';
import axiosClient from '.';

export const authenticateGoogle = (): Promise<AxiosResponse> => {
    return axiosClient.get(`/auth/google`);
};
export const getAllPosts = (limit:number,offset:number,userId:string): Promise<AxiosResponse> => {
    return axiosClient.get(`/posts/get-all?limit=${limit}&offset=${offset}&userId=${userId}`);
};
export const addPost = (payload:any): Promise<AxiosResponse> => {
    return axiosClient.post(`/posts/create`,payload);
};
export const updatePost = (payload:any): Promise<AxiosResponse> => {
    return axiosClient.put(`/posts/update`,payload);
};
export const getPostById = (id:number): Promise<AxiosResponse> => {
    return axiosClient.get(`/posts/getPostById?id=${id}`);
};
export const deletePost = (id:number): Promise<AxiosResponse> => {
    return axiosClient.delete(`/posts/delete?id=${id}`);
};
export const logout = (): Promise<AxiosResponse> => {
    return axiosClient.post(`/auth/logout`);
};