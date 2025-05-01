const kiwoomService = require("../../kiwoomService");
const logger = require("../../../utils/logger");

/**
 * 인증 API 서비스 클래스
 */
class AuthService {
  /**
   * 접근 토큰 발급
   * @returns {Promise<Object>} API 응답
   */
  async getToken() {
    try {
      logger.info("접근 토큰 발급 요청");
      await kiwoomService.authenticate();

      return {
        success: true,
        message: "접근 토큰이 성공적으로 발급되었습니다.",
      };
    } catch (error) {
      logger.error("접근 토큰 발급 실패:", error.message);
      throw error;
    }
  }

  /**
   * 접근 토큰 폐기
   * @returns {Promise<Object>} API 응답
   */
  async revokeToken() {
    try {
      logger.info("접근 토큰 폐기 요청");

      // 토큰 폐기 API 호출
      const response = await kiwoomService.post("/oauth2/revoke", {
        token: kiwoomService.accessToken,
      });

      // 토큰 정보 초기화
      kiwoomService.accessToken = null;
      kiwoomService.tokenExpiry = null;

      return {
        success: true,
        message: "접근 토큰이 성공적으로 폐기되었습니다.",
      };
    } catch (error) {
      logger.error("접근 토큰 폐기 실패:", error.message);
      throw error;
    }
  }

  /**
   * 토큰 상태 확인
   * @returns {Promise<Object>} 토큰 상태 정보
   */
  async getTokenStatus() {
    try {
      const isAuthenticated = kiwoomService.accessToken !== null;
      const isExpiringSoon = kiwoomService.isTokenExpiringSoon();

      return {
        success: true,
        data: {
          isAuthenticated,
          isExpiringSoon,
          tokenExpiry: kiwoomService.tokenExpiry,
        },
      };
    } catch (error) {
      logger.error("토큰 상태 확인 실패:", error.message);
      throw error;
    }
  }
}

module.exports = new AuthService();
