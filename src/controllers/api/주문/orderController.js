const orderService = require("../../../services/api/주문/orderService");
const logger = require("../../../utils/logger");

/**
 * 주식 주문
 */
exports.placeOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // 필수 파라미터 확인
    if (
      !orderData.accountNo ||
      !orderData.code ||
      !orderData.orderType ||
      !orderData.quantity
    ) {
      return res.status(400).json({
        success: false,
        message: "계좌번호, 종목코드, 주문유형, 수량은 필수 파라미터입니다.",
      });
    }

    const result = await orderService.placeOrder(orderData);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("주식 주문 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 주문 취소
 */
exports.cancelOrder = async (req, res) => {
  try {
    const cancelData = req.body;

    // 필수 파라미터 확인
    if (!cancelData.accountNo || !cancelData.orderNo) {
      return res.status(400).json({
        success: false,
        message: "계좌번호, 주문번호는 필수 파라미터입니다.",
      });
    }

    const result = await orderService.cancelOrder(cancelData);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("주문 취소 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 주문 정정
 */
exports.modifyOrder = async (req, res) => {
  try {
    const modifyData = req.body;

    // 필수 파라미터 확인
    if (
      !modifyData.accountNo ||
      !modifyData.orderNo ||
      (!modifyData.price && !modifyData.quantity)
    ) {
      return res.status(400).json({
        success: false,
        message: "계좌번호, 주문번호, 가격 또는 수량은 필수 파라미터입니다.",
      });
    }

    const result = await orderService.modifyOrder(modifyData);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("주문 정정 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};

/**
 * 주문 가능 금액 조회
 */
exports.getOrderableAmount = async (req, res) => {
  try {
    const params = req.query;

    // 필수 파라미터 확인
    if (!params.accountNo) {
      return res.status(400).json({
        success: false,
        message: "계좌번호는 필수 파라미터입니다.",
      });
    }

    const result = await orderService.getOrderableAmount(params);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    logger.error("주문 가능 금액 조회 중 오류 발생:", error);
    return res.status(500).json({
      success: false,
      message: "서버 오류",
      error: error.message,
    });
  }
};
