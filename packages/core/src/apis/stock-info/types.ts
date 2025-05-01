/**
 * 종목 기본 정보
 * API 응답 필드는 스네이크 케이스로 반환되므로 인터페이스도 동일하게 정의
 */
export interface StockBasicInfo {
  /**
   * 종목코드
   * 거래소별 종목코드 (예: KRX:005930, NXT:039490_NX, SOR:039490_AL)
   */
  stk_cd?: string;

  /**
   * 종목명
   * 주식의 이름 (예: 삼성전자, SK하이닉스)
   */
  stk_nm?: string;

  /**
   * 결산월
   * 회계 결산이 이루어지는 월 (예: 12월)
   */
  setl_mm?: string;

  /**
   * 액면가
   * 주식 1주당 액면 금액
   */
  fav?: string;

  /**
   * 자본금
   * 회사의 총 자본금 (단위: 원)
   */
  cap?: string;

  /**
   * 상장주식
   * 상장된 총 주식 수
   */
  flo_stk?: string;

  /**
   * 신용비율
   * 신용거래 비율
   */
  crd_rt?: string;

  /**
   * 연중최고
   * 연중 기록한 최고가
   */
  oyr_hgst?: string;

  /**
   * 연중최저
   * 연중 기록한 최저가
   */
  oyr_lwst?: string;

  /**
   * 시가총액
   * 총 시가 가치 (상장주식수 * 현재가)
   */
  mac?: string;

  /**
   * 시가총액비중
   * 전체 시장 대비 해당 종목의 시가총액 비중
   */
  mac_wght?: string;

  /**
   * 외인소진률
   * 외국인 보유 한도 소진율
   */
  for_exh_rt?: string;

  /**
   * 대용가
   * 담보대출 시 적용되는 주식의 평가 가격
   */
  repl_pric?: string;

  /**
   * PER
   * 주가수익비율 (Price Earning Ratio)
   * [주의] 외부벤더사에서 제공되는 데이터이며 일주일에 한번 또는 실적발표 시즌에 업데이트 됨
   */
  per?: string;

  /**
   * EPS
   * 주당순이익 (Earning Per Share)
   */
  eps?: string;

  /**
   * ROE
   * 자기자본이익률 (Return On Equity)
   * [주의] 외부벤더사에서 제공되는 데이터이며 일주일에 한번 또는 실적발표 시즌에 업데이트 됨
   */
  roe?: string;

  /**
   * PBR
   * 주가순자산비율 (Price Book-value Ratio)
   */
  pbr?: string;

  /**
   * EV
   * 기업가치 (Enterprise Value)
   */
  ev?: string;

  /**
   * BPS
   * 주당순자산가치 (Book-value Per Share)
   */
  bps?: string;

  /**
   * 매출액
   * 기업의 총 매출액
   */
  sale_amt?: string;

  /**
   * 영업이익
   * 기업의 영업 활동으로 발생한 이익
   */
  bus_pro?: string;

  /**
   * 당기순이익
   * 법인세 등을 제외한 최종 순이익
   */
  cup_nga?: string;

  /**
   * 250최고
   * 250일간 기록한 최고가
   */
  "250hgst"?: string;

  /**
   * 250최저
   * 250일간 기록한 최저가
   */
  "250lwst"?: string;

  /**
   * 고가
   * 당일 기록한 최고가
   */
  high_pric?: string;

  /**
   * 시가
   * 당일 시작 가격
   */
  open_pric?: string;

  /**
   * 저가
   * 당일 기록한 최저가
   */
  low_pric?: string;

  /**
   * 상한가
   * 당일 최대 상승 가능 가격
   */
  upl_pric?: string;

  /**
   * 하한가
   * 당일 최대 하락 가능 가격
   */
  lst_pric?: string;

  /**
   * 기준가
   * 당일 가격 변동의 기준이 되는 가격
   */
  base_pric?: string;

