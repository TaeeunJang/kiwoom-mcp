# 실시간 시세 API 레퍼런스

실시간 시세 API는 주식 호가, 일별 주가, 시간외 단일가, 체결강도 등 다양한 시세 정보를 제공합니다.

## 기본 정보

| 항목              | 설명                                        |
| ----------------- | ------------------------------------------- |
| 도메인 (운영)     | https://api.kiwoom.com                      |
| 도메인 (모의투자) | https://mockapi.kiwoom.com (KRX만 지원가능) |
| URL               | /api/dostk/mrkcond                          |
| Format            | JSON                                        |
| Content-Type      | application/json;charset=UTF-8              |

## API 클라이언트 사용 방법

```typescript
import { RealtimeClient } from "../../apis/realtime";

// 클라이언트 인스턴스 생성
const client = new RealtimeClient();

// 주식호가 정보 조회
const quoteInfo = await client.getStockQuote("KRX:005930");
console.log(quoteInfo.data);

// 일별 주가 정보 조회
const dailyPrice = await client.getDailyStockPrice("KRX:005930");
console.log(dailyPrice.data);
```

## API 목록

### 주식호가 정보 조회 (`getStockQuote`)

종목의 10단계 호가 정보를 조회합니다.

#### 파라미터

| 파라미터 | 타입   | 필수 | 설명                                                    |
| -------- | ------ | ---- | ------------------------------------------------------- |
| code     | string | Y    | 종목코드 (예: KRX:005930, NXT:039490_NX, SOR:039490_AL) |
| contYn   | string | N    | 연속조회여부 (Y/N)                                      |
| nextKey  | string | N    | 연속조회키                                              |

#### 응답

`StockQuoteInfo` 타입으로 응답됩니다. 주요 필드는 다음과 같습니다:

