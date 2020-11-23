// utils/API.js

import axios from "axios";


axios.defaults.headers["authorization"] = localStorage.authToken || null
axios.defaults.withCredentials = true

export default class Request {


    CreateArticle = async (data: any, premium: boolean): Promise<any> => {

      console.log(axios)
     try {
      let  route = "/content/add"
      if(premium) route = "/api" + "/premium" + route
      else route = "/api"  + "/fremium" + route

      const ArticlePost = await  axios({
         url: "https://sawafitness.herokuapp.com" + route,
         method: "post",
         data: data,
         headers: {
            "authorization": localStorage.authToken || null ,
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
            url: "https://sawafitness.herokuapp.com" + route,
            method: "post",
            data: data,
            headers: {
               "authorization": localStorage.authToken || null ,
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
            url: "https://sawafitness.herokuapp.com" + route,
            method: "put",
            data: data,
            headers: {
               "authorization": localStorage.authToken || null ,
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
            url: "https://sawafitness.herokuapp.com" + route,
            method: "put",
            data: data,
            headers: {
               "authorization": localStorage.authToken || null ,
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
            url: "https://sawafitness.herokuapp.com" + route,
            method: "get",
            headers: {
               "authorization": localStorage.authToken || null ,
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
            url: "https://sawafitness.herokuapp.com" + route + id,
            method: "get",
            headers: {
               "authorization": localStorage.authToken || null ,
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
            url: "https://sawafitness.herokuapp.com" + route,
            method: "get",
            headers: {
               "authorization": localStorage.authToken || null ,
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
            url: "https://sawafitness.herokuapp.com" + route + id,
            method: "get",
            headers: {
               "authorization": localStorage.authToken || null ,
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
         const ProductPost =  axios.post("https://sawafitness.herokuapp.com/api/products/add", data , {
            headers: {
               "authorization": localStorage.authToken || null
            }
         })
 
         return (await ProductPost)
       } catch (error) {
          return "error"
       }
 
     }

     UpdateProduct = async (data: any): Promise<any> => {

   try {
      const ProductPost =  axios.put("https://sawafitness.herokuapp.com/api/products/update", data , {
         headers: {
            "authorization": localStorage.authToken || null
         }
      })
 
      return (await ProductPost)
   } catch (error) {
      return "error" 
   }
 
     }

   
     createMealPlan = async (data: any): Promise<any> => {

      try {
        const ProductPost =  axios.post("https://sawafitness.herokuapp.com/api/plans/add", data , {
           headers: {
              "authorization": localStorage.authToken || null
           }
        })

        return (await ProductPost)
      } catch (error) {
         return "error"
      }

    }

    UpdateMealpPlan = async (data: any): Promise<any> => {

  try {
     const ProductPost =  axios.put("https://sawafitness.herokuapp.com/api/plans/update", data , {
        headers: {
           "authorization": localStorage.authToken || null
        }
     })

     return (await ProductPost)
  } catch (error) {
     return "error" 
  }

    }


   UpdateUser = async (data: any): Promise<any> => {
      console.log(data)
      try {
         const userPost = axios.put("https://sawafitness.herokuapp.com/api/users/update", data , {
            headers: {
               "authorization": localStorage.authToken || null
            }
         })
 
         return (await userPost)
      } catch (error) {
         return "error" 
      }
 
     }

  SignUp = async (data: any): Promise<any> => {

        try {
         const userData = await axios.post( "https://sawafitness.herokuapp.com/api/auth/signup", {newUser: data} )
         
         console.log(userData, data)

         return (userData)
  
        } catch (error) {
            return "error"           
        }
     }


     Login = async (data: any): Promise<any> => {

       try {
         const userData = await  axios({
            url: "https://sawafitness.herokuapp.com" + "/api/auth/login",
            method: "post",
            data: data,
            headers: {
               "authorization": localStorage.authToken || null ,
               "Content-Type": "application/json",
               "Accept": "application/json"
            }
         })

         return userData
       } catch (error) {
          return "error"
       }
 
     }

     AdminLogin = async (data: any): Promise<any> => {

      try {
        const userData = await  axios({
           url: "https://sawafitness.herokuapp.com" + "/api/auth/login",
           method: "post",
           data: data,
           headers: {
              "authorization": localStorage.authToken || null ,
              "Content-Type": "application/json",
              "Accept": "application/json"
           }
        })
        
       if(Number(userData.data.role) < 4 ) {
          return "error"
       } else {
          return userData.data
       }
      } catch (error) {
         return "error"
      }

    }

     GetUsers = async (): Promise<any> => {

        try {
         const AllUsers =   await  axios({
            url: "https://sawafitness.herokuapp.com" + "/api/users/all",
            method: "get",
            headers: {
               "authorization": localStorage.authToken || null ,
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
   
   const logout =  axios.get("https://sawafitness.herokuapp.com/api/auth/logout")

   localStorage.clear()
   window.location.reload()

   return (await logout)
} catch (error) {
      return "error" 
}
 
     }

    GetProducts = async (): Promise<any> => {
         try {
            
        const ProductPost =  axios.get("https://sawafitness.herokuapp.com/api/products/all")
 
        return (await ProductPost)
 
         } catch (error) {
               return "error"           
         }
     }

     getMealPlans = async (): Promise<any> => {
      try {
         
     const ProductPost =  axios.get("https://sawafitness.herokuapp.com/api/plans/all")

     return (await ProductPost)

      } catch (error) {
            return "error"           
      }
  }

     getReviews = async (id: string): Promise<any> => {
      try {
         
     const ProductPost =  axios.get("https://sawafitness.herokuapp.com/api/reviews/all/" + id)

     return (await ProductPost)

      } catch (error) {
            return "error"           
      }
  }

  
  addReview = async (id: string, review: any): Promise<any> => {
   try {

  const ProductPost =  await axios.post("https://sawafitness.herokuapp.com/api/reviews/add/" + id, {comment: review} , {
   headers: {
      "authorization": localStorage.authToken || null ,
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

  const ProductPost =  await axios.post("https://sawafitness.herokuapp.com/api/orders/add/" , {product: data} , {
   headers: {
      "authorization": localStorage.authToken || null ,
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

  const ProductPost =  await axios.get("https://sawafitness.herokuapp.com/api/orders/all/", {
     headers: {
        "authorization": localStorage.authToken || null
     }
  })


  return (ProductPost)

   } catch (error) {
         return "error"           
   }
}


     GetOneProducts = async (id: string ): Promise<any> => {
      try {
         
     const ProductPost =  axios.get("https://sawafitness.herokuapp.com/api/products/one/" + id)

     return (await ProductPost)

      } catch (error) {
            return "error"           
      }
  }

  GetOneMealPlan = async (id: string ): Promise<any> => {
   try {
      
  const ProductPost =  axios.get("https://sawafitness.herokuapp.com/api/plans/one/" + id)

  return (await ProductPost)

   } catch (error) {
         return "error"           
   }
}

     deleteUsers = async (id: string): Promise<any> => {

       try {
         const deleted =  axios.delete("https://sawafitness.herokuapp.com/api/users/delete/" + id, {
            headers: {
               "authorization": localStorage.authToken || null
            }
         })
 
         return (await deleted)
       } catch (error) {
          return "error" 
       }
 
     }

     deleteProduct = async (id: string): Promise<any> => {

        try {
         const deleted =  axios.delete("https://sawafitness.herokuapp.com/api/products/delete/" + id , {
            headers: {
               "authorization": localStorage.authToken || null
            }
         })
 
         return  (await deleted)
  
        } catch (error) {
         return "error"           
        }
     }

     deleteMealPlan = async (id: string): Promise<any> => {

      try {
       const deleted =  axios.delete("https://sawafitness.herokuapp.com/api/plans/delete/" + id , {
          headers: {
             "authorization": localStorage.authToken || null
          }
       })

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
 
         const deleted =  axios.delete("https://sawafitness.herokuapp.com" + route + id , {
            headers: {
               "authorization": localStorage.authToken || null
            }
         })
  
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
      
      const deleted = axios.delete("https://sawafitness.herokuapp.com" + route + id , {
         headers: {
            "authorization": localStorage.authToken || null
         }
      })

      return  (await deleted)
     } catch (error) {
        return "error"
     }   
 
     }
} 