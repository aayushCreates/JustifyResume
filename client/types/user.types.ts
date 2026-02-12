
export interface User {
    id?: string;
    name?: string;
    email: string;
    phone?: string;
    avatarUrl?: string;
}

export interface DecodedToken {
    exp: number;
    iat: number;
    id: string;
    email: string;
  }