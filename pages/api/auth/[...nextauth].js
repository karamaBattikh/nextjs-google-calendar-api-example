import NextAuth from "next-auth";

const checkDomain = (email) => {
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
  callbacks: {
    signIn: async (user, account, profile) => {
      if (
        account.provider === "google" &&
        profile.verified_email === true &&
        checkDomain(profile.email) === true
      ) {
        return Promise.resolve(true);
      } else {
        return Promise.reject("/accessDenied");
      }
    },
    session: async (session, user) => {
      session.accessToken = user?.accessToken;
      return Promise.resolve(session);
    },
    jwt: async (token) => {
      return Promise.resolve(token);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
