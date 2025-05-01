const realtimeService = require("../../../services/api/실시간시세/realtimeService");
const logger = require("../../../utils/logger");

/**
 * 실시간시세 구독
 */
exports.subscribe = async (req, res) => {
  try {
    const params = req.body;

    // 필수 파라미터 확인
    if (!params.code) {
      return res.status(400).json({
        success: false,
        message: "종목코드는 필수 파라미터입니다.",
      });
    }

    const result = await realtimeService.subscribe(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("실시간시세 구독 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 실시간시세 구독 해제
 */
exports.unsubscribe = async (req, res) => {
  try {
    const params = req.body;

    // 필수 파라미터 확인
    if (!params.code) {
      return res.status(400).json({
        success: false,
        message: "종목코드는 필수 파라미터입니다.",
      });
    }

    const result = await realtimeService.unsubscribe(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("실시간시세 구독 해제 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 실시간시세 구독 목록 조회
 */
exports.getSubscriptions = async (req, res) => {
  try {
    const result = await realtimeService.getSubscriptions();
    return res.status(200).json(result);
  } catch (error) {
    logger.error("실시간시세 구독 목록 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};
