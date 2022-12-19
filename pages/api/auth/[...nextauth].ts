import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
// import GithubProvider from "next-auth/providers/github"
// import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  debug: true,
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
      clientId: process.env.STEADY_CLIENT_ID,
      clientSecret: process.env.STEADY_CLIENT_SECRET,
      client: { token_endpoint_auth_method: "client_secret_post" },
      authorization: {
        url: "https://steadyhq.com/oauth/authorize",
        params: {
          response_type: "code",
          clientId: process.env.STEADY_CLIENT_ID,
          redirect_uri: process.env.STEADY_REDIRECT_URI,
          scope: "read",
          state: "FakeRandomString", // TODO: generate a random string
        },
      },
      token: "https://steadyhq.com/api/v1/oauth/token",
      userinfo: "https://steadyhq.com/api/v1/users/me",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
        };
      },
    },
    // {
    //   id: "steady",
    //   name: "steady",
    //   type: "oauth",
    //   idToken: true,
    //   authorization: {
    //     url: "https://steadyhq.com/oauth/authorize",
    //     params: {
    //       response_type: "code",
    //       clientId: process.env.STEADY_CLIENT_ID,
    //       redirect_uri: process.env.STEADY_REDIRECT_URI,
    //       scope: "read",
    //       state: "FakeRandomString", // TODO: generate a random string
    //     },
    //   },
    //   token: {
    //     url: "https://steadyhq.com/api/v1/oauth/token",
    //     params: {
    //       clientId: process.env.STEADY_CLIENT_ID,
    //       client_secret: process.env.STEADY_CLIENT_SECRET,
    //       grant_type: "authorization_code",
    //       code: "AUTHORIZATION_CODE", // TODO: get this from the request
    //       redirect_uri: process.env.STEADY_REDIRECT_URI,
    //     },
    //   },
    //   userinfo: "https://steadyhq.com/api/v1/users/me",
    //   clientId: process.env.STEADY_CLIENT_ID,
    //   clientSecret: process.env.STEADY_CLIENT_SECRET,
    //   profile(profile) {
    //     return {
    //       id: profile.id,
    //     };
    //   },
    // },
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
};

export default NextAuth(authOptions);
