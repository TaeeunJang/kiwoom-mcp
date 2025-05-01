const kiwoomService = require("../../kiwoomService");
const logger = require("../../../utils/logger");

/**
 * 종목정보 API 서비스 클래스
 */
class StockInfoService {
  /**
   * 종목기본정보 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getStockBasicInfo(params) {
    try {
      logger.info("종목기본정보 조회 요청:", params);
      // 실제 API 엔드포인트로 변경해야 함
      const response = await kiwoomService.get("/stock/info/basic", params);
      return response;
    } catch (error) {
      logger.error("종목기본정보 조회 실패:", error.message);
      throw error;
    }
  }

  /**
   * 종목시간외단일가 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getStockAfterHoursPrice(params) {
    try {
      logger.info("종목시간외단일가 조회 요청:", params);
      // 실제 API 엔드포인트로 변경해야 함
      const response = await kiwoomService.get(
        "/stock/info/after-hours",
        params
      );
      return response;
    } catch (error) {
      logger.error("종목시간외단일가 조회 실패:", error.message);
      throw error;
    }
  }

  /**
   * 종목별투자자기관별동향 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getStockInvestorTrend(params) {
    try {
      logger.info("종목별투자자기관별동향 조회 요청:", params);
      // 실제 API 엔드포인트로 변경해야 함
      const response = await kiwoomService.get(
        "/stock/info/investor-trend",
        params
      );
      return response;
    } catch (error) {
      logger.error("종목별투자자기관별동향 조회 실패:", error.message);
      throw error;
    }
  }

  /**
   * 종목별증권사순매수 조회
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async getStockBrokerBuying(params) {
    try {
      logger.info("종목별증권사순매수 조회 요청:", params);
      // 실제 API 엔드포인트로 변경해야 함
      const response = await kiwoomService.get(
        "/stock/info/broker-buying",
        params
      );
      return response;
    } catch (error) {
      logger.error("종목별증권사순매수 조회 실패:", error.message);
      throw error;
    }
  }
}

module.exports = new StockInfoService();
