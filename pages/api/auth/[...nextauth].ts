import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
// import GithubProvider from "next-auth/providers/github"
// import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    {
      id: "steady",
      name: "Steady",
      type: "oauth",
      // scope: "read",
      // client_id: process.env.STEADY_CLIENT_ID,
      // client_secret: process.env.STEADY_CLIENT_SECRET,
      // redirect_uri: process.env.STEADY_REDIRECT_URI,
      // grant_type: "authorization_code",
      authorization: "https://steadyhq.com/oauth/authorize",
      token: "https://steadyhq.com/oauth/token",
      userinfo: "https://steadyhq.com/api/v1/user",
      profile(profile) {
        return {
          id: profile.id,
          email: profile?.email,
        }
      },
    }
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
}

export default NextAuth(authOptions)
