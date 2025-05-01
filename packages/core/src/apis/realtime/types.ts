/**
 * 주식호가 정보 인터페이스
 * API 응답 필드는 스네이크 케이스로 반환되므로 인터페이스도 동일하게 정의
 */
export interface StockQuoteInfo {
  /**
   * 호가잔량기준시간
   * 호가시간
   */
  bid_req_base_tm?: string;

  /**
   * 매도10차선잔량대비
   * 매도호가직전대비10
   */
  sel_10th_pre_req_pre?: string;

  /**
   * 매도10차선잔량
   * 매도호가수량10
   */
  sel_10th_pre_req?: string;

  /**
   * 매도10차선호가
   * 매도호가10
   */
  sel_10th_pre_bid?: string;

  /**
   * 매도9차선잔량대비
   * 매도호가직전대비9
   */
  sel_9th_pre_req_pre?: string;

  /**
   * 매도9차선잔량
   * 매도호가수량9
   */
  sel_9th_pre_req?: string;

  /**
   * 매도9차선호가
   * 매도호가9
   */
  sel_9th_pre_bid?: string;

  /**
   * 매도8차선잔량대비
   * 매도호가직전대비8
   */
  sel_8th_pre_req_pre?: string;

  /**
   * 매도8차선잔량
   * 매도호가수량8
   */
  sel_8th_pre_req?: string;

  /**
   * 매도8차선호가
   * 매도호가8
   */
  sel_8th_pre_bid?: string;

  /**
   * 매도7차선잔량대비
   * 매도호가직전대비7
   */
  sel_7th_pre_req_pre?: string;

  /**
   * 매도7차선잔량
   * 매도호가수량7
   */
  sel_7th_pre_req?: string;

  /**
   * 매도7차선호가
   * 매도호가7
   */
  sel_7th_pre_bid?: string;

  /**
   * 매도6차선잔량대비
   * 매도호가직전대비6
   */
  sel_6th_pre_req_pre?: string;

  /**
   * 매도6차선잔량
   * 매도호가수량6
   */
  sel_6th_pre_req?: string;

  /**
   * 매도6차선호가
   * 매도호가6
   */
  sel_6th_pre_bid?: string;

  /**
   * 매도5차선잔량대비
   * 매도호가직전대비5
   */
  sel_5th_pre_req_pre?: string;

  /**
   * 매도5차선잔량
   * 매도호가수량5
   */
  sel_5th_pre_req?: string;

  /**
   * 매도5차선호가
   * 매도호가5
   */
  sel_5th_pre_bid?: string;

  /**
   * 매도4차선잔량대비
   * 매도호가직전대비4
   */
  sel_4th_pre_req_pre?: string;

  /**
   * 매도4차선잔량
   * 매도호가수량4
   */
  sel_4th_pre_req?: string;

  /**
   * 매도4차선호가
   * 매도호가4
   */
  sel_4th_pre_bid?: string;

  /**
   * 매도3차선잔량대비
   * 매도호가직전대비3
   */
  sel_3th_pre_req_pre?: string;

  /**
   * 매도3차선잔량
   * 매도호가수량3
   */
  sel_3th_pre_req?: string;

  /**
   * 매도3차선호가
   * 매도호가3
   */
  sel_3th_pre_bid?: string;

  /**
   * 매도2차선잔량대비
   * 매도호가직전대비2
   */
  sel_2th_pre_req_pre?: string;

  /**
   * 매도2차선잔량
   * 매도호가수량2
   */
  sel_2th_pre_req?: string;

  /**
   * 매도2차선호가
   * 매도호가2
   */
  sel_2th_pre_bid?: string;

  /**
   * 매도1차선잔량대비
   * 매도호가직전대비1
   */
  sel_1th_pre_req_pre?: string;

  /**
   * 매도최우선잔량
   * 매도호가수량1
   */
  sel_fpr_req?: string;

  /**
   * 매도최우선호가
   * 매도호가1
   */
  sel_fpr_bid?: string;

  /**
   * 매수최우선호가
   * 매수호가1
   */
  buy_fpr_bid?: string;

  /**
   * 매수최우선잔량
   * 매수호가수량1
   */
  buy_fpr_req?: string;

  /**
   * 매수1차선잔량대비
   * 매수호가직전대비1
   */
  buy_1th_pre_req_pre?: string;

