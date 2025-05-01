import axios, { AxiosInstance } from "axios";
import { ApiConfig, defaultConfig } from "../config";
import { logger } from "../utils/logger";
import { AuthTokenData } from "../types/auth";

/**
 * OAuth 인증 클라이언트
 */
export class AuthClient {
  private config: ApiConfig;
  private httpClient: AxiosInstance;

  /**
   * 생성자
   * @param config API 설정
   */
  constructor(config: Partial<ApiConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.httpClient = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  }

  /**
   * 접근 토큰 발급 요청
   * @returns 인증 토큰 데이터
   */
  async getToken(): Promise<AuthTokenData> {
    try {
      logger.info("접근 토큰 발급 요청");

      const response = await this.httpClient.post("/oauth2/token", {
        grant_type: "client_credentials",
        appkey: this.config.appKey,
        secretkey: this.config.secretKey,
      });

      if (!response.data || !response.data.token) {
        throw new Error("토큰 정보가 없습니다");
      }

      const tokenData: AuthTokenData = {
        token: response.data.token,
        tokenType: response.data.token_type || "bearer",
        expiresAt: response.data.expires_dt,
        returnCode: response.data.return_code,
        returnMsg: response.data.return_msg,
      };

      logger.info("접근 토큰 발급 성공");
      return tokenData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error("접근 토큰 발급 실패", {
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        logger.error("접근 토큰 발급 중 오류 발생", error);
      }
      throw error;
    }
  }

  /**
   * 접근 토큰 폐기 요청
   * @param token 폐기할 토큰
   * @returns 성공 여부
   */
  async revokeToken(token: string): Promise<boolean> {
    try {
      logger.info("접근 토큰 폐기 요청");

      const response = await this.httpClient.post("/oauth2/revoke", {
        token,
      });

      logger.info("접근 토큰 폐기 성공", response.data);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error("접근 토큰 폐기 실패", {
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        logger.error("접근 토큰 폐기 중 오류 발생", error);
      }
      return false;
    }
  }
}

export default AuthClient;
