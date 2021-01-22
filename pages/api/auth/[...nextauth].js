import NextAuth from "next-auth";
import { addMinutes } from "date-fns";

const authoriseDomain = (email) => {
  const listDomain = ["@gmail.com"];
  const verified = listDomain.find((item) => email.endsWith(item));

  if (verified) return true;
  else return false;
};

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    {
      id: "google",
      name: "Google",
      type: "oauth",
      version: "2.0",
      scope: process.env.SCOPE,
      params: {
        grant_type: process.env.GRANT_TYPE,
      },
      accessTokenUrl: process.env.ACCESS_TOKEN_URL,
      requestTokenUrl: process.env.REQUEST_TOKEN_URL,
      authorizationUrl: process.env.AUTHORIZATION_URL,
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profileUrl: process.env.PROFILE_URL,
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
    maxAge: 1 * 1 * 30 * 60, // 30 min
    updateAge: 1 * 15 * 60, // 15 min
  },
  callbacks: {
    signIn: async (user, account, profile) => {
      if (
        account.provider === "google" &&
        profile.verified_email === true &&
        authoriseDomain(profile.email) === true
      ) {
        return Promise.resolve(true);
      } else {
        return Promise.reject("/accessDenied");
      }
    },
    session: async (session, user) => {
      if (
        addMinutes(new Date(user?.auth_time), 30).getTime() >
        new Date().getTime()
      ) {
        session.accessToken = user?.accessToken;
        return Promise.resolve(session);
      } else return Promise.reject();
    },
    jwt: async (token, user, account) => {
      const isSignIn = user ? true : false;

      if (isSignIn) {
        token.auth_time = new Date().getTime();
        token.accessToken = account?.accessToken;
      }
      return Promise.resolve(token);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
