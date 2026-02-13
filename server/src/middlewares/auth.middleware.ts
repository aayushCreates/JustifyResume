import { FastifyRequest, FastifyReply } from "fastify";
import { validateToken } from "../utils/auth.utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isUserLoggedIn = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    let token: string | undefined = undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7, authHeader.length);
    } else if (req.cookies.token) {
      token = req.cookies.token;
    } else if (req.query && (req.query as any).token) {
      token = (req.query as any).token as string;
    }

    if (!token) {
      return reply.status(401).send({
        success: false,
        message: "Token not provided.",
      });
    }

    const validToken = await validateToken(token as string);
    if (!validToken) {
      return reply.status(401).send({
        success: false,
        message: "Session Expired, please login",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: validToken.email },
    });

    if (!user) {
      return reply.status(401).send({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ success: false, message: "Server error" });
  }
};
