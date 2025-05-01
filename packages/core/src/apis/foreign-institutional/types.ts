/**
 * 주식 외국인 종목별 매매동향 정보
 * API 응답 필드는 스네이크 케이스로 반환되므로 인터페이스도 동일하게 정의
 */
export interface StockForeignInvestorTrend {
  /**
   * 주식외국인 정보 리스트
   */
  stk_frgnr?: ForeignInvestorItem[];
}

/**
 * 외국인 투자자 종목별 매매동향 아이템
 */
export interface ForeignInvestorItem {
  /**
   * 일자
   * 데이터 기준 날짜 (YYYYMMDD 형식)
   */
  dt?: string;

  /**
   * 종가
   * 해당 일자의 종가
   */
  close_pric?: string;

  /**
   * 전일대비
   * 전일 종가 대비 금일 종가의 변동 금액
   */
  pred_pre?: string;

  /**
   * 거래량
   * 해당 일자의 총 거래량
   */
  trde_qty?: string;

  /**
   * 변동수량
   * 해당 일자의 외국인 보유량 변동 수량
   */
  chg_qty?: string;

  /**
   * 보유주식수
   * 외국인 투자자가 보유한 총 주식 수
   */
  poss_stkcnt?: string;

  /**
   * 비중
   * 전체 상장주식 대비 외국인 보유 비중 (%)
   */
  wght?: string;

  /**
   * 취득가능주식수
   * 외국인이 추가로 취득 가능한 주식 수
   */
  gain_pos_stkcnt?: string;

  /**
   * 외국인한도
   * 외국인 투자자가 보유할 수 있는 최대 주식 수
   */
  frgnr_limit?: string;

  /**
   * 외국인한도증감
   * 외국인 투자한도의 증감 수량
   */
  frgnr_limit_irds?: string;

  /**
   * 한도소진률
   * 외국인 투자한도 대비 현재 보유 비율 (%)
   */
  limit_exh_rt?: string;
}

/**
 * 기관 투자자 정보
 */
export interface InstitutionalInvestorInfo {
  // 기관 투자자 관련 필드 (확장 예정)
}

/**
 * 기관/외국인 연속매매 현황
 */
export interface ContinuousTradingStatus {
  // 연속매매 현황 관련 필드 (확장 예정)
}
