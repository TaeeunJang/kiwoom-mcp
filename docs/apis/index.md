# API 레퍼런스 문서

키움증권 Open API를 활용한 API 클라이언트 라이브러리 레퍼런스 문서입니다. 다양한 금융 정보 조회와 주문 기능을 제공합니다.

## 제공되는 API 모듈

- [종목정보 API](./stock-info.md) - 주식 기본 정보, 거래원 정보, 변동성완화장치 발동종목 등
- [실시간 시세 API](./realtime.md) - 주식 호가, 일별 주가, 시간외 단일가, 체결강도 등
- [계좌정보 API](./account.md) - 계좌 조회, 잔고 조회, 일별 수익률 등
- [주문 API](./order.md) - 주식 주문, 정정, 취소, 주문 내역 조회 등

## 시작하기

### 설치

```bash
npm install @kiwoom/mcp-api
```

### 기본 사용법

```typescript
import { StockInfoClient, RealtimeClient } from "@kiwoom/mcp-api";

// 클라이언트 인스턴스 생성
const stockInfoClient = new StockInfoClient();
const realtimeClient = new RealtimeClient();

// 종목 기본 정보 조회
async function getStockInfo() {
  const response = await stockInfoClient.getStockBasicInfo("KRX:005930");
  if (response.success) {
    console.log(response.data);
  } else {
    console.error("에러:", response.error);
  }
}

// 주식 호가 정보 조회
async function getStockQuote() {
  const response = await realtimeClient.getStockQuote("KRX:005930");
  if (response.success) {
    console.log(response.data);
  } else {
    console.error("에러:", response.error);
  }
}
```

## 인증 및 토큰 관리

API 호출 시 인증을 위한 접근 토큰은 자동으로 관리됩니다. 토큰 발급, 갱신, 관리는 내부 `TokenManager` 클래스에서 처리합니다.

```typescript
import { TokenManager } from "@kiwoom/mcp-api";

// 커스텀 토큰 관리자 생성
const tokenManager = new TokenManager({
  appKey: "YOUR_APP_KEY",
  appSecret: "YOUR_APP_SECRET",
});

// 토큰 관리자를 직접 전달하여 클라이언트 생성
const client = new StockInfoClient(
  { baseUrl: "https://api.kiwoom.com" },
  tokenManager
);
```

## API 응답 형식

모든 API 호출은 다음과 같은 공통 응답 형식을 가집니다:

```typescript
interface ApiResponse<T = any> {
  // 요청 성공 여부
  success: boolean;

  // 성공 시 응답 데이터
  data?: T;

  // 실패 시 오류 메시지
  message?: string;

  // 실패 시 상세 오류 정보
  error?: any;

  // 연속 조회 관련 헤더 정보
  headers?: ResponseHeaders;
}

interface ResponseHeaders {
  // 연속 조회 여부 (Y/N)
  "cont-yn"?: string;

  // 연속 조회 키
  "next-key"?: string;

  // API ID (TR 코드)
  "api-id"?: string;
}
```

## 오류 처리

API 요청 중 발생한 오류는 응답 객체의 `success` 필드가 `false`로 설정되고, `message`와 `error` 필드에 오류 상세 정보가 포함됩니다.

```typescript
const response = await client.getStockBasicInfo("INVALID_CODE");
if (!response.success) {
  console.error(`오류 발생: ${response.message}`);
  console.error("상세 오류:", response.error);
}
```

## 연속 조회

대량의 데이터를 조회할 때는 연속 조회를 사용할 수 있습니다.

```typescript
async function getAllData() {
  let contYn = "N";
  let nextKey = "";
  let allData = [];

  do {
    const response = await client.someMethod("PARAM", contYn, nextKey);
    if (response.success) {
      allData = [...allData, ...response.data];

      // 연속 조회 정보 갱신
      contYn = response.headers?.["cont-yn"] || "N";
      nextKey = response.headers?.["next-key"] || "";
    } else {
      console.error("오류 발생:", response.error);
      break;
    }
  } while (contYn === "Y");

  return allData;
}
```

## API 클라이언트 설정

각 API 클라이언트는 생성 시 다양한 설정을 지원합니다.

```typescript
import { StockInfoClient } from "@kiwoom/mcp-api";

const client = new StockInfoClient({
  // 기본 URL (운영 또는 모의투자)
  baseUrl: "https://api.kiwoom.com",

  // 요청 타임아웃 (밀리초)
  timeout: 10000,

  // 앱 키
  appKey: "YOUR_APP_KEY",

  // 앱 시크릿
  appSecret: "YOUR_APP_SECRET",

  // 자동 재시도 횟수
  retryCount: 3,

  // 토큰 자동 갱신 여부
  autoRefreshToken: true,
});
```
