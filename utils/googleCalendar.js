// Require google from googleapis package.
const { google } = require("googleapis");

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth;

// Create a new instance of oAuth and set our Client ID & Client Secret.
const oAuth2Client = new OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET
);

// Call the setCredentials method on our oAuth2Client instance and set our refresh token.
oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

// Create a new calender instance.
export default google.calendar({
  version: "v3",
  auth: oAuth2Client,
});
