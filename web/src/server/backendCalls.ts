// utils/API.js

import axios from "axios";

const newAxios = axios.create({
   headers: {
      authorization: localStorage.getItem("jwt"),
      "content-type": "application/json"
   },
   withCredentials: true 
})
export default class Request {


    CreateArticle = async (data: any, premium: boolean): Promise<any> => {

      console.log(axios)
     try {
      let  route = "/content/add"
      if(premium) route = "/api" + "/premium" + route
      else route = "/api"  + "/fremium" + route

      const ArticlePost = await  newAxios.post(route, data)



      return (await ArticlePost)
     } catch (error) {
         return "error"
     }

    }

    CreateVideo = async (data: any, premium: boolean): Promise<any> => {

       try {
         let  route = "/videos/add"
         if(premium) route = "/api" + "/premium" + route
         else route = "/api" + route
  
         const VideoPost =  newAxios.post(route, data)
  
         return (await VideoPost)
       } catch (error) {
            return "error" 
       }
 
     }

    UpdateArticle = async (data: any, premium: boolean): Promise<any> => {

        try {
         let  route = "/content/update"
         if(premium) route = "/api" + "/premium" + route
         else route = "/api"  + "/fremium" + route

  
         const ArticlePost =  newAxios.put(route, data)
  
         return (await ArticlePost)
  
        } catch (error) {
           console.log(error)
        }
     }
 
    UpdateVideo = async (data: any, premium: boolean): Promise<any> => {
 
        try {
         let  route = "/videos/update"
         if(premium) route = "/api" + "/premium" + route
         else route = "/api" + route
  
         const VideoPost =  newAxios.put(route, data)
  
         return (await VideoPost)
        } catch (error) {
           return "error" 
        }
  
      }

     
    GetArticles = async (premium: boolean): Promise<any> => {

     try {
      let  route = "/content/all"
      if(premium) route = "/api" + "/premium" + route
      else route = "/api"  + "/fremium" + route

      const ArticlePost =  newAxios.get(route)

      return (await ArticlePost)
     } catch (error) {
         return "error"
     }
 
     }

          
    GetOneArticle = async (premium: boolean , id: string ): Promise<any> => {

      try {
       let  route = "/content/one/"
       if(premium) route = "/api" + "/premium" + route
       else route = "/api"  + "/fremium" + route
 
       const ArticlePost =  newAxios.get(route + id)
 
       return (await ArticlePost)
      } catch (error) {
          return "error"
      }
  
      }

 
     GetVideos = async (premium: boolean): Promise<any> => {
 
        try {
         let  route = "/videos/all"
         if(premium) route = "/api" + "/premium" + route
         else route = "/api" + route
  
         const VideoPost =  newAxios.get(route)
  
         return (await VideoPost)
        } catch (error) {
           return "error" 
        }
  
      }
 

      GetOneVideo = async (premium: boolean, id: string): Promise<any> => {
 
         try {
          let  route = "/videos/one/"
          if(premium) route = "/api" + "/premium" + route
          else route = "/api" + route
   
          const VideoPost =  newAxios.get(route + id)
   
          return (await VideoPost)
         } catch (error) {
            return "error" 
         }
   
       }
  
     CreateProduct = async (data: any): Promise<any> => {

       try {
         const ProductPost =  newAxios.post("/api/products/add", data)
 
         return (await ProductPost)
       } catch (error) {
          return "error"
       }
 
     }

     UpdateProduct = async (data: any): Promise<any> => {

   try {
      const ProductPost =  newAxios.put("/api/products/update", data)
 
      return (await ProductPost)
   } catch (error) {
      return "error" 
   }
 
     }

     UpdateUser = async (data: any): Promise<any> => {

      try {
         const userPost =  newAxios.put("/api/users/update", data)
 
         return (await userPost)
      } catch (error) {
         return "error" 
      }
 
     }

  SignUp = async (data: any): Promise<any> => {

        try {
         const userData =  newAxios.post("/api/auth/signup", data)
 
         return (await userData)
  
        } catch (error) {
            return "error"           
        }
     }


     Login = async (data: any): Promise<any> => {

       try {
         const userData =  newAxios.post("/api/auth/login", data)
 
         return (await userData)
       } catch (error) {
          return "error"
       }
 
     }

     GetUsers = async (): Promise<any> => {

        try {
         const AllUsers =  newAxios.get("/api/users/all")
 
         return (await AllUsers)
        } catch (error) {
           return "error" 
        }
 
     }

     Logout = async (): Promise<any> => {
try {
   
   const logout =  newAxios.get("/api/auth/logout")
 
   return (await logout)
} catch (error) {
      return "error" 
}
 
     }

    GetProducts = async (): Promise<any> => {
         try {
            
        const ProductPost =  newAxios.get("/api/products/all")
 
        return (await ProductPost)
 
         } catch (error) {
               return "error"           
         }
     }

     deleteUsers = async (id: string): Promise<any> => {

       try {
         const deleted =  newAxios.delete("/api/users/delete/" + id)
 
         return (await deleted)
       } catch (error) {
          return "error" 
       }
 
     }

     deleteProduct = async (id: string): Promise<any> => {

        try {
         const deleted =  newAxios.delete("/api/products/delete/" + id)
 
         return  (await deleted)
  
        } catch (error) {
         return "error"           
        }
     }

     deleteArticle = async (id: string, premium: boolean): Promise<any> => {

       try {
         let route = "/products/delete/"
         if(premium) route = "/api" + "/premium" + route
         else route = "/api" + route
 
         const deleted =  newAxios.delete(route + id)
  
         return  (await deleted)
  
       } catch (error) {
         return "error"         
       }
     }

     deleteVideo = async (id: string, premium: boolean): Promise<any> => {

     try {
      let route = "/products/delete/"
      if(premium) route = "/api" + "/premium" + route
      else route = "/api" + route
      
      const deleted =  newAxios.delete(route + id)

      return  (await deleted)
     } catch (error) {
        return "error"
     }   
 
     }
} 