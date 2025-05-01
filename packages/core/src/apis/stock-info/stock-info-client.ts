import { ApiConfig } from "../../config";
import { TokenManager } from "../../auth/token-manager";
import BaseApiClient from "../base-api-client";
import { StockBasicInfo } from "./types";
import { ApiResponse } from "../../types/api";
import { logger } from "../../utils/logger";

/**
 * 종목정보 API 클라이언트
 */
export class StockInfoClient extends BaseApiClient {
  /**
   * 생성자
   * @param config API 설정
   * @param tokenManager 토큰 관리자 (선택 사항)
   */
  constructor(config?: Partial<ApiConfig>, tokenManager?: TokenManager) {
    super(config, tokenManager);
  }

  /**
   * 종목 기본 정보 조회
   * @param code 종목코드
   * @returns 종목 기본 정보
   */
  async getStockBasicInfo(code: string): Promise<ApiResponse<StockBasicInfo>> {
    logger.info(`종목 기본 정보 조회 요청: ${code}`);

    const headers = {
      "api-id": "ka10001", // TR명: 주식기본정보요청
    };

    return this.post<StockBasicInfo>(
      "/api/dostk/stkinfo",
      {
        stk_cd: code, // 거래소별 종목코드 (예: KRX:005930)
      },
      { headers }
    );
  }
}

export default StockInfoClient;
