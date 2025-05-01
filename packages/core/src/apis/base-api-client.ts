import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiConfig, defaultConfig } from "../config";
import { TokenManager } from "../auth/token-manager";
import { logger } from "../utils/logger";
import { ApiResponse, ResponseHeaders } from "../types/api";

/**
 * 기본 API 클라이언트
 */
export class BaseApiClient {
  protected config: ApiConfig;
  protected httpClient: AxiosInstance;
  protected tokenManager: TokenManager;

  /**
   * 생성자
   * @param config API 설정
   * @param tokenManager 토큰 관리자 (선택 사항)
   */
  constructor(config: Partial<ApiConfig> = {}, tokenManager?: TokenManager) {
    this.config = { ...defaultConfig, ...config };
    this.tokenManager = tokenManager || new TokenManager(this.config);

    this.httpClient = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });

    // 요청 인터셉터 설정
    this.setupRequestInterceptor();

    // 응답 인터셉터 설정
    this.setupResponseInterceptor();
  }

  /**
   * GET 요청
   * @param endpoint 엔드포인트 경로
   * @param params 요청 파라미터
   * @param config 추가 설정
   * @returns API 응답
   */
  async get<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.httpClient.get<T>(endpoint, {
        params,
        ...config,
      });

      return {
        success: true,
        data: response.data,
        headers: this.extractResponseHeaders(response),
      };
    } catch (error) {
      return this.handleError(error, `GET ${endpoint}`);
    }
  }

  /**
   * POST 요청
   * @param endpoint 엔드포인트 경로
   * @param data 요청 데이터
   * @param config 추가 설정
   * @returns API 응답
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.httpClient.post<T>(endpoint, data, config);

      return {
        success: true,
        data: response.data,
        headers: this.extractResponseHeaders(response),
      };
    } catch (error) {
      return this.handleError(error, `POST ${endpoint}`);
    }
  }

  /**
   * PUT 요청
   * @param endpoint 엔드포인트 경로
   * @param data 요청 데이터
   * @param config 추가 설정
   * @returns API 응답
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.httpClient.put<T>(endpoint, data, config);

      return {
        success: true,
        data: response.data,
        headers: this.extractResponseHeaders(response),
      };
    } catch (error) {
      return this.handleError(error, `PUT ${endpoint}`);
    }
  }

  /**
   * DELETE 요청
   * @param endpoint 엔드포인트 경로
   * @param config 추가 설정
   * @returns API 응답
   */
  async delete<T = any>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.httpClient.delete<T>(endpoint, config);

      return {
        success: true,
        data: response.data,
        headers: this.extractResponseHeaders(response),
      };
    } catch (error) {
      return this.handleError(error, `DELETE ${endpoint}`);
    }
  }

  /**
   * 응답 헤더에서 필요한 정보 추출
   * @param response Axios 응답 객체
   * @returns 응답 헤더 정보
   */
  private extractResponseHeaders<T>(
    response: AxiosResponse<T>
  ): ResponseHeaders | undefined {
    const contYn = response.headers["cont-yn"];
    const nextKey = response.headers["next-key"];
    const apiId = response.headers["api-id"];

    if (!contYn && !nextKey && !apiId) {
      return undefined;
    }

    return {
      contYn,
      nextKey,
      apiId,
    };
  }

  /**
   * 요청 인터셉터 설정
   */
  private setupRequestInterceptor(): void {
    this.httpClient.interceptors.request.use(
      async (config) => {
        try {
          // 인증 헤더 추가
          const authHeader = await this.tokenManager.getAuthorizationHeader();
          config.headers.Authorization = authHeader;

          logger.debug("API 요청", {
            method: config.method?.toUpperCase(),
            url: config.url,
            params: config.params,
          });

          return config;
        } catch (error) {
          logger.error("요청 인터셉터 오류", error);
          return Promise.reject(error);
        }
      },
      (error) => {
        logger.error("요청 인터셉터 오류", error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * 응답 인터셉터 설정
   */
  private setupResponseInterceptor(): void {
    this.httpClient.interceptors.response.use(
      (response) => {
        logger.debug("API 응답", {
          status: response.status,
          url: response.config.url,
        });

        return response;
      },
      (error) => {
        if (axios.isAxiosError(error) && error.response) {
          logger.error("API 오류 응답", {
            status: error.response.status,
            url: error.config?.url,
            data: error.response.data,
          });

          // 401 오류 발생 시 토큰 갱신 필요
          if (error.response.status === 401) {
            // 토큰 초기화
            this.tokenManager.revokeToken().catch(() => {
              logger.error("토큰 초기화 실패");
            });
          }
        } else {
          logger.error("API 요청 실패", error);
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * 오류 처리
   * @param error 발생한 오류
   * @param request 요청 정보
   * @returns 오류 응답
   */
  private handleError(error: any, request: string): ApiResponse {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: `API 요청 실패: ${request}`,
        error: error.response.data?.message || error.message,
      };
    }

    return {
      success: false,
      message: `API 요청 실패: ${request}`,
      error: error.message || "알 수 없는 오류",
    };
  }
}

export default BaseApiClient;
