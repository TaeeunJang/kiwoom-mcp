/**
 * 종목 기본 정보
 */
export interface StockBasicInfo {
  /**
   * 종목코드
   */
  code: string;

  /**
   * 종목명
   */
  name: string;

  /**
   * 시장구분
   */
  marketType: string;

  /**
   * 업종
   */
  sector?: string;

  /**
   * 상장주식수
   */
  listedShares?: number;
}

/**
 * 시간외단일가 정보
 */
export interface AfterHoursPriceInfo {
  /**
   * 종목코드
   */
  code: string;

  /**
   * 시간외 단일가
   */
  price: number;

  /**
   * 전일 대비 등락
   */
  change?: number;

  /**
   * 전일 대비 등락률
   */
  changeRate?: number;

  /**
   * 거래량
   */
  volume?: number;
}

/**
 * 투자자/기관별 동향 정보
 */
export interface InvestorTrendInfo {
  /**
   * 종목코드
   */
  code: string;

  /**
   * 날짜
   */
  date: string;

  /**
   * 개인 순매수량
   */
  individual: number;

  /**
   * 외국인 순매수량
   */
  foreign: number;

  /**
   * 기관 순매수량
   */
  institution: number;

  /**
   * 금융투자 순매수량
   */
  financial?: number;

  /**
   * 보험 순매수량
   */
  insurance?: number;

  /**
   * 투신 순매수량
   */
  trust?: number;

  /**
   * 기타금융 순매수량
   */
  otherFinance?: number;

  /**
   * 은행 순매수량
   */
  bank?: number;

  /**
   * 연기금 순매수량
   */
  pension?: number;
}

/**
 * 증권사 순매수 정보
 */
export interface BrokerBuyingInfo {
  /**
   * 종목코드
   */
  code: string;

  /**
   * 날짜
   */
  date: string;

  /**
   * 매수 상위 증권사 정보
   */
  buyingBrokers: BrokerInfo[];

  /**
   * 매도 상위 증권사 정보
   */
  sellingBrokers: BrokerInfo[];
}

/**
 * 증권사 정보
 */
export interface BrokerInfo {
  /**
   * 증권사 코드
   */
  code: string;

  /**
   * 증권사명
   */
  name: string;

  /**
   * 거래량
   */
  volume: number;

  /**
   * 거래대금
   */
  amount: number;
}
