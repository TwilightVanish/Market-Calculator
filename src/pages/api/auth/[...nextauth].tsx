"use server";

import NextAuth, {Session, User} from "next-auth"
import EVEOnlineProvider from "next-auth/providers/eveonline";

export const authOptions = {
    providers: [
        EVEOnlineProvider({
            clientId: process.env.EVE_CLIENT_ID as string,
            clientSecret: process.env.EVE_CLIENT_SECRET as string,
        }),
    ],
    options: {
        callbacks: {
            session: async ({ session, user }: { session: Session; user: User }) => {
                if (session && session.user) session.user.name = user.name;
                return session;
            }
        }
    }
}
export default NextAuth(authOptions)