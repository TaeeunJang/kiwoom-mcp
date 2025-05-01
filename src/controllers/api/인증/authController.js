const authService = require("../../../services/api/인증/authService");
const logger = require("../../../utils/logger");

/**
 * 접근 토큰 발급
 */
exports.getToken = async (req, res) => {
  try {
    const result = await authService.getToken();
    return res.status(200).json(result);
  } catch (error) {
    logger.error("접근 토큰 발급 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 접근 토큰 폐기
 */
exports.revokeToken = async (req, res) => {
  try {
    const result = await authService.revokeToken();
    return res.status(200).json(result);
  } catch (error) {
    logger.error("접근 토큰 폐기 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 토큰 상태 확인
 */
exports.getTokenStatus = async (req, res) => {
  try {
    const result = await authService.getTokenStatus();
    return res.status(200).json(result);
  } catch (error) {
    logger.error("토큰 상태 확인 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};