| 필드                 | 설명                                                 |
| -------------------- | ---------------------------------------------------- |
| bid_req_base_tm      | 호가잔량기준시간 (호가시간)                          |
| sel_10th_pre_req_pre | 매도10차선잔량대비 (매도호가직전대비10)              |
| sel_10th_pre_req     | 매도10차선잔량 (매도호가수량10)                      |
| sel_10th_pre_bid     | 매도10차선호가 (매도호가10)                          |
| sel_9th_pre_req_pre  | 매도9차선잔량대비 (매도호가직전대비9)                |
| sel_9th_pre_req      | 매도9차선잔량 (매도호가수량9)                        |
| sel_9th_pre_bid      | 매도9차선호가 (매도호가9)                            |
| sel_8th_pre_req_pre  | 매도8차선잔량대비 (매도호가직전대비8)                |
| sel_8th_pre_req      | 매도8차선잔량 (매도호가수량8)                        |
| sel_8th_pre_bid      | 매도8차선호가 (매도호가8)                            |
| sel_7th_pre_req_pre  | 매도7차선잔량대비 (매도호가직전대비7)                |
| sel_7th_pre_req      | 매도7차선잔량 (매도호가수량7)                        |
| sel_7th_pre_bid      | 매도7차선호가 (매도호가7)                            |
| sel_6th_pre_req_pre  | 매도6차선잔량대비 (매도호가직전대비6)                |
| sel_6th_pre_req      | 매도6차선잔량 (매도호가수량6)                        |
| sel_6th_pre_bid      | 매도6차선호가 (매도호가6)                            |
| sel_5th_pre_req_pre  | 매도5차선잔량대비 (매도호가직전대비5)                |
| sel_5th_pre_req      | 매도5차선잔량 (매도호가수량5)                        |
| sel_5th_pre_bid      | 매도5차선호가 (매도호가5)                            |
| sel_4th_pre_req_pre  | 매도4차선잔량대비 (매도호가직전대비4)                |
| sel_4th_pre_req      | 매도4차선잔량 (매도호가수량4)                        |
| sel_4th_pre_bid      | 매도4차선호가 (매도호가4)                            |
| sel_3th_pre_req_pre  | 매도3차선잔량대비 (매도호가직전대비3)                |
| sel_3th_pre_req      | 매도3차선잔량 (매도호가수량3)                        |
| sel_3th_pre_bid      | 매도3차선호가 (매도호가3)                            |
| sel_2th_pre_req_pre  | 매도2차선잔량대비 (매도호가직전대비2)                |
| sel_2th_pre_req      | 매도2차선잔량 (매도호가수량2)                        |
| sel_2th_pre_bid      | 매도2차선호가 (매도호가2)                            |
| sel_1th_pre_req_pre  | 매도1차선잔량대비 (매도호가직전대비1)                |
| sel_fpr_req          | 매도최우선잔량 (매도호가수량1)                       |
| sel_fpr_bid          | 매도최우선호가 (매도호가1)                           |
| buy_fpr_bid          | 매수최우선호가 (매수호가1)                           |
| buy_fpr_req          | 매수최우선잔량 (매수호가수량1)                       |
| buy_1th_pre_req_pre  | 매수1차선잔량대비 (매수호가직전대비1)                |
| buy_2th_pre_bid      | 매수2차선호가 (매수호가2)                            |
| buy_2th_pre_req      | 매수2차선잔량 (매수호가수량2)                        |
| buy_2th_pre_req_pre  | 매수2차선잔량대비 (매수호가직전대비2)                |
| buy_3th_pre_bid      | 매수3차선호가 (매수호가3)                            |
| buy_3th_pre_req      | 매수3차선잔량 (매수호가수량3)                        |
| buy_3th_pre_req_pre  | 매수3차선잔량대비 (매수호가직전대비3)                |
| buy_4th_pre_bid      | 매수4차선호가 (매수호가4)                            |
| buy_4th_pre_req      | 매수4차선잔량 (매수호가수량4)                        |
| buy_4th_pre_req_pre  | 매수4차선잔량대비 (매수호가직전대비4)                |
| buy_5th_pre_bid      | 매수5차선호가 (매수호가5)                            |
| buy_5th_pre_req      | 매수5차선잔량 (매수호가수량5)                        |
| buy_5th_pre_req_pre  | 매수5차선잔량대비 (매수호가직전대비5)                |
| buy_6th_pre_bid      | 매수6차선호가 (매수호가6)                            |
| buy_6th_pre_req      | 매수6차선잔량 (매수호가수량6)                        |
| buy_6th_pre_req_pre  | 매수6차선잔량대비 (매수호가직전대비6)                |
| buy_7th_pre_bid      | 매수7차선호가 (매수호가7)                            |
| buy_7th_pre_req      | 매수7차선잔량 (매수호가수량7)                        |
| buy_7th_pre_req_pre  | 매수7차선잔량대비 (매수호가직전대비7)                |
| buy_8th_pre_bid      | 매수8차선호가 (매수호가8)                            |
| buy_8th_pre_req      | 매수8차선잔량 (매수호가수량8)                        |
| buy_8th_pre_req_pre  | 매수8차선잔량대비 (매수호가직전대비8)                |
| buy_9th_pre_bid      | 매수9차선호가 (매수호가9)                            |
| buy_9th_pre_req      | 매수9차선잔량 (매수호가수량9)                        |
| buy_9th_pre_req_pre  | 매수9차선잔량대비 (매수호가직전대비9)                |
| buy_10th_pre_bid     | 매수10차선호가 (매수호가10)                          |
| buy_10th_pre_req     | 매수10차선잔량 (매수호가수량10)                      |
| buy_10th_pre_req_pre | 매수10차선잔량대비 (매수호가직전대비10)              |
| tot_sel_req_jub_pre  | 총매도잔량직전대비 (매도호가총잔량직전대비)          |
| tot_sel_req          | 총매도잔량 (매도호가총잔량)                          |
| tot_buy_req          | 총매수잔량 (매수호가총잔량)                          |
| tot_buy_req_jub_pre  | 총매수잔량직전대비 (매수호가총잔량직전대비)          |
| ovt_sel_req_pre      | 시간외매도잔량대비 (시간외 매도호가 총잔량 직전대비) |
| ovt_sel_req          | 시간외매도잔량 (시간외 매도호가 총잔량)              |
| ovt_buy_req          | 시간외매수잔량 (시간외 매수호가 총잔량)              |
| ovt_buy_req_pre      | 시간외매수잔량대비 (시간외 매수호가 총잔량 직전대비) |

#### 예제 코드

```typescript
const response = await client.getStockQuote("KRX:005930");
if (response.success) {
  const quoteInfo = response.data;
  console.log(`호가 기준시간: ${quoteInfo.bid_req_base_tm}`);
  console.log(
    `매도1호가: ${quoteInfo.sel_fpr_bid}, 잔량: ${quoteInfo.sel_fpr_req}`
  );
  console.log(
    `매수1호가: ${quoteInfo.buy_fpr_bid}, 잔량: ${quoteInfo.buy_fpr_req}`
  );
  console.log(`총매도잔량: ${quoteInfo.tot_sel_req}`);
  console.log(`총매수잔량: ${quoteInfo.tot_buy_req}`);
}
```

### 일별 주가 정보 조회 (`getDailyStockPrice`)

종목의 일별 주가 정보를 조회합니다.

#### 파라미터

| 파라미터 | 타입   | 필수 | 설명                                                    |
| -------- | ------ | ---- | ------------------------------------------------------- |
| code     | string | Y    | 종목코드 (예: KRX:005930, NXT:039490_NX, SOR:039490_AL) |
| contYn   | string | N    | 연속조회여부 (Y/N)                                      |
| nextKey  | string | N    | 연속조회키                                              |

