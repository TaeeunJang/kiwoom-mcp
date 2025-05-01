const accountService = require("../../../services/api/계좌/accountService");
const logger = require("../../../utils/logger");

/**
 * 계좌 목록 조회
 */
exports.getAccountList = async (req, res) => {
  try {
    const result = await accountService.getAccountList();
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("계좌 목록 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 계좌 잔고 조회
 */
exports.getAccountBalance = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.accountNo) {
      return res.status(400).json({
        success: false,
        message: "계좌번호는 필수 파라미터입니다.",
      });
    }

    const result = await accountService.getAccountBalance(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("계좌 잔고 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 계좌 수익률 조회
 */
exports.getAccountProfit = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.accountNo) {
      return res.status(400).json({
        success: false,
        message: "계좌번호는 필수 파라미터입니다.",
      });
    }

    const result = await accountService.getAccountProfit(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("계좌 수익률 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 주문 내역 조회
 */
exports.getOrderHistory = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.accountNo) {
      return res.status(400).json({
        success: false,
        message: "계좌번호는 필수 파라미터입니다.",
      });
    }

    const result = await accountService.getOrderHistory(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("주문 내역 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 체결 내역 조회
 */
exports.getTradeHistory = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.accountNo) {
      return res.status(400).json({
        success: false,
        message: "계좌번호는 필수 파라미터입니다.",
      });
    }

    const result = await accountService.getTradeHistory(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("체결 내역 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};
