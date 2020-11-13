// utils/API.js

import axios from "axios";

axios.defaults.withCredentials = true
export default class Request {


    CreateArticle = async (data: any, premium: boolean): Promise<any> => {

      console.log(axios)
     try {
      let  route = "/content/add"
      if(premium) route = "/api" + "/premium" + route
      else route = "/api"  + "/fremium" + route

      const ArticlePost = await  axios({
         url: "http://localhost:3000" + route,
         method: "post",
         data: data,
         headers: {
             "Content-Type": "application/json",
             "Accept": "application/json"
         }
      })



      return ArticlePost
     } catch (error) {
         return "error"
     }

    }

    CreateVideo = async (data: any, premium: boolean): Promise<any> => {

       try {
         let  route = "/videos/add"
         if(premium) route = "/api" + "/premium" + route
         else route = "/api" + route
  
         const VideoPost = await  axios({
            url: "http://localhost:3000" + route,
            method: "post",
            data: data,
            headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"
            }
         })
  
         return VideoPost
       } catch (error) {
            return "error" 
       }
 
     }

    UpdateArticle = async (data: any, premium: boolean): Promise<any> => {

        try {
         let  route = "/content/update"
         if(premium) route = "/api" + "/premium" + route
         else route = "/api"  + "/fremium" + route

  
         const ArticlePost = await  axios({
            url: "http://localhost:3000" + route,
            method: "put",
            data: data,
            headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"
            }
         })
  
         return ArticlePost
  
        } catch (error) {
           console.log(error)
        }
     }
 
    UpdateVideo = async (data: any, premium: boolean): Promise<any> => {
 
        try {
         let  route = "/videos/update"
         if(premium) route = "/api" + "/premium" + route
         else route = "/api" + route
  
         const VideoPost = await  axios({
            url: "http://localhost:3000" + route,
            method: "put",
            data: data,
            headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"
            }
         })
  
         return VideoPost
        } catch (error) {
           return "error" 
        }
  
      }

     
    GetArticles = async (premium: boolean): Promise<any> => {

     try {
      let  route = "/content/all"
      if(premium) route = "/api" + "/premium" + route
      else route = "/api"  + "/fremium" + route

      const ArticlePost = await  axios({
            url: "http://localhost:3000" + route,
            method: "get",
            headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"
            }
         })

      return ArticlePost
     } catch (error) {
         return "error"
     }
 
     }

          
    GetOneArticle = async (premium: boolean , id: string ): Promise<any> => {

      try {
       let  route = "/content/one/"
       if(premium) route = "/api" + "/premium" + route
       else route = "/api"  + "/fremium" + route
 
       const ArticlePost =   await  axios({
            url: "http://localhost:3000" + route + id,
            method: "get",
            headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"
            }
         })
 
       return ArticlePost
      } catch (error) {
          return "error"
      }
  
      }

 
     GetVideos = async (premium: boolean): Promise<any> => {
 
        try {
         let  route = "/videos/all"
         if(premium) route = "/api" + "/premium" + route
         else route = "/api" + route
  
         const VideoPost = await  axios({
            url: "http://localhost:3000" + route,
            method: "get",
            headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"
            }
         })
  
         return VideoPost
        } catch (error) {
           return "error" 
        }
  
      }
 

      GetOneVideo = async (premium: boolean, id: string): Promise<any> => {
 
         try {
          let  route = "/videos/one/"
          if(premium) route = "/api" + "/premium" + route
          else route = "/api" + route
   
          const VideoPost =  axios({
            url: "http://localhost:3000" + route + id,
            method: "get",
            headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"
            }
         })
   
          return (await VideoPost)
         } catch (error) {
            return "error" 
         }
   
       }

     
  
  
     CreateProduct = async (data: any): Promise<any> => {

       try {
         const ProductPost =  axios.post("http://localhost:3000/api/products/add", data)
 
         return (await ProductPost)
       } catch (error) {
          return "error"
       }
 
     }

     UpdateProduct = async (data: any): Promise<any> => {

   try {
      const ProductPost =  axios.put("http://localhost:3000/api/products/update", data)
 
      return (await ProductPost)
   } catch (error) {
      return "error" 
   }
 
     }


     UpdateUser = async (data: any): Promise<any> => {

      try {
         const userPost = axios.put("http://localhost:3000/api/users/update", data)
 
         return (await userPost)
      } catch (error) {
         return "error" 
      }
 
     }

  SignUp = async (data: any): Promise<any> => {

        try {
         const userData =  axios.post( "http://localhost:3000/api/auth/signup", data)
 
         return (await userData)
  
        } catch (error) {
            return "error"           
        }
     }


     Login = async (data: any): Promise<any> => {

       try {
         const userData = await  axios({
            url: "http://localhost:3000" + "/api/auth/login",
            method: "post",
            data: data,
            headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"
            }
         })
          
         return userData
       } catch (error) {
          return "error"
       }
 
     }

     GetUsers = async (): Promise<any> => {

        try {
         const AllUsers =   await  axios({
            url: "http://localhost:3000" + "/api/users/all",
            method: "get",
            headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"
            }
         })
          
         return AllUsers
        } catch (error) {
           return "error" 
        }
 
     }

     Logout = async (): Promise<any> => {
try {
   
   const logout =  axios.get("http://localhost:3000/api/auth/logout")
 
   return (await logout)
} catch (error) {
      return "error" 
}
 
     }

    GetProducts = async (): Promise<any> => {
         try {
            
        const ProductPost =  axios.get("http://localhost:3000/api/products/all")
 
        return (await ProductPost)
 
         } catch (error) {
               return "error"           
         }
     }

     getReviews = async (id: string): Promise<any> => {
      try {
         
     const ProductPost =  axios.get("http://localhost:3000/api/reviews/all/" + id)

     return (await ProductPost)

      } catch (error) {
            return "error"           
      }
  }

  
  addReview = async (id: string, review: any): Promise<any> => {
   try {

  const ProductPost =  await axios.post("http://localhost:3000/api/reviews/add/" + id, {comment: review} , {
   headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
   }
  })


  return (ProductPost)

   } catch (error) {
         return "error"           
   }
}

