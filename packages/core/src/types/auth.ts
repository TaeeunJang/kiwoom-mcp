/**
 * 인증 토큰 데이터
 */
export interface AuthTokenData {
  /**
   * 접근 토큰
   */
  token: string;

  /**
   * 토큰 타입
   */
  tokenType: string;

  /**
   * 만료 시간 (YYYYMMDDHHMMSS 형식)
   */
  expiresAt: string;
}

/**
 * 토큰 상태 정보
 */
export interface TokenStatus {
  /**
   * 인증된 상태 여부
   */
  isAuthenticated: boolean;

  /**
   * 토큰 만료 임박 여부
   */
  isExpiringSoon: boolean;

  /**
   * 만료 시간 (YYYYMMDDHHMMSS 형식)
   */
  expiresAt?: string;
}