  /**
   * 예상체결가
   * 장 시작 전 예상되는 시작 가격
   */
  exp_cntr_pric?: string;

  /**
   * 예상체결수량
   * 장 시작 전 예상되는 체결 수량
   */
  exp_cntr_qty?: string;

  /**
   * 250최고가일
   * 250일 중 최고가를 기록한 날짜
   */
  "250hgst_pric_dt"?: string;

  /**
   * 250최고가대비율
   * 현재가 대비 250일 최고가의 등락률
   */
  "250hgst_pric_pre_rt"?: string;

  /**
   * 250최저가일
   * 250일 중 최저가를 기록한 날짜
   */
  "250lwst_pric_dt"?: string;

  /**
   * 250최저가대비율
   * 현재가 대비 250일 최저가의 등락률
   */
  "250lwst_pric_pre_rt"?: string;

  /**
   * 현재가
   * 종목의 현재 주가
   */
  cur_prc?: string;

  /**
   * 대비기호
   * 전일 대비 상승/하락 등을 표시하는 기호
   */
  pre_sig?: string;

  /**
   * 전일대비
   * 전일 종가 대비 현재가의 차이
   */
  pred_pre?: string;

  /**
   * 등락율
   * 전일 종가 대비 현재가의 변동률
   */
  flu_rt?: string;

  /**
   * 거래량
   * 당일 거래된 주식의 수량
   */
  trde_qty?: string;

  /**
   * 거래대비
   * 거래량의 전일 대비 변화
   */
  trde_pre?: string;

  /**
   * 액면가단위
   * 액면가의 단위
   */
  fav_unit?: string;

  /**
   * 유통주식
   * 실제 시장에서 유통되는 주식 수
   */
  dstr_stk?: string;

  /**
   * 유통비율
   * 전체 상장주식 대비 유통주식의 비율
   */
  dstr_rt?: string;
}

/**
 * 변동성완화장치(VI) 발동종목 정보
 * API 응답 필드는 스네이크 케이스로 반환되므로 인터페이스도 동일하게 정의
 */
export interface VolatilityControlStock {
  /**
   * 발동종목 목록
   */
  motn_stk?: MotionStock[];
}

/**
 * VI 발동종목 상세 정보
 */
export interface MotionStock {
  /**
   * 종목코드
   * 거래소별 종목코드
   */
  stk_cd?: string;

  /**
   * 종목명
   * 주식의 이름
   */
  stk_nm?: string;

  /**
   * 누적거래량
   * 당일 누적된 거래량
   */
  acc_trde_qty?: string;

  /**
   * 발동가격
   * VI가 발동된 주가
   */
  motn_pric?: string;

  /**
   * 동적괴리율
   * 동적 가격 제한폭과의 괴리율
   */
  dynm_dispty_rt?: string;

  /**
   * 매매체결처리시각
   * VI 발동 시 매매체결처리 시각
   */
  trde_cntr_proc_time?: string;

  /**
   * VI해제시각
   * VI가 해제되는 시각
   */
  virelis_time?: string;

  /**
   * VI적용구분
   * VI 적용 유형
   */
  viaplc_tp?: string;

  /**
   * 동적기준가격
   * 동적 VI 적용의 기준 가격
   */
  dynm_stdpc?: string;

  /**
   * 정적기준가격
   * 정적 VI 적용의 기준 가격
   */
  static_stdpc?: string;

  /**
   * 정적괴리율
   * 정적 가격 제한폭과의 괴리율
   */
  static_dispty_rt?: string;

  /**
   * 시가대비등락률
   * 당일 시가 대비 해당 종목의 등락률
   */
  open_pric_pre_flu_rt?: string;

  /**
   * VI발동횟수
   * 당일 VI 발동 횟수
   */
  vimotn_cnt?: string;

  /**
   * 거래소구분
   * 종목이 상장된 거래소 구분 (KRX, NXT 등)
   */
  stex_tp?: string;
}
