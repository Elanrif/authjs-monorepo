declare namespace NodeJs{
    export interface ProcessEnv{
        DATABASE_URL: string;
        JWT_SECRET_KEY: string;
        JWT_REFRESH_TOKEN_KEY: string;
    }
}