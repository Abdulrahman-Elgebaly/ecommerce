'use server'
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

interface TokenPayload {
  token: string;
}

export async function getUserToken(): Promise<string | null> {
  const cookiesData = await cookies(); 
  const encryptToken = cookiesData.get('next-auth.session-token')?.value ?? null;

  if (!encryptToken) return null;

  const data = await decode({ token: encryptToken, secret: process.env.NEXTAUTH_SECRET! }) as TokenPayload | null;

  return data?.token ?? null;
}
