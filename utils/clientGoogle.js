// Require google from googleapis package.
const { google } = require("googleapis");

function getOauthClient(accessToken) {
  // Require oAuth2 from our google instance.
  var oauth = new google.auth.OAuth2();

  // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
  oauth.setCredentials({
    access_token: accessToken,
  });

  return oauth;
}

const getGoogleClient = async (accessToken) => {
  const authClient = await getOauthClient(accessToken);

  // Create a new calender instance.
  return google.calendar({
    version: "v3",
    auth: authClient,
  });
};

export default getGoogleClient;