  /**
   * 매수2차선호가
   * 매수호가2
   */
  buy_2th_pre_bid?: string;

  /**
   * 매수2차선잔량
   * 매수호가수량2
   */
  buy_2th_pre_req?: string;

  /**
   * 매수2차선잔량대비
   * 매수호가직전대비2
   */
  buy_2th_pre_req_pre?: string;

  /**
   * 매수3차선호가
   * 매수호가3
   */
  buy_3th_pre_bid?: string;

  /**
   * 매수3차선잔량
   * 매수호가수량3
   */
  buy_3th_pre_req?: string;

  /**
   * 매수3차선잔량대비
   * 매수호가직전대비3
   */
  buy_3th_pre_req_pre?: string;

  /**
   * 매수4차선호가
   * 매수호가4
   */
  buy_4th_pre_bid?: string;

  /**
   * 매수4차선잔량
   * 매수호가수량4
   */
  buy_4th_pre_req?: string;

  /**
   * 매수4차선잔량대비
   * 매수호가직전대비4
   */
  buy_4th_pre_req_pre?: string;

  /**
   * 매수5차선호가
   * 매수호가5
   */
  buy_5th_pre_bid?: string;

  /**
   * 매수5차선잔량
   * 매수호가수량5
   */
  buy_5th_pre_req?: string;

  /**
   * 매수5차선잔량대비
   * 매수호가직전대비5
   */
  buy_5th_pre_req_pre?: string;

  /**
   * 매수6차선호가
   * 매수호가6
   */
  buy_6th_pre_bid?: string;

  /**
   * 매수6차선잔량
   * 매수호가수량6
   */
  buy_6th_pre_req?: string;

  /**
   * 매수6차선잔량대비
   * 매수호가직전대비6
   */
  buy_6th_pre_req_pre?: string;

  /**
   * 매수7차선호가
   * 매수호가7
   */
  buy_7th_pre_bid?: string;

  /**
   * 매수7차선잔량
   * 매수호가수량7
   */
  buy_7th_pre_req?: string;

  /**
   * 매수7차선잔량대비
   * 매수호가직전대비7
   */
  buy_7th_pre_req_pre?: string;

  /**
   * 매수8차선호가
   * 매수호가8
   */
  buy_8th_pre_bid?: string;

  /**
   * 매수8차선잔량
   * 매수호가수량8
   */
  buy_8th_pre_req?: string;

  /**
   * 매수8차선잔량대비
   * 매수호가직전대비8
   */
  buy_8th_pre_req_pre?: string;

  /**
   * 매수9차선호가
   * 매수호가9
   */
  buy_9th_pre_bid?: string;

  /**
   * 매수9차선잔량
   * 매수호가수량9
   */
  buy_9th_pre_req?: string;

  /**
   * 매수9차선잔량대비
   * 매수호가직전대비9
   */
  buy_9th_pre_req_pre?: string;

  /**
   * 매수10차선호가
   * 매수호가10
   */
  buy_10th_pre_bid?: string;

  /**
   * 매수10차선잔량
   * 매수호가수량10
   */
  buy_10th_pre_req?: string;

  /**
   * 매수10차선잔량대비
   * 매수호가직전대비10
   */
  buy_10th_pre_req_pre?: string;

  /**
   * 총매도잔량직전대비
   * 매도호가총잔량직전대비
   */
  tot_sel_req_jub_pre?: string;

  /**
   * 총매도잔량
   * 매도호가총잔량
   */
  tot_sel_req?: string;

  /**
   * 총매수잔량
   * 매수호가총잔량
   */
  tot_buy_req?: string;

  /**
   * 총매수잔량직전대비
   * 매수호가총잔량직전대비
   */
  tot_buy_req_jub_pre?: string;

  /**
   * 시간외매도잔량대비
   * 시간외 매도호가 총잔량 직전대비
   */
  ovt_sel_req_pre?: string;

  /**
   * 시간외매도잔량
   * 시간외 매도호가 총잔량
   */
  ovt_sel_req?: string;

  /**
   * 시간외매수잔량
   * 시간외 매수호가 총잔량
   */
  ovt_buy_req?: string;

  /**
   * 시간외매수잔량대비
   * 시간외 매수호가 총잔량 직전대비
   */
  ovt_buy_req_pre?: string;
}
