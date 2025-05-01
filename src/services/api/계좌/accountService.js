const kiwoomService = require("../../kiwoomService");
const logger = require("../../../utils/logger");

/**
 * 계좌 API 서비스 클래스
 */
class AccountService {
  /**
   * 계좌 목록 조회
   * @returns {Promise<Object>} API 응답
   */
  async getAccountList() {
    try {
      logger.info("계좌 목록 조회 요청");
      const response = await kiwoomService.get("/account/list");
      return response;
    } catch (error) {
      logger.error("계좌 목록 조회 실패:", error.message);
      throw error;
    }
  }

  /**
   * 계좌 잔고 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getAccountBalance(params) {
    try {
      logger.info("계좌 잔고 조회 요청:", params);
      const response = await kiwoomService.get("/account/balance", params);
      return response;
    } catch (error) {
      logger.error("계좌 잔고 조회 실패:", error.message);
      throw error;
    }
  }

  /**
   * 계좌 수익률 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getAccountProfit(params) {
    try {
      logger.info("계좌 수익률 조회 요청:", params);
      const response = await kiwoomService.get("/account/profit", params);
      return response;
    } catch (error) {
      logger.error("계좌 수익률 조회 실패:", error.message);
      throw error;
    }
  }

  /**
   * 주문 내역 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getOrderHistory(params) {
    try {
      logger.info("주문 내역 조회 요청:", params);
      const response = await kiwoomService.get(
        "/account/order-history",
        params
      );
      return response;
    } catch (error) {
      logger.error("주문 내역 조회 실패:", error.message);
      throw error;
    }
  }

  /**
   * 체결 내역 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getTradeHistory(params) {
    try {
      logger.info("체결 내역 조회 요청:", params);
      const response = await kiwoomService.get(
        "/account/trade-history",
        params
      );
      return response;
    } catch (error) {
      logger.error("체결 내역 조회 실패:", error.message);
      throw error;
    }
  }
}

module.exports = new AccountService();
