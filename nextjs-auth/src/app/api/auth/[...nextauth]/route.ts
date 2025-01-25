import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {Backend_URL} from "@/lib/Constants";
import {JWT} from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT>{
        const res = await fetch(Backend_URL + "/auth/refresh", {
            method: "POST",
            headers: {
                authorization: `Refresh ${token.backendTokens?.refreshToken}`,
            },
        });
        console.log("token params: ", token);
        const response = await res.json();
        console.log("token of reshed: ", response);
        return {
            ...token,
            backendTokens: response.backendTokens,
        }
    }

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: " text",
                    placeholder: "Enter username",
                },
                password: { label :"Password", type: "password"}
            },
            async authorize(credentials, req){

                if (!credentials?.username || !credentials?.password) return null;
                const {username, password} = credentials;
                const res = await fetch(Backend_URL+ "/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (res.status === 401) {
                    console.log(res.statusText);

                    return null;
                }
                const user = await res.json();
                return user;
            }
        })
    ],

    callbacks:{
        async jwt({token,user}){
           console.log({token,user});
           if(user) return { ...token, ...user};

            // Access token is not expired
            if (new Date().getTime() < token.backendTokens.expiresIn) return token;

            // Access token expired
            return await refreshToken(token);
        },

        async session({token, session}){
            session.user = token.user;
            session.backendTokens = token.backendTokens;

            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};