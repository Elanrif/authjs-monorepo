import NextAuth from "next-auth";

declare module "next-auth" {

    interface Session {
        user: {
            id: number;
            email: string;
            name: string;
         };
        backendTokens: {
            accessToken: string;
            refreshToken: string;
        }
    }
}