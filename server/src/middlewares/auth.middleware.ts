import { FastifyRequest, FastifyReply } from "fastify";
import { validateToken } from "../utils/auth.utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isUserLoggedIn = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const token = req.cookies.token;

    const validToken = await validateToken(token as string);
    if (!validToken) {
      return res.status(401).send({
        success: false,
        message: "Session Expired, please login",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: validToken.email },
    });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
  } catch (err) {
    console.error(err);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};