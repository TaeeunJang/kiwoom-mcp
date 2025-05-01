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

  /**
   * 응답 헤더 정보
   */
  headers?: ResponseHeaders;
}

/**
 * API 응답 헤더 정보
 */
export interface ResponseHeaders {
  /**
   * 연속 조회 여부 (Y/N)
   * 다음 데이터가 있을시 Y값 전달
   */
  "cont-yn"?: string;

  /**
   * 연속 조회 키
   * 다음 데이터가 있을시 다음 키값 전달
   */
  "next-key"?: string;

  /**
   * TR명
   * API 요청에 사용된 TR 코드
   */
  "api-id"?: string;
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
