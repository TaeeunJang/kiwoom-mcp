import { ApiConfig } from "../../config";
import { TokenManager } from "../../auth/token-manager";
import BaseApiClient from "../base-api-client";
import {
  StockBasicInfo,
  AfterHoursPriceInfo,
  InvestorTrendInfo,
  BrokerBuyingInfo,
} from "./types";
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

  /**
   * 종목 시간외단일가 조회
   * @param code 종목코드
   * @returns 시간외단일가 정보
   */
  async getAfterHoursPrice(
    code: string
  ): Promise<ApiResponse<AfterHoursPriceInfo>> {
    logger.info(`종목 시간외단일가 조회 요청: ${code}`);
    return this.get<AfterHoursPriceInfo>("/stock/info/after-hours", { code });
  }

  /**
   * 종목별 투자자/기관별 동향 조회
   * @param code 종목코드
   * @param startDate 시작일자 (YYYYMMDD)
   * @param endDate 종료일자 (YYYYMMDD)
   * @returns 투자자/기관별 동향 정보
   */
  async getInvestorTrend(
    code: string,
    startDate?: string,
    endDate?: string
  ): Promise<ApiResponse<InvestorTrendInfo[]>> {
    logger.info(
      `종목별 투자자기관별동향 조회 요청: ${code}, ${startDate || "없음"} ~ ${
        endDate || "없음"
      }`
    );

    return this.get<InvestorTrendInfo[]>("/stock/info/investor-trend", {
      code,
      startDate,
      endDate,
    });
  }

  /**
   * 종목별 증권사 순매수 조회
   * @param code 종목코드
   * @param date 날짜 (YYYYMMDD)
   * @returns 증권사 순매수 정보
   */
  async getBrokerBuying(
    code: string,
    date?: string
  ): Promise<ApiResponse<BrokerBuyingInfo>> {
    logger.info(`종목별 증권사 순매수 조회 요청: ${code}, ${date || "오늘"}`);

    return this.get<BrokerBuyingInfo>("/stock/info/broker-buying", {
      code,
      date,
    });
  }
}

export default StockInfoClient;
