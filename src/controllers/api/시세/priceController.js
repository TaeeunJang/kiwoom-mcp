const priceService = require("../../../services/api/시세/priceService");
const logger = require("../../../utils/logger");

/**
 * 현재가 조회
 */
exports.getCurrentPrice = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.code) {
      return res.status(400).json({
        success: false,
        message: "종목코드는 필수 파라미터입니다.",
      });
    }

    const result = await priceService.getCurrentPrice(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("현재가 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 호가 조회
 */
exports.getOrderbook = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.code) {
      return res.status(400).json({
        success: false,
        message: "종목코드는 필수 파라미터입니다.",
      });
    }

    const result = await priceService.getOrderbook(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("호가 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 일봉 조회
 */
exports.getDailyChart = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.code) {
      return res.status(400).json({
        success: false,
        message: "종목코드는 필수 파라미터입니다.",
      });
    }

    const result = await priceService.getDailyChart(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("일봉 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 분봉 조회
 */
exports.getMinuteChart = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.code) {
      return res.status(400).json({
        success: false,
        message: "종목코드는 필수 파라미터입니다.",
      });
    }

    const result = await priceService.getMinuteChart(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("분봉 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 거래량 조회
 */
exports.getVolumeData = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.code) {
      return res.status(400).json({
        success: false,
        message: "종목코드는 필수 파라미터입니다.",
      });
    }

    const result = await priceService.getVolumeData(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("거래량 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};
