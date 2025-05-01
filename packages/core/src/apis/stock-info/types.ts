/**
 * 종목 기본 정보
 */
export interface StockBasicInfo {
  /**
   * 종목코드
   */
  stkCd?: string;

  /**
   * 종목명
   */
  stkNm?: string;

  /**
   * 결산월
   */
  setlMm?: string;

  /**
   * 액면가
   */
  fav?: string;

  /**
   * 자본금
   */
  cap?: string;

  /**
   * 상장주식
   */
  floStk?: string;

  /**
   * 신용비율
   */
  crdRt?: string;

  /**
   * 연중최고
   */
  oyrHgst?: string;

  /**
   * 연중최저
   */
  oyrLwst?: string;

  /**
   * 시가총액
   */
  mac?: string;

  /**
   * 시가총액비중
   */
  macWght?: string;

  /**
   * 외인소진률
   */
  forExhRt?: string;

  /**
   * 대용가
   */
  replPric?: string;

  /**
   * PER
   */
  per?: string;

  /**
   * EPS
   */
  eps?: string;

  /**
   * ROE
   */
  roe?: string;

  /**
   * PBR
   */
  pbr?: string;

  /**
   * EV
   */
  ev?: string;

  /**
   * BPS
   */
  bps?: string;

  /**
   * 매출액
   */
  saleAmt?: string;

  /**
   * 영업이익
   */
  busPro?: string;

  /**
   * 당기순이익
   */
  cupNga?: string;

  /**
   * 250최고
   */
  hgst250?: string;

  /**
   * 250최저
   */
  lwst250?: string;

  /**
   * 고가
   */
  highPric?: string;

  /**
   * 시가
   */
  openPric?: string;

  /**
   * 저가
   */
  lowPric?: string;

  /**
   * 상한가
   */
  uplPric?: string;

  /**
   * 하한가
   */
  lstPric?: string;

  /**
   * 기준가
   */
  basePric?: string;

  /**
   * 예상체결가
   */
  expCntrPric?: string;

  /**
   * 예상체결수량
   */
  expCntrQty?: string;

  /**
   * 250최고가일
   */
  hgstPricDt250?: string;

  /**
   * 250최고가대비율
   */
  hgstPricPreRt250?: string;

  /**
   * 250최저가일
   */
  lwstPricDt250?: string;

  /**
   * 250최저가대비율
   */
  lwstPricPreRt250?: string;

  /**
   * 현재가
   */
  curPrc?: string;

  /**
   * 대비기호
   */
  preSig?: string;

  /**
   * 전일대비
   */
  predPre?: string;

  /**
   * 등락율
   */
  fluRt?: string;

  /**
   * 거래량
   */
  trdeQty?: string;

  /**
   * 거래대비
   */
  trdePre?: string;

  /**
   * 액면가단위
   */
  favUnit?: string;

  /**
   * 유통주식
   */
  dstrStk?: string;

  /**
   * 유통비율
   */
  dstrRt?: string;
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
