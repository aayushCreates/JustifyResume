import { Report } from "@prisma/client";
import 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        user: {
            id?: string
            email: string
            role?: string
            googleId: string
            reports?: Report[]
          } | null
    }
}