#### 예제 코드

```typescript
const response = await client.getDailyStockPrice("KRX:005930");
if (response.success) {
  const dailyPriceInfo = response.data;
  console.log("일별 주가 정보:", dailyPriceInfo);
}
```

### 시간외 단일가 정보 조회 (`getAfterHoursPrice`)

종목의 시간외 단일가 정보를 조회합니다.

#### 파라미터

| 파라미터 | 타입   | 필수 | 설명                                                    |
| -------- | ------ | ---- | ------------------------------------------------------- |
| code     | string | Y    | 종목코드 (예: KRX:005930, NXT:039490_NX, SOR:039490_AL) |
| contYn   | string | N    | 연속조회여부 (Y/N)                                      |
| nextKey  | string | N    | 연속조회키                                              |

#### 예제 코드

```typescript
const response = await client.getAfterHoursPrice("KRX:005930");
if (response.success) {
  const afterHoursInfo = response.data;
  console.log("시간외 단일가 정보:", afterHoursInfo);
}
```

### 체결강도 시간별 추이 조회 (`getHourlyTradingStrength`)

종목의 체결강도 시간별 추이를 조회합니다.

#### 파라미터

| 파라미터 | 타입   | 필수 | 설명                                                    |
| -------- | ------ | ---- | ------------------------------------------------------- |
| code     | string | Y    | 종목코드 (예: KRX:005930, NXT:039490_NX, SOR:039490_AL) |
| contYn   | string | N    | 연속조회여부 (Y/N)                                      |
| nextKey  | string | N    | 연속조회키                                              |

#### 예제 코드

```typescript
const response = await client.getHourlyTradingStrength("KRX:005930");
if (response.success) {
  const tradingStrengthInfo = response.data;
  console.log("체결강도 시간별 추이:", tradingStrengthInfo);
}
```

## 상수 및 타입

### API TR 코드

```typescript
export const RealtimeApiId = {
  /**
   * 주식호가요청 (ka10004)
   */
  STOCK_QUOTE: "ka10004",

  /**
   * 주식일주월시분요청 (ka10005)
   */
  STOCK_PRICE_TIME_SERIES: "ka10005",

  /**
   * 주식시분요청 (ka10006)
   */
  STOCK_MINUTE_PRICE: "ka10006",

  /**
   * 시세표성정보요청 (ka10007)
   */
  MARKET_INDICATOR: "ka10007",

  /**
   * 신주인수권전체시세요청 (ka10011)
   */
  SUBSCRIPTION_RIGHTS: "ka10011",

  /**
   * 일별기관매매종목요청 (ka10044)
   */
  DAILY_INSTITUTIONAL_TRADING: "ka10044",

  /**
   * 종목별기관매매추이요청 (ka10045)
   */
  STOCK_INSTITUTIONAL_TRADING_TREND: "ka10045",

  /**
   * 체결강도추이시간별요청 (ka10046)
   */
  HOURLY_TRADING_STRENGTH: "ka10046",

  /**
   * 체결강도추이일별요청 (ka10047)
   */
  DAILY_TRADING_STRENGTH: "ka10047",

  /**
   * 장중투자자별매매요청 (ka10063)
   */
  INTRADAY_INVESTOR_TRADING: "ka10063",

  /**
   * 장마감후투자자별매매요청 (ka10066)
   */
  CLOSING_INVESTOR_TRADING: "ka10066",

  /**
   * 증권사별종목매매동향요청 (ka10078)
   */
  BROKER_STOCK_TRADING_TREND: "ka10078",

  /**
   * 일별주가요청 (ka10086)
   */
  DAILY_STOCK_PRICE: "ka10086",

  /**
   * 시간외단일가요청 (ka10087)
   */
  AFTER_HOURS_PRICE: "ka10087",

  /**
   * 프로그램매매추이요청 시간대별 (ka90005)
   */
  HOURLY_PROGRAM_TRADING: "ka90005",

  /**
   * 프로그램매매차익잔고추이요청 (ka90006)
   */
  PROGRAM_TRADING_BALANCE: "ka90006",

  /**
   * 프로그램매매누적추이요청 (ka90007)
   */
  PROGRAM_TRADING_CUMULATIVE: "ka90007",

  /**
   * 종목시간별프로그램매매추이요청 (ka90008)
   */
  STOCK_HOURLY_PROGRAM_TRADING: "ka90008",

  /**
   * 프로그램매매추이요청 일자별 (ka90010)
   */
  DAILY_PROGRAM_TRADING: "ka90010",

  /**
   * 종목일별프로그램매매추이요청 (ka90013)
   */
  STOCK_DAILY_PROGRAM_TRADING: "ka90013",
} as const;

export type RealtimeApiIdType =
  (typeof RealtimeApiId)[keyof typeof RealtimeApiId];
```
