import { ApiConfig } from "../../config";
import { TokenManager } from "../../auth/token-manager";
import BaseApiClient from "../base-api-client";
import { StockQuoteInfo } from "./types";
import { RealtimeApiId } from "./constants";
import { ApiResponse } from "../../types/api";
import { logger } from "../../utils/logger";

/**
 * 실시간 시세 API 클라이언트
 */
export class RealtimeClient extends BaseApiClient {
  /**
   * 생성자
   * @param config API 설정
   * @param tokenManager 토큰 관리자 (선택 사항)
   */
  constructor(config?: Partial<ApiConfig>, tokenManager?: TokenManager) {
    super(config, tokenManager);
  }

  /**
   * 주식호가 정보 조회
   * @param code 종목코드 (예: KRX:005930, NXT:039490_NX, SOR:039490_AL)
   * @param contYn 연속조회여부 (Y/N)
   * @param nextKey 연속조회키
   * @returns 주식호가 정보
   */
  async getStockQuote(
    code: string,
    contYn?: string,
    nextKey?: string
  ): Promise<ApiResponse<StockQuoteInfo>> {
    logger.info(`주식호가 정보 조회 요청: ${code}, 연속조회: ${contYn || "N"}`);

    // 요청 헤더 설정
    const headers: Record<string, string> = {
      "api-id": RealtimeApiId.STOCK_QUOTE, // TR명: 주식호가요청
    };

    // 연속 조회 관련 헤더 설정
    if (contYn === "Y" && nextKey) {
      headers["cont-yn"] = contYn;
      headers["next-key"] = nextKey;
    }

    // 주식 호가 정보 요청
    return this.post<StockQuoteInfo>(
      "/api/dostk/mrkcond",
      {
        stk_cd: code, // 거래소별 종목코드
      },
      { headers }
    );
  }

  /**
   * 일별 주가 정보 조회
   * @param code 종목코드 (예: KRX:005930, NXT:039490_NX, SOR:039490_AL)
   * @param contYn 연속조회여부 (Y/N)
   * @param nextKey 연속조회키
   * @returns 일별 주가 정보
   */
  async getDailyStockPrice(
    code: string,
    contYn?: string,
    nextKey?: string
  ): Promise<ApiResponse<any>> {
    logger.info(
      `일별 주가 정보 조회 요청: ${code}, 연속조회: ${contYn || "N"}`
    );

    // 요청 헤더 설정
    const headers: Record<string, string> = {
      "api-id": RealtimeApiId.DAILY_STOCK_PRICE, // TR명: 일별주가요청
    };

    // 연속 조회 관련 헤더 설정
    if (contYn === "Y" && nextKey) {
      headers["cont-yn"] = contYn;
      headers["next-key"] = nextKey;
    }

    // 일별 주가 정보 요청
    return this.post(
      "/api/dostk/mrkcond",
      {
        stk_cd: code, // 거래소별 종목코드
      },
      { headers }
    );
  }

  /**
   * 시간외 단일가 정보 조회
   * @param code 종목코드 (예: KRX:005930, NXT:039490_NX, SOR:039490_AL)
   * @param contYn 연속조회여부 (Y/N)
   * @param nextKey 연속조회키
   * @returns 시간외 단일가 정보
   */
  async getAfterHoursPrice(
    code: string,
    contYn?: string,
    nextKey?: string
  ): Promise<ApiResponse<any>> {
    logger.info(
      `시간외 단일가 정보 조회 요청: ${code}, 연속조회: ${contYn || "N"}`
    );

    // 요청 헤더 설정
    const headers: Record<string, string> = {
      "api-id": RealtimeApiId.AFTER_HOURS_PRICE, // TR명: 시간외단일가요청
    };

    // 연속 조회 관련 헤더 설정
    if (contYn === "Y" && nextKey) {
      headers["cont-yn"] = contYn;
      headers["next-key"] = nextKey;
    }

    // 시간외 단일가 정보 요청
    return this.post(
      "/api/dostk/mrkcond",
      {
        stk_cd: code, // 거래소별 종목코드
      },
      { headers }
    );
  }

  /**
   * 체결강도 시간별 추이 조회
   * @param code 종목코드 (예: KRX:005930, NXT:039490_NX, SOR:039490_AL)
   * @param contYn 연속조회여부 (Y/N)
   * @param nextKey 연속조회키
   * @returns 체결강도 시간별 추이 정보
   */
  async getHourlyTradingStrength(
    code: string,
    contYn?: string,
    nextKey?: string
  ): Promise<ApiResponse<any>> {
    logger.info(
      `체결강도 시간별 추이 조회 요청: ${code}, 연속조회: ${contYn || "N"}`
    );

    // 요청 헤더 설정
    const headers: Record<string, string> = {
      "api-id": RealtimeApiId.HOURLY_TRADING_STRENGTH, // TR명: 체결강도추이시간별요청
    };

    // 연속 조회 관련 헤더 설정
    if (contYn === "Y" && nextKey) {
      headers["cont-yn"] = contYn;
      headers["next-key"] = nextKey;
    }

    // 체결강도 시간별 추이 정보 요청
    return this.post(
      "/api/dostk/mrkcond",
      {
        stk_cd: code, // 거래소별 종목코드
      },
      { headers }
    );
  }
}

export default RealtimeClient;
