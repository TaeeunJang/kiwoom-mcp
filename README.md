# 키움증권 OpenAPI MCP 서버

키움증권 OpenAPI를 REST API로 변환하여 제공하는 MCP(Message Control Program) 서버 프로젝트입니다.

## 기능

- 키움증권 OpenAPI REST API 연동
- OAuth 인증 처리
- 모든 API 그룹 지원
  - 종목정보
  - 시세
  - 기관/외국인
  - 업종
  - 순위정보
  - ELW
  - 차트
  - 계좌
  - ETF
  - 테마
  - 주문
  - 실시간시세
  - 조건검색
  - 신용주문

## 설치 방법

```bash
# 저장소 클론
git clone https://github.com/yourusername/kiwoom-mcp.git
cd kiwoom-mcp

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

## 환경 설정

`.env` 파일을 생성하고 다음과 같이 설정합니다:

```
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug

# 키움증권 REST API 키
KIWOOM_APP_KEY=your_app_key
KIWOOM_SECRET_KEY=your_secret_key
```

## API 문서

### 인증 API

- POST /api/auth/token: 접근 토큰 발급
- POST /api/auth/revoke: 접근 토큰 폐기
- GET /api/auth/status: 토큰 상태 확인

### 종목정보 API

- GET /api/stock-info/basic: 종목기본정보 조회
- GET /api/stock-info/after-hours: 종목시간외단일가 조회
- GET /api/stock-info/investor-trend: 종목별투자자기관별동향 조회
- GET /api/stock-info/broker-buying: 종목별증권사순매수 조회

### 시세 API

- GET /api/price/current: 현재가 조회
- GET /api/price/orderbook: 호가 조회
- GET /api/price/daily: 일봉 조회
- GET /api/price/minute: 분봉 조회
- GET /api/price/volume: 거래량 조회

### 계좌 API

- GET /api/account/list: 계좌 목록 조회
- GET /api/account/balance: 계좌 잔고 조회
- GET /api/account/profit: 계좌 수익률 조회
- GET /api/account/order-history: 주문 내역 조회
- GET /api/account/trade-history: 체결 내역 조회

### 주문 API

- POST /api/order/stock: 주식 주문
- POST /api/order/cancel: 주문 취소
- POST /api/order/modify: 주문 정정
- GET /api/order/orderable-amount: 주문 가능 금액 조회

### 실시간시세 API

- POST /api/realtime/subscribe: 실시간시세 구독
- POST /api/realtime/unsubscribe: 실시간시세 구독 해제
- GET /api/realtime/subscriptions: 실시간시세 구독 목록 조회

## 라이센스

MIT
