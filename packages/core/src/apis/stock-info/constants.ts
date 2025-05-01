/**
 * 종목정보 API TR 코드 상수
 */
export const StockInfoApiId = {
  /** 주식기본정보요청 */
  BASIC_INFO: "ka10001",

  /** 주식거래원요청 */
  BROKER_INFO: "ka10002",

  /** 체결정보요청 */
  TRADE_INFO: "ka10003",

  /** 신용매매동향요청 */
  CREDIT_TREND: "ka10013",

  /** 일별거래상세요청 */
  DAILY_DETAIL: "ka10015",

  /** 신고저가요청 */
  NEW_HIGH_LOW: "ka10016",

  /** 상하한가요청 */
  LIMIT_PRICE: "ka10017",

  /** 고저가근접요청 */
  NEAR_HIGH_LOW: "ka10018",

  /** 가격급등락요청 */
  PRICE_SURGE_FALL: "ka10019",

  /** 거래량갱신요청 */
  VOLUME_RENEWAL: "ka10024",

  /** 매물대집중요청 */
  PRICE_CONCENTRATION: "ka10025",

  /** 고저PER요청 */
  HIGH_LOW_PER: "ka10026",

  /** 시가대비등락률요청 */
  OPEN_PRICE_CHANGE: "ka10028",

  /** 거래원매물대분석요청 */
  BROKER_PRICE_ANALYSIS: "ka10043",

  /** 거래원순간거래량요청 */
  BROKER_INSTANT_VOLUME: "ka10052",

  /** 변동성완화장치발동종목요청 */
  VOLATILITY_CONTROL: "ka10054",

  /** 당일전일체결량요청 */
  TODAY_PREV_VOLUME: "ka10055",

  /** 투자자별일별매매종목요청 */
  INVESTOR_DAILY_TRADE: "ka10058",

  /** 종목별투자자기관별요청 */
  INVESTOR_BY_STOCK: "ka10059",

  /** 종목별투자자기관별합계요청 */
  INVESTOR_BY_STOCK_TOTAL: "ka10061",

  /** 당일전일체결요청 */
  TODAY_PREV_TRADE: "ka10084",

  /** 관심종목정보요청 */
  FAVORITE_STOCK_INFO: "ka10095",

  /** 종목정보 리스트 */
  STOCK_INFO_LIST: "ka10099",

  /** 종목정보 조회 */
  STOCK_INFO: "ka10100",

  /** 업종코드 리스트 */
  SECTOR_CODE_LIST: "ka10101",

  /** 회원사 리스트 */
  BROKER_LIST: "ka10102",

  /** 프로그램순매수상위50요청 */
  PROGRAM_TOP50_NET_BUY: "ka90003",

  /** 종목별프로그램매매현황요청 */
  PROGRAM_TRADE_BY_STOCK: "ka90004",

  /** 대차거래내역요청 */
  BORROWED_TRADE: "ka90012",
} as const;

export type StockInfoApiIdType =
  (typeof StockInfoApiId)[keyof typeof StockInfoApiId];
