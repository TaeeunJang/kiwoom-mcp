# 키움 MCP 서버

키움증권 OpenAPI를 활용한 RESTful API 서비스 서버입니다.

## 기능

- 주식 정보 API
- 계좌 정보 API
- 주문 API
- 실시간 데이터 API

## 시작하기

### 필요 조건

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

### 환경 변수 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 필요한 환경 변수를 설정하세요:

```bash
cp .env.example .env
```

## API 문서

### 주식 정보 API

- `GET /api/v1/stock/basic/:code` - 주식 기본 정보 조회
- `GET /api/v1/stock/after-hours/:code` - 시간외 주가 정보 조회
- `GET /api/v1/stock/investor-trend/:code` - 투자자 매매 동향 조회
- `GET /api/v1/stock/broker-buying/:code` - 증권사 매매 정보 조회

### 계좌 정보 API (개발 예정)

- `GET /api/v1/account/balance` - 계좌 잔고 조회
- `GET /api/v1/account/portfolio` - 보유 종목 조회

### 주문 API (개발 예정)

- `POST /api/v1/order` - 주문 접수
- `GET /api/v1/order/:orderId` - 주문 상태 조회
- `DELETE /api/v1/order/:orderId` - 주문 취소

### 실시간 API (개발 예정)

- `WebSocket /api/v1/realtime/price` - 실시간 시세 스트리밍
- `WebSocket /api/v1/realtime/order` - 실시간 주문 스트리밍
