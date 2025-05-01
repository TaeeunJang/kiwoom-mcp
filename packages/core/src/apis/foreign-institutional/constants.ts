/**
 * 기관/외국인 API ID 상수 정의
 */
export const ForeignInstitutionalApiId = {
  /**
   * 외국인기관 매매동향 요청
   */
  FOREIGN_INSTITUTIONAL_TREND: "ka10008" as const,

  /**
   * 기관요청
   */
  INSTITUTIONAL_REQUEST: "ka10009" as const,

  /**
   * 외국인기관 연속매매 요청
   */
  CONTINUOUS_TRADING: "ka10010" as const,
} as const;

/**
 * 기관/외국인 API ID 타입
 */
export type ForeignInstitutionalApiIdType =
  (typeof ForeignInstitutionalApiId)[keyof typeof ForeignInstitutionalApiId];
