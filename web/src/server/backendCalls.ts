// utils/API.js

import axios from "axios";

export default class Request {

    Api  = axios.create({
        baseURL: "localhost:3400",
        responseType: "json"
      });
    
    

    CreateArticle = async (data: any, premium: boolean): Promise<any> => {

       let  route = "/api/content/add"
       if(premium) route = "/premium" + route

       const ArticlePost =  this.Api.post(route, data)

       return (await ArticlePost).data

    }

    CreateVideo = async (data: any, premium: boolean): Promise<any> => {

        let  route = "/api/video/add"
        if(premium) route = "/premium" + route
 
        const VideoPost =  this.Api.post(route, data)
 
        return (await VideoPost).data
 
     }

    UpdateArticle = async (data: any, premium: boolean): Promise<any> => {

        let  route = "/api/content/update"
        if(premium) route = "/premium" + route
 
        const ArticlePost =  this.Api.put(route, data)
 
        return (await ArticlePost).data
 
     }
 
    UpdateVideo = async (data: any, premium: boolean): Promise<any> => {
 
         let  route = "/api/video/update"
         if(premium) route = "/premium" + route
  
         const VideoPost =  this.Api.put(route, data)
  
         return (await VideoPost).data
  
      }

     
    GetArticles = async (premium: boolean): Promise<any> => {

        let  route = "/api/content/all"
        if(premium) route = "/premium" + route
 
        const ArticlePost =  this.Api.get(route)
 
        return (await ArticlePost).data
 
     }
 
     GetVideos = async (premium: boolean): Promise<any> => {
 
         let  route = "/api/video/all"
         if(premium) route = "/premium" + route
  
         const VideoPost =  this.Api.get(route)
  
         return (await VideoPost).data
  
      }
 
     CreateProduct = async (data: any): Promise<any> => {

        const ProductPost =  this.Api.post("/api/products/add", data)
 
        return (await ProductPost).data
 
     }

     UpdateProduct = async (data: any): Promise<any> => {

        const ProductPost =  this.Api.put("/api/products/update", data)
 
        return (await ProductPost).data
 
     }

     UpdateUser = async (data: any): Promise<any> => {

        const userPost =  this.Api.put("/api/users/update", data)
 
        return (await userPost).data
 
     }

  SignUp = async (data: any): Promise<any> => {

        const userData =  this.Api.post("/api/auth/signup", data)
 
        return (await userData).status
 
     }


     Login = async (data: any): Promise<any> => {

        const userData =  this.Api.post("/api/auth/signup", data)
 
        return (await userData).status
 
     }

     GetUsers = async (): Promise<any> => {

        const AllUsers =  this.Api.get("/api/users/all")
 
        return (await AllUsers).data
 
     }

     Logout = async (): Promise<any> => {

        const logout =  this.Api.get("/api/auth/logout")
 
        return (await logout).status 
 
     }

    GetProducts = async (): Promise<any> => {

        const ProductPost =  this.Api.get("/api/products/all")
 
        return (await ProductPost).data
 
     }

     deleteUsers = async (id: string): Promise<any> => {

        const deleted =  this.Api.delete("/api/users/delete/" + id)
 
        return (await deleted).status 
 
     }

     deleteProduct = async (id: string): Promise<any> => {

        const deleted =  this.Api.delete("/api/products/delete/" + id)
 
        return  (await deleted).status 
 
     }

     deleteArticle = async (id: string, premium: boolean): Promise<any> => {

        let route = "/api/products/delete/"
        if(premium) route = "/premium" + route

        const deleted =  this.Api.delete(route + id)
 
        return  (await deleted).status 
 
     }

     deleteVideo = async (id: string, premium: boolean): Promise<any> => {

        let route = "/api/products/delete/"
        if(premium) route = "/premium" + route
        
        const deleted =  this.Api.delete(route + id)
 
        return  (await deleted).status 
 
     }
} 