import { ApiConfig } from "../../config";
import { TokenManager } from "../../auth/token-manager";
import BaseApiClient from "../base-api-client";
import { StockBasicInfo, VolatilityControlStock } from "./types";
import { StockInfoApiId } from "./constants";
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
   * @param code 종목코드 (예: KRX:005930, NXT:039490_NX, SOR:039490_AL)
   * @param contYn 연속조회여부 (Y/N)
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
      "api-id": StockInfoApiId.BASIC_INFO, // TR명: 주식기본정보요청
    };

    // 연속 조회 관련 헤더 설정
    if (contYn === "Y" && nextKey) {
      headers["cont-yn"] = contYn;
      headers["next-key"] = nextKey;
    }

    // 종목 정보 요청
    return this.post<StockBasicInfo>(
      "/api/dostk/stkinfo",
      {
        stk_cd: code, // 거래소별 종목코드
      },
      { headers }
    );
  }

  /**
   * 변동성완화장치발동종목요청 (VI 발동종목)
   * @param marketType 시장구분 (000:전체, 001:코스피, 101:코스닥)
   * @param beforeMarketType 장전구분 (0:전체, 1:정규시장, 2:시간외단일가)
   * @param stockCode 종목코드 (선택사항, 공백시 전체종목조회)
   * @param motionType 발동구분 (0:전체, 1:정적VI, 2:동적VI, 3:동적VI+정적VI)
   * @param skipStock 제외종목 설정 (9자리, 0:포함, 1:제외)
   * @param tradeQtyType 거래량구분 (0:사용안함, 1:사용)
   * @param minTradeQty 최소거래량
   * @param maxTradeQty 최대거래량
   * @param tradePriceType 거래대금구분 (0:사용안함, 1:사용)
   * @param minTradePrice 최소거래대금
   * @param maxTradePrice 최대거래대금
   * @param motionDirection 발동방향 (0:전체, 1:상승, 2:하락)
   * @param stockExchangeType 거래소구분 (1:KRX, 2:NXT, 3:통합)
   * @param contYn 연속조회여부 (Y/N)
   * @param nextKey 연속조회키
   * @returns VI 발동종목 정보
   */
  async getVolatilityControlStocks(
    marketType: string = "000",
    beforeMarketType: string = "0",
    stockCode?: string,
    motionType: string = "0",
    skipStock: string = "000000000",
    tradeQtyType: string = "0",
    minTradeQty: string = "0",
    maxTradeQty: string = "100000000",
    tradePriceType: string = "0",
    minTradePrice: string = "0",
    maxTradePrice: string = "100000000",
    motionDirection: string = "0",
    stockExchangeType: string = "1",
    contYn?: string,
    nextKey?: string
  ): Promise<ApiResponse<VolatilityControlStock>> {
    logger.info(
      `VI 발동종목 조회 요청: 시장구분=${marketType}, 장전구분=${beforeMarketType}, 종목코드=${
        stockCode || "전체"
      }`
    );

    // 요청 헤더 설정
    const headers: Record<string, string> = {
      "api-id": StockInfoApiId.VOLATILITY_CONTROL, // TR명: 변동성완화장치발동종목요청
    };

    // 연속 조회 관련 헤더 설정
    if (contYn === "Y" && nextKey) {
      headers["cont-yn"] = contYn;
      headers["next-key"] = nextKey;
    }

    // 요청 본문 설정
    const requestBody: Record<string, string> = {
      mrkt_tp: marketType,
      bf_mkrt_tp: beforeMarketType,
      motn_tp: motionType,
      skip_stk: skipStock,
      trde_qty_tp: tradeQtyType,
      min_trde_qty: minTradeQty,
      max_trde_qty: maxTradeQty,
      trde_prica_tp: tradePriceType,
      min_trde_prica: minTradePrice,
      max_trde_prica: maxTradePrice,
      motn_drc: motionDirection,
      stex_tp: stockExchangeType,
    };

    // 종목코드가 제공된 경우 추가
    if (stockCode) {
      requestBody.stk_cd = stockCode;
    }

    // VI 발동종목 요청
    return this.post<VolatilityControlStock>(
      "/api/dostk/stkinfo",
      requestBody,
      { headers }
    );
  }
}

export default StockInfoClient;
