const kiwoomService = require("../../kiwoomService");
const logger = require("../../../utils/logger");

/**
 * 주문 API 서비스 클래스
 */
class OrderService {
  /**
   * 주식 주문
   * @param {Object} orderData - 주문 데이터
   * @returns {Promise<Object>} API 응답
   */
  async placeOrder(orderData) {
    try {
      logger.info("주식 주문 요청:", orderData);
      const response = await kiwoomService.post("/order/stock", orderData);
      return response;
    } catch (error) {
      logger.error("주식 주문 실패:", error.message);
      throw error;
    }
  }

  /**
   * 주문 취소
   * @param {Object} cancelData - 취소 데이터
   * @returns {Promise<Object>} API 응답
   */
  async cancelOrder(cancelData) {
    try {
      logger.info("주문 취소 요청:", cancelData);
      const response = await kiwoomService.post("/order/cancel", cancelData);
      return response;
    } catch (error) {
      logger.error("주문 취소 실패:", error.message);
      throw error;
    }
  }

  /**
   * 주문 정정
   * @param {Object} modifyData - 정정 데이터
   * @returns {Promise<Object>} API 응답
   */
  async modifyOrder(modifyData) {
    try {
      logger.info("주문 정정 요청:", modifyData);
      const response = await kiwoomService.post("/order/modify", modifyData);
      return response;
    } catch (error) {
      logger.error("주문 정정 실패:", error.message);
      throw error;
    }
  }

  /**
   * 주문 가능 금액 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getOrderableAmount(params) {
    try {
      logger.info("주문 가능 금액 조회 요청:", params);
      const response = await kiwoomService.get(
        "/order/orderable-amount",
        params
      );
      return response;
    } catch (error) {
      logger.error("주문 가능 금액 조회 실패:", error.message);
      throw error;
    }
  }
}

module.exports = new OrderService();
