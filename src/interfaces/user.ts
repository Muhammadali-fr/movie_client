import { IMovie } from "./movie";

export interface IUser {
    id: string;
    email: string;
    name: string;
    username: string;
    avatar?: string;
    provider: "email" | "google";
    googleId?: string;
    movies?: IMovie[];
    createdAt: Date;
};
