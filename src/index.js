const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");
const config = require("./config/config");
const apiRoutes = require("./routes/api/apiRoutes");
const kiwoomService = require("./services/kiwoomService");
const authMiddleware = require("./middleware/authMiddleware");

// Express 앱 초기화
const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 로깅 미들웨어
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// 인증 미들웨어 적용
app.use(authMiddleware.ensureAuthenticated);

// API 라우트 설정
app.use("/api", apiRoutes);

// 건강 체크 엔드포인트
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// 루트 경로
app.get("/", (req, res) => {
  res.status(200).json({
    message: "키움증권 OpenAPI MCP 서버",
    version: "1.0.0",
    docs: "/api-docs",
  });
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  logger.error("서버 오류:", err);
  res.status(500).json({
    success: false,
    message: "서버 오류가 발생했습니다",
    error: err.message,
  });
});

// 서버 시작
const PORT = config.port;
app.listen(PORT, async () => {
  logger.info(`서버가 포트 ${PORT}에서 실행 중입니다`);

  // 키움 서비스 초기화 (OAuth 인증)
  try {
    await kiwoomService.authenticate();
    logger.info("키움 OAuth 인증이 완료되었습니다");
  } catch (error) {
    logger.error("키움 OAuth 인증 실패:", error);
  }
});

// 정상 종료 처리
process.on("SIGINT", async () => {
  logger.info("서버 종료 중...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("서버 종료 중...");
  process.exit(0);
});
