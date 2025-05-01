import { AuthClient } from "./auth-client";
import { AuthTokenData, TokenStatus } from "../types/auth";
import { logger } from "../utils/logger";
import { parseDateTime } from "../utils/helpers";
import { ApiConfig } from "../config";

/**
 * 토큰 관리자 클래스
 */
export class TokenManager {
  private authClient: AuthClient;
  private token: string | null = null;
  private tokenType: string | null = null;
  private expiresAt: string | null = null;

  /**
   * 생성자
   * @param config API 설정
   */
  constructor(config?: Partial<ApiConfig>) {
    this.authClient = new AuthClient(config);
  }

  /**
   * 접근 토큰 발급 요청
   * @returns 토큰 문자열
   */
  async getToken(): Promise<string> {
    try {
      const tokenData = await this.authClient.getToken();
      this.updateTokenInfo(tokenData);
      return this.token!;
    } catch (error) {
      logger.error("토큰 발급 중 오류 발생", error);
      throw error;
    }
  }

  /**
   * 접근 토큰 상태 확인
   * @returns 토큰 상태 정보
   */
  getTokenStatus(): TokenStatus {
    const isAuthenticated = !!this.token;
    const isExpiringSoon = this.isTokenExpiringSoon();

    return {
      isAuthenticated,
      isExpiringSoon,
      expiresAt: this.expiresAt || undefined,
    };
  }

  /**
   * 접근 토큰 폐기 요청
   * @returns 성공 여부
   */
  async revokeToken(): Promise<boolean> {
    if (!this.token) {
      logger.warn("폐기할 토큰이 없습니다");
      return false;
    }

    try {
      const success = await this.authClient.revokeToken(this.token);
      if (success) {
        this.clearTokenInfo();
      }
      return success;
    } catch (error) {
      logger.error("토큰 폐기 중 오류 발생", error);
      return false;
    }
  }

  /**
   * 토큰을 확인하고 필요한 경우 갱신
   * @returns 유효한 토큰
   */
  async ensureToken(): Promise<string> {
    // 토큰이 없거나 만료 임박한 경우 재발급
    if (!this.token || this.isTokenExpiringSoon()) {
      await this.getToken();
    }
    return this.token!;
  }

  /**
   * 인증 헤더 값 반환
   * @returns 인증 헤더 값
   */
  async getAuthorizationHeader(): Promise<string> {
    const token = await this.ensureToken();
    return `${this.tokenType} ${token}`;
  }

  /**
   * 토큰이 만료 임박했는지 확인
   * @returns 만료 임박 여부
   */
  private isTokenExpiringSoon(): boolean {
    if (!this.expiresAt) return true;

    try {
      const expiryTime = parseDateTime(this.expiresAt);
      const currentTime = new Date();

      // 10분 이내로 만료되면 갱신 필요
      const tenMinutes = 10 * 60 * 1000; // 10분을 밀리초로
      return expiryTime.getTime() - currentTime.getTime() < tenMinutes;
    } catch (error) {
      logger.error("만료 시간 확인 중 오류 발생", error);
      return true; // 오류 발생 시 안전하게 true 반환
    }
  }

  /**
   * 토큰 정보 업데이트
   */
  private updateTokenInfo(tokenData: AuthTokenData): void {
    this.token = tokenData.token;
    this.tokenType = tokenData.tokenType;
    this.expiresAt = tokenData.expiresAt;
    logger.debug("토큰 정보 업데이트됨", { expiresAt: this.expiresAt });
  }

  /**
   * 토큰 정보 초기화
   */
  private clearTokenInfo(): void {
    this.token = null;
    this.tokenType = null;
    this.expiresAt = null;
    logger.debug("토큰 정보 초기화됨");
  }
}

export default TokenManager;
