declare namespace NodeJs{
    export interface ProcessEnv{
        DATABASE_URL: string;
        JWTSECRETKEY: string;
        JWTREFRESHTOKENKEY: string;
    }
}