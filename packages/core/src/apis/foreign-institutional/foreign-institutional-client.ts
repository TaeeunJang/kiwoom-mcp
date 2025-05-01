import { BaseApiClient } from "../base-api-client";
import { TokenManager } from "../../auth/token-manager";
import { ApiConfig } from "../../config";
import { ApiResponse } from "../../types/api";
import { logger } from "../../utils/logger";
import { ForeignInstitutionalApiId } from "./constants";
import {
  StockForeignInvestorTrend,
  InstitutionalInvestorInfo,
  ContinuousTradingStatus,
} from "./types";

/**
 * 기관/외국인 API 클라이언트
 */
export class ForeignInstitutionalClient extends BaseApiClient {
  /**
   * 생성자
   * @param config API 설정
   * @param tokenManager 토큰 관리자
   */
  constructor(config: Partial<ApiConfig> = {}, tokenManager?: TokenManager) {
    super(config, tokenManager);
  }

  /**
   * 외국인 종목별 매매동향 조회
   * @param code 종목코드
   * @param startDate 시작일자 (YYYYMMDD)
   * @param endDate 종료일자 (YYYYMMDD)
   * @returns 외국인 종목별 매매동향 정보
   */
  async getForeignInvestorTrend(
    code: string,
    startDate?: string,
    endDate?: string
  ): Promise<ApiResponse<StockForeignInvestorTrend>> {
    const endpoint = "/uapi/domestic-stock/v1/trading/foreign-institutional";

    logger.info("외국인 종목별 매매동향 조회 요청", {
      code,
      startDate,
      endDate,
    });

    // 현재 날짜 기준으로 기본값 설정
    const today = new Date();
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}${month}${day}`;
    };

    // 기본값: 종료일은 오늘, 시작일은 1개월 전
    const defaultEndDate = formatDate(today);
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
    const defaultStartDate = formatDate(oneMonthAgo);

    const requestData = {
      BASS_DT: endDate || defaultEndDate,
      STK_CD: code,
      TERM_TP_CD: "0", // 기간유형코드 (0: 일별, 1: 주별, 2: 월별)
      INQR_ST_DT: startDate || defaultStartDate,
      INQR_EN_DT: endDate || defaultEndDate,
    };

    return this.post<StockForeignInvestorTrend>(endpoint, requestData, {
      headers: {
        tr_id: ForeignInstitutionalApiId.FOREIGN_INSTITUTIONAL_TREND,
      },
    });
  }

  /**
   * 기관 투자자 정보 조회
   * @param code 종목코드
   * @param date 조회일자 (YYYYMMDD)
   * @returns 기관 투자자 정보
   */
  async getInstitutionalInvestorInfo(
    code: string,
    date?: string
  ): Promise<ApiResponse<InstitutionalInvestorInfo>> {
    const endpoint = "/uapi/domestic-stock/v1/trading/foreign-institutional";

    logger.info("기관 투자자 정보 조회 요청", { code, date });

    // 현재 날짜 기준으로 기본값 설정
    const today = new Date();
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}${month}${day}`;
    };

    const requestData = {
      BASS_DT: date || formatDate(today),
      STK_CD: code,
      SELN_TPCD: "2", // 매매유형코드 (1: 매수, 2: 매도)
    };

    return this.post<InstitutionalInvestorInfo>(endpoint, requestData, {
      headers: {
        tr_id: ForeignInstitutionalApiId.INSTITUTIONAL_REQUEST,
      },
    });
  }

  /**
   * 외국인/기관 연속매매 현황 조회
   * @param market 시장구분코드 (J: 주식, ETF)
   * @param investorType 투자자구분코드 (1: 외국인, 2: 기관계)
   * @param tradingType 매매구분코드 (1: 순매수, 2: 순매도)
   * @param period 기간 (1: 5일, 2: 10일, 3: 20일, 4: 60일)
   * @returns 연속매매 현황 정보
   */
  async getContinuousTradingStatus(
    market: string = "J",
    investorType: string = "1",
    tradingType: string = "1",
    period: string = "2"
  ): Promise<ApiResponse<ContinuousTradingStatus>> {
    const endpoint = "/uapi/domestic-stock/v1/trading/foreign-institutional";

    logger.info("외국인/기관 연속매매 현황 조회 요청", {
      market,
      investorType,
      tradingType,
      period,
    });

    const requestData = {
      MKT_TP_CD: market, // 시장구분코드
      INVST_TP_CD: investorType, // 투자자구분코드
      PDNO: period, // 기간
      NET_BUY_TP_CD: tradingType, // 매매구분코드
    };

    return this.post<ContinuousTradingStatus>(endpoint, requestData, {
      headers: {
        tr_id: ForeignInstitutionalApiId.CONTINUOUS_TRADING,
      },
    });
  }
}
