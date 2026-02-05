import jwt, { JwtPayload } from 'jsonwebtoken';

export const getJWT = async (id: string, email: string)=> {
    const secretKey = process.env.JWT_SECRET as string;
    const jwtToken = jwt.sign({ id, email }, secretKey, { expiresIn: '7d' });

    return jwtToken;
}

export const validateToken = async (token: string)=> {
    const secretKey = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    return {
        id: decoded?.id as string,
        email: decoded?.email as string
    }
}