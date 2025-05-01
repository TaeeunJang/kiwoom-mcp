const stockInfoService = require("../../../services/api/종목정보/stockInfoService");
const logger = require("../../../utils/logger");

/**
 * 종목기본정보 조회
 */
exports.getStockBasicInfo = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.code) {
      return res.status(400).json({
        success: false,
        message: "종목코드는 필수 파라미터입니다.",
      });
    }

    const result = await stockInfoService.getStockBasicInfo(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("종목기본정보 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 종목시간외단일가 조회
 */
exports.getStockAfterHoursPrice = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.code) {
      return res.status(400).json({
        success: false,
        message: "종목코드는 필수 파라미터입니다.",
      });
    }

    const result = await stockInfoService.getStockAfterHoursPrice(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("종목시간외단일가 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 종목별투자자기관별동향 조회
 */
exports.getStockInvestorTrend = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.code) {
      return res.status(400).json({
        success: false,
        message: "종목코드는 필수 파라미터입니다.",
      });
    }

    const result = await stockInfoService.getStockInvestorTrend(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("종목별투자자기관별동향 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 종목별증권사순매수 조회
 */
exports.getStockBrokerBuying = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.code) {
      return res.status(400).json({
        success: false,
        message: "종목코드는 필수 파라미터입니다.",
      });
    }

    const result = await stockInfoService.getStockBrokerBuying(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("종목별증권사순매수 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};
