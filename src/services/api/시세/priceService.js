const kiwoomService = require("../../kiwoomService");
const logger = require("../../../utils/logger");

/**
 * 시세 API 서비스 클래스
 */
class PriceService {
  /**
   * 현재가 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getCurrentPrice(params) {
    try {
      logger.info("현재가 조회 요청:", params);
      const response = await kiwoomService.get("/price/current", params);
      return response;
    } catch (error) {
      logger.error("현재가 조회 실패:", error.message);
      throw error;
    }
  }

  /**
   * 호가 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getOrderbook(params) {
    try {
      logger.info("호가 조회 요청:", params);
      const response = await kiwoomService.get("/price/orderbook", params);
      return response;
    } catch (error) {
      logger.error("호가 조회 실패:", error.message);
      throw error;
    }
  }

  /**
   * 일봉 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getDailyChart(params) {
    try {
      logger.info("일봉 조회 요청:", params);
      const response = await kiwoomService.get("/price/daily", params);
      return response;
    } catch (error) {
      logger.error("일봉 조회 실패:", error.message);
      throw error;
    }
  }

  /**
   * 분봉 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getMinuteChart(params) {
    try {
      logger.info("분봉 조회 요청:", params);
      const response = await kiwoomService.get("/price/minute", params);
      return response;
    } catch (error) {
      logger.error("분봉 조회 실패:", error.message);
      throw error;
    }
  }

  /**
   * 거래량 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getVolumeData(params) {
    try {
      logger.info("거래량 조회 요청:", params);
      const response = await kiwoomService.get("/price/volume", params);
      return response;
    } catch (error) {
      logger.error("거래량 조회 실패:", error.message);
      throw error;
    }
  }
}

module.exports = new PriceService();
