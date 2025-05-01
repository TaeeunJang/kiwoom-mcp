const kiwoomService = require("../../kiwoomService");
const logger = require("../../../utils/logger");

/**
 * 실시간시세 API 서비스 클래스
 */
class RealtimeService {
  constructor() {
    this.subscriptions = new Map();
  }

  /**
   * 실시간시세 구독
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async subscribe(params) {
    try {
      logger.info("실시간시세 구독 요청:", params);
      const response = await kiwoomService.post("/realtime/subscribe", params);

      // 구독 정보 저장
      if (response.success && params.code) {
        this.subscriptions.set(params.code, {
          type: params.type || "tick",
          timestamp: new Date(),
        });
      }

      return response;
    } catch (error) {
      logger.error("실시간시세 구독 실패:", error.message);
      throw error;
    }
  }

  /**
   * 실시간시세 구독 해제
   * @param {Object} params - 요청 파라미터
   * @returns {Promise<Object>} API 응답
   */
  async unsubscribe(params) {
    try {
      logger.info("실시간시세 구독 해제 요청:", params);
      const response = await kiwoomService.post(
        "/realtime/unsubscribe",
        params
      );

      // 구독 정보 삭제
      if (response.success && params.code) {
        this.subscriptions.delete(params.code);
      }

      return response;
    } catch (error) {
      logger.error("실시간시세 구독 해제 실패:", error.message);
      throw error;
    }
  }

  /**
   * 실시간시세 구독 목록 조회
   * @returns {Promise<Object>} 구독 목록
   */
  async getSubscriptions() {
    try {
      const subscriptionList = [];

      this.subscriptions.forEach((value, key) => {
        subscriptionList.push({
          code: key,
          type: value.type,
          timestamp: value.timestamp,
        });
      });

      return {
        success: true,
        data: {
          subscriptions: subscriptionList,
          count: subscriptionList.length,
        },
      };
    } catch (error) {
      logger.error("실시간시세 구독 목록 조회 실패:", error.message);
      throw error;
    }
  }
}

module.exports = new RealtimeService();
