/**
 * API 응답 기본 형식
 */
export interface ApiResponse<T = any> {
  /**
   * 성공 여부
   */
  success: boolean;

  /**
   * 응답 데이터
   */
  data?: T;

  /**
   * 응답 메시지
   */
  message?: string;

  /**
   * 오류 정보
   */
  error?: string;
}

/**
 * 페이지네이션 정보
 */
export interface PaginationInfo {
  /**
   * 전체 항목 수
   */
  total: number;

  /**
   * 현재 페이지
   */
  page: number;

  /**
   * 페이지 당 항목 수
   */
  perPage: number;

  /**
   * 전체 페이지 수
   */
  totalPages: number;
}

/**
 * 페이지네이션된 API 응답
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  /**
   * 페이지네이션 정보
   */
  pagination: PaginationInfo;
}
