const axios = require("axios");
const logger = require("../utils/logger");
const config = require("../config/config");

class KiwoomService {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
    this.apiBaseUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.kiwoom.com"
        : "https://mockapi.kiwoom.com";
  }

  /**
   * OAuth 인증을 통해 접근 토큰을 발급받습니다.
   */
  async authenticate() {
    try {
      logger.info("키움 OAuth 인증 시도 중...");

      const response = await axios.post(
        `${this.apiBaseUrl}/oauth2/token`,
        {
          grant_type: "client_credentials",
          appkey: process.env.KIWOOM_APP_KEY,
          secretkey: process.env.KIWOOM_SECRET_KEY,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );

      if (response.data && response.data.token) {
        this.accessToken = response.data.token;
        this.tokenExpiry = response.data.expires_dt;
        logger.info("키움 OAuth 인증 성공");
        return true;
      } else {
        logger.error("키움 OAuth 인증 실패: 토큰 정보 없음");
        return false;
      }
    } catch (error) {
      logger.error("키움 OAuth 인증 실패:", error.message);
      return false;
    }
  }

  /**
   * 토큰이 유효한지 확인하고 필요시 갱신합니다.
   */
  async ensureAuthenticated() {
    // 토큰이 없거나 만료 임박한 경우 재인증
    if (!this.accessToken || this.isTokenExpiringSoon()) {
      await this.authenticate();
    }
    return !!this.accessToken;
  }

  /**
   * 토큰 만료가 임박했는지 확인합니다.
   */
  isTokenExpiringSoon() {
    if (!this.tokenExpiry) return true;

    // 토큰 만료 시간 파싱 (YYYYMMDDHHMMSS 형식)
    const year = this.tokenExpiry.substring(0, 4);
    const month = this.tokenExpiry.substring(4, 6) - 1; // 월은 0-11
    const day = this.tokenExpiry.substring(6, 8);
    const hour = this.tokenExpiry.substring(8, 10);
    const minute = this.tokenExpiry.substring(10, 12);
    const second = this.tokenExpiry.substring(12, 14);

    const expiryTime = new Date(year, month, day, hour, minute, second);
    const currentTime = new Date();

    // 만료 10분 전이면 갱신 필요
    const tenMinutes = 10 * 60 * 1000; // 10분을 밀리초로
    return expiryTime.getTime() - currentTime.getTime() < tenMinutes;
  }

  /**
   * API 요청을 수행합니다.
   * @param {string} method - HTTP 메서드 (GET, POST 등)
   * @param {string} endpoint - API 엔드포인트
   * @param {Object} data - 요청 데이터 (선택사항)
   * @returns {Promise<Object>} API 응답
   */
  async request(method, endpoint, data = null) {
    await this.ensureAuthenticated();

    try {
      const url = `${this.apiBaseUrl}${endpoint}`;
      logger.debug(`API 요청: ${method} ${url}`);

      const options = {
        method,
        url,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      };

      if (data) {
        if (method.toUpperCase() === "GET") {
          options.params = data;
        } else {
          options.data = data;
        }
      }

      const response = await axios(options);
      return response.data;
    } catch (error) {
      logger.error(`API 요청 실패 (${method} ${endpoint}):`, error.message);
      if (error.response) {
        logger.error("응답 데이터:", error.response.data);
      }
      throw error;
    }
  }

  /**
   * GET 요청을 수행합니다.
   * @param {string} endpoint - API 엔드포인트
   * @param {Object} params - 요청 파라미터 (선택사항)
   * @returns {Promise<Object>} API 응답
   */
  async get(endpoint, params = null) {
    return this.request("GET", endpoint, params);
  }

  /**
   * POST 요청을 수행합니다.
   * @param {string} endpoint - API 엔드포인트
   * @param {Object} data - 요청 데이터
   * @returns {Promise<Object>} API 응답
   */
  async post(endpoint, data) {
    return this.request("POST", endpoint, data);
  }
}

module.exports = new KiwoomService();