CreateAnOrder = async ( data: any): Promise<any> => {
   try {

  const ProductPost =  await axios.post("http://localhost:3000/api/orders/add/" , {product: data} , {
   headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
   }
  })


  return (ProductPost)

   } catch (error) {
         return "error"           
   }
}


GetAllOrders = async (): Promise<any> => {
   try {

  const ProductPost =  await axios.get("http://localhost:3000/api/orders/all/")


  return (ProductPost)

   } catch (error) {
         return "error"           
   }
}


     GetOneProducts = async (id: string ): Promise<any> => {
      try {
         
     const ProductPost =  axios.get("http://localhost:3000/api/products/one/" + id)

     return (await ProductPost)

      } catch (error) {
            return "error"           
      }
  }

     deleteUsers = async (id: string): Promise<any> => {

       try {
         const deleted =  axios.delete("http://localhost:3000/api/users/delete/" + id)
 
         return (await deleted)
       } catch (error) {
          return "error" 
       }
 
     }

     deleteProduct = async (id: string): Promise<any> => {

        try {
         const deleted =  axios.delete("http://localhost:3000/api/products/delete/" + id)
 
         return  (await deleted)
  
        } catch (error) {
         return "error"           
        }
     }

     deleteArticle = async (id: string, premium: boolean): Promise<any> => {

       try {
         let route = "/content/delete/"
         if(premium) route = "/api" + "/premium" + route
         else route = "/api" + "/fremium" + route
 
         const deleted =  axios.delete("http://localhost:3000" + route + id)
  
         return  (await deleted)
  
       } catch (error) {
         return "error"         
       }
     }

     deleteVideo = async (id: string, premium: boolean): Promise<any> => {

     try {
      let route = "/videos/delete/"
      if(premium) route = "/api" + "/premium" + route
      else route = "/api" + route
      
      const deleted = axios.delete("http://localhost:3000" + route + id)

      return  (await deleted)
     } catch (error) {
        return "error"
     }   
 
     }
} 