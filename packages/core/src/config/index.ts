import dotenv from "dotenv";

// .env 파일 로드
dotenv.config();

/**
 * API 환경 설정
 */
export interface ApiConfig {
  /**
   * API 베이스 URL
   */
  baseUrl: string;

  /**
   * 앱 키
   */
  appKey: string;

  /**
   * 시크릿 키
   */
  secretKey: string;

  /**
   * 타임아웃 (ms)
   */
  timeout: number;
}

/**
 * 기본 API 설정
 */
export const defaultConfig: ApiConfig = {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://api.kiwoom.com"
      : "https://mockapi.kiwoom.com",
  appKey: process.env.KIWOOM_APP_KEY || "",
  secretKey: process.env.KIWOOM_SECRET_KEY || "",
  timeout: 10000,
};

/**
 * API 설정 생성 함수
 */
export function createApiConfig(config: Partial<ApiConfig> = {}): ApiConfig {
  return {
    ...defaultConfig,
    ...config,
  };
}

export default {
  createApiConfig,
  defaultConfig,
};
