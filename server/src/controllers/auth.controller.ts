import { FastifyReply, FastifyRequest } from "fastify";
import {
  exchangeCodeForToken,
  findOrCreateUser,
  getGoogleUserInfo,
} from "../services/auth.service";
import { getJWT } from "../utils/auth.utils";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

export const redirectGoogleAuth = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID as string,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI as string,
      response_type: "code",
      scope: "openid email profile",
    });

    return reply.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  } catch (err: any) {
    console.error("GoogleAuth Controller ERROR:", err.message);
    return reply.status(500).send({ success: false, message: err.message || "Server error" });
  }
};

export const callbackGoogleAuth = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { code } = req.query as { code?: string };

    if (!code) return reply.status(400).send("No code provided");

    const accessToken = await exchangeCodeForToken(code);
    const googleUser = await getGoogleUserInfo(accessToken);
    const user = await findOrCreateUser(googleUser);

    const token = await getJWT(user.id, user.email);

    return reply.setCookie("token", token, cookieOptions).redirect(`${process.env.FRONTEND_URL}/home`);
  } catch (err: any) {
    console.error("GoogleAuth Controller ERROR:", err.message);
    return reply.status(500).send({ success: false, message: err.message || "Server error" });
  }
};

export const logout = async (req: FastifyRequest, reply: FastifyReply) => {
  return reply.clearCookie("token", { path: "/" }).status(200).send({ success: true });
};
