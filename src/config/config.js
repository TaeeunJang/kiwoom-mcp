require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
  kiwoomApiUrl: process.env.KIWOOM_API_URL || "http://localhost:8080",
  kiwoomUserId: process.env.KIWOOM_USER_ID,
  kiwoomUserPw: process.env.KIWOOM_USER_PW,
};
