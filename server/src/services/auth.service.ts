import { PrismaClient, Role, User } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export const exchangeCodeForToken = async (code: string) => {
  const tokenRes = await axios.post(
    "https://oauth2.googleapis.com/token",
    {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
      code,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return tokenRes.data.access_token;
};

export const getGoogleUserInfo = async (accessToken: string) => {
  const userRes = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return userRes.data;
};

export const findOrCreateUser = async (googleUser: any) => {
  let user: User | null = await prisma.user.findUnique({
    where: { googleId: googleUser.id },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        googleId: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        role: Role.ADMIN,
      },
    });
  }

  return user;
};
