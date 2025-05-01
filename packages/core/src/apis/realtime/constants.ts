/**
 * 실시간 시세 API ID 상수
 */
export const RealtimeApiId = {
  /**
   * 주식호가요청 (ka10004)
   */
  STOCK_QUOTE: "ka10004",

  /**
   * 주식일주월시분요청 (ka10005)
   */
  STOCK_PRICE_TIME_SERIES: "ka10005",

  /**
   * 주식시분요청 (ka10006)
   */
  STOCK_MINUTE_PRICE: "ka10006",

  /**
   * 시세표성정보요청 (ka10007)
   */
  MARKET_INDICATOR: "ka10007",

  /**
   * 신주인수권전체시세요청 (ka10011)
   */
  SUBSCRIPTION_RIGHTS: "ka10011",

  /**
   * 일별기관매매종목요청 (ka10044)
   */
  DAILY_INSTITUTIONAL_TRADING: "ka10044",

  /**
   * 종목별기관매매추이요청 (ka10045)
   */
  STOCK_INSTITUTIONAL_TRADING_TREND: "ka10045",

  /**
   * 체결강도추이시간별요청 (ka10046)
   */
  HOURLY_TRADING_STRENGTH: "ka10046",

  /**
   * 체결강도추이일별요청 (ka10047)
   */
  DAILY_TRADING_STRENGTH: "ka10047",

  /**
   * 장중투자자별매매요청 (ka10063)
   */
  INTRADAY_INVESTOR_TRADING: "ka10063",

  /**
   * 장마감후투자자별매매요청 (ka10066)
   */
  CLOSING_INVESTOR_TRADING: "ka10066",

  /**
   * 증권사별종목매매동향요청 (ka10078)
   */
  BROKER_STOCK_TRADING_TREND: "ka10078",

  /**
   * 일별주가요청 (ka10086)
   */
  DAILY_STOCK_PRICE: "ka10086",

  /**
   * 시간외단일가요청 (ka10087)
   */
  AFTER_HOURS_PRICE: "ka10087",

  /**
   * 프로그램매매추이요청 시간대별 (ka90005)
   */
  HOURLY_PROGRAM_TRADING: "ka90005",

  /**
   * 프로그램매매차익잔고추이요청 (ka90006)
   */
  PROGRAM_TRADING_BALANCE: "ka90006",

  /**
   * 프로그램매매누적추이요청 (ka90007)
   */
  PROGRAM_TRADING_CUMULATIVE: "ka90007",

  /**
   * 종목시간별프로그램매매추이요청 (ka90008)
   */
  STOCK_HOURLY_PROGRAM_TRADING: "ka90008",

  /**
   * 프로그램매매추이요청 일자별 (ka90010)
   */
  DAILY_PROGRAM_TRADING: "ka90010",

  /**
   * 종목일별프로그램매매추이요청 (ka90013)
   */
  STOCK_DAILY_PROGRAM_TRADING: "ka90013",
} as const;

/**
 * 실시간 시세 API ID 타입
 */
export type RealtimeApiIdType =
  (typeof RealtimeApiId)[keyof typeof RealtimeApiId];
