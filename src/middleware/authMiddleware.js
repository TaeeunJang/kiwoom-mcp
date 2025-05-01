const kiwoomService = require("../services/kiwoomService");
const logger = require("../utils/logger");

/**
 * API 요청 인증 확인 미들웨어
 */
exports.ensureAuthenticated = async (req, res, next) => {
  try {
    // 인증이 필요 없는 경로는 통과
    if (
      req.path.startsWith("/api/auth") ||
      req.path === "/health" ||
      req.path === "/"
    ) {
      return next();
    }

    // 토큰 유효성 확인 및 갱신
    const isAuthenticated = await kiwoomService.ensureAuthenticated();

    if (!isAuthenticated) {
      logger.warn("인증되지 않은 API 요청:", req.method, req.path);
      return res.status(401).json({
        success: false,
        message: "인증이 필요합니다. 먼저 토큰을 발급 받으세요.",
      });
    }

    // 인증 성공 시 다음 핸들러로 이동
    next();
  } catch (error) {
    logger.error("인증 미들웨어 오류:", error);
    return res.status(500).json({
      success: false,
      message: "인증 처리 중 오류가 발생했습니다.",
      error: error.message,
    });
  }
};
