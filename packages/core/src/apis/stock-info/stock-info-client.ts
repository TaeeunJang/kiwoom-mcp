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
   * @param contYn 연속조회여부
   * @param nextKey 연속조회키
   * @returns 종목 기본 정보
   */
  async getStockBasicInfo(
    code: string,
    contYn?: string,
    nextKey?: string
  ): Promise<ApiResponse<StockBasicInfo>> {
    logger.info(
      `종목 기본 정보 조회 요청: ${code}, 연속조회: ${contYn || "N"}`
    );

    // 요청 헤더 설정
    const headers: Record<string, string> = {
      "api-id": "ka10001", // TR명: 주식기본정보요청
    };

    // 연속 조회 관련 헤더 설정
    if (contYn === "Y" && nextKey) {
      headers["cont-yn"] = contYn;
      headers["next-key"] = nextKey;
    }

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
