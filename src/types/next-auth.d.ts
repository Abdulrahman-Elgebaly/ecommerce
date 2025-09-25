import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {




    interface User{
        user:{
            name:sring,
            email:sring,
            role:string
        }
        token:string
    }
}

    interface Session {
    user:User['user']
    }




    import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
   user:User['user'],

  }
}
