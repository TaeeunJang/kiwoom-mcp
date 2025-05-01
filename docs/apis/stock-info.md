# 종목정보 API 레퍼런스

종목정보 API는 주식의 기본 정보, 거래원 정보, 변동성완화장치 발동종목 등 다양한 종목 관련 정보를 제공합니다.

## 기본 정보

| 항목              | 설명                                        |
| ----------------- | ------------------------------------------- |
| 도메인 (운영)     | https://api.kiwoom.com                      |
| 도메인 (모의투자) | https://mockapi.kiwoom.com (KRX만 지원가능) |
| URL               | /api/dostk/stkinfo                          |
| Format            | JSON                                        |
| Content-Type      | application/json;charset=UTF-8              |

## API 클라이언트 사용 방법

```typescript
import { StockInfoClient } from "../../apis/stock-info";

// 클라이언트 인스턴스 생성
const client = new StockInfoClient();

// 종목 기본 정보 조회
const stockInfo = await client.getStockBasicInfo("KRX:005930");
console.log(stockInfo.data);

// VI 발동종목 조회
const viStocks = await client.getVolatilityControlStocks("001", "1");
console.log(viStocks.data);
```

## API 목록

### 종목 기본 정보 조회 (`getStockBasicInfo`)

주식의 기본 정보를 조회합니다.

#### 파라미터

| 파라미터 | 타입   | 필수 | 설명                                                    |
| -------- | ------ | ---- | ------------------------------------------------------- |
| code     | string | Y    | 종목코드 (예: KRX:005930, NXT:039490_NX, SOR:039490_AL) |
| contYn   | string | N    | 연속조회여부 (Y/N)                                      |
| nextKey  | string | N    | 연속조회키                                              |

#### 응답

`StockBasicInfo` 타입으로 응답됩니다. 주요 필드는 다음과 같습니다:

| 필드                  | 설명                                        |
| --------------------- | ------------------------------------------- |
| stk_cd                | 종목코드 (거래소별 종목코드)                |
| stk_nm                | 종목명 (주식의 이름)                        |
| setl_mm               | 결산월 (회계 결산이 이루어지는 월)          |
| fav                   | 액면가 (주식 1주당 액면 금액)               |
| cap                   | 자본금 (회사의 총 자본금)                   |
| flo_stk               | 상장주식 (상장된 총 주식 수)                |
| crd_rt                | 신용비율 (신용거래 비율)                    |
| oyr_hgst              | 연중최고 (연중 기록한 최고가)               |
| oyr_lwst              | 연중최저 (연중 기록한 최저가)               |
| mac                   | 시가총액 (총 시가 가치)                     |
| mac_wght              | 시가총액비중 (전체 시장 대비 비중)          |
| for_exh_rt            | 외인소진률 (외국인 보유 한도 소진율)        |
| repl_pric             | 대용가 (담보대출 시 적용되는 평가 가격)     |
| per                   | PER (주가수익비율)                          |
| eps                   | EPS (주당순이익)                            |
| roe                   | ROE (자기자본이익률)                        |
| pbr                   | PBR (주가순자산비율)                        |
| ev                    | EV (기업가치)                               |
| bps                   | BPS (주당순자산가치)                        |
| sale_amt              | 매출액 (기업의 총 매출액)                   |
| bus_pro               | 영업이익 (기업의 영업 활동 이익)            |
| cup_nga               | 당기순이익 (법인세 등 제외한 최종 이익)     |
| "250hgst"             | 250최고 (250일간 기록한 최고가)             |
| "250lwst"             | 250최저 (250일간 기록한 최저가)             |
| high_pric             | 고가 (당일 기록한 최고가)                   |
| open_pric             | 시가 (당일 시작 가격)                       |
| low_pric              | 저가 (당일 기록한 최저가)                   |
| upl_pric              | 상한가 (당일 최대 상승 가능 가격)           |
| lst_pric              | 하한가 (당일 최대 하락 가능 가격)           |
| base_pric             | 기준가 (당일 가격 변동의 기준이 되는 가격)  |
| exp_cntr_pric         | 예상체결가 (장 시작 전 예상되는 시작 가격)  |
| exp_cntr_qty          | 예상체결수량 (장 시작 전 예상 체결 수량)    |
| "250hgst_pric_dt"     | 250최고가일 (250일 중 최고가 기록한 날짜)   |
| "250hgst_pric_pre_rt" | 250최고가대비율 (현재가 대비 등락률)        |
| "250lwst_pric_dt"     | 250최저가일 (250일 중 최저가 기록한 날짜)   |
| "250lwst_pric_pre_rt" | 250최저가대비율 (현재가 대비 등락률)        |
| cur_prc               | 현재가 (종목의 현재 주가)                   |
| pre_sig               | 대비기호 (전일 대비 상승/하락 기호)         |
| pred_pre              | 전일대비 (전일 종가 대비 현재가의 차이)     |
| flu_rt                | 등락율 (전일 종가 대비 현재가의 변동률)     |
| trde_qty              | 거래량 (당일 거래된 주식의 수량)            |
| trde_pre              | 거래대비 (거래량의 전일 대비 변화)          |
| fav_unit              | 액면가단위 (액면가의 단위)                  |
| dstr_stk              | 유통주식 (실제 시장에서 유통되는 주식 수)   |
| dstr_rt               | 유통비율 (전체 상장주식 대비 유통주식 비율) |

#### 예제 코드

```typescript
const response = await client.getStockBasicInfo("KRX:005930");
if (response.success) {
  const stockInfo = response.data;
  console.log(`종목명: ${stockInfo.stk_nm}`);
  console.log(`현재가: ${stockInfo.cur_prc}`);
  console.log(`시가총액: ${stockInfo.mac}`);
}
```

### 변동성완화장치 발동종목 조회 (`getVolatilityControlStocks`)

변동성완화장치(VI)가 발동된 종목 목록을 조회합니다.

#### 파라미터

| 파라미터          | 타입   | 필수 | 기본값      | 설명                                                   |
| ----------------- | ------ | ---- | ----------- | ------------------------------------------------------ |
| marketType        | string | Y    | "000"       | 시장구분 (000:전체, 001:코스피, 101:코스닥)            |
| beforeMarketType  | string | Y    | "0"         | 장전구분 (0:전체, 1:정규시장, 2:시간외단일가)          |
| stockCode         | string | N    | -           | 종목코드 (공백시 전체종목조회)                         |
| motionType        | string | Y    | "0"         | 발동구분 (0:전체, 1:정적VI, 2:동적VI, 3:동적VI+정적VI) |
| skipStock         | string | Y    | "000000000" | 제외종목 설정 (9자리, 0:포함, 1:제외)                  |
| tradeQtyType      | string | Y    | "0"         | 거래량구분 (0:사용안함, 1:사용)                        |
| minTradeQty       | string | Y    | "0"         | 최소거래량                                             |
| maxTradeQty       | string | Y    | "100000000" | 최대거래량                                             |
| tradePriceType    | string | Y    | "0"         | 거래대금구분 (0:사용안함, 1:사용)                      |
| minTradePrice     | string | Y    | "0"         | 최소거래대금                                           |
| maxTradePrice     | string | Y    | "100000000" | 최대거래대금                                           |
| motionDirection   | string | Y    | "0"         | 발동방향 (0:전체, 1:상승, 2:하락)                      |
| stockExchangeType | string | Y    | "1"         | 거래소구분 (1:KRX, 2:NXT, 3:통합)                      |
| contYn            | string | N    | -           | 연속조회여부 (Y/N)                                     |
| nextKey           | string | N    | -           | 연속조회키                                             |

#### 응답

`VolatilityControlStock` 타입으로 응답됩니다. 주요 필드는 다음과 같습니다:

| 필드     | 설명                          |
| -------- | ----------------------------- |
| motn_stk | 발동종목 목록 (MotionStock[]) |

`MotionStock` 타입의 주요 필드:

| 필드                 | 설명                                     |
| -------------------- | ---------------------------------------- |
| stk_cd               | 종목코드 (거래소별 종목코드)             |
| stk_nm               | 종목명 (주식의 이름)                     |
| acc_trde_qty         | 누적거래량 (당일 누적된 거래량)          |
| motn_pric            | 발동가격 (VI가 발동된 주가)              |
| dynm_dispty_rt       | 동적괴리율 (동적 가격 제한폭과의 괴리율) |
| trde_cntr_proc_time  | 매매체결처리시각 (VI 발동 시 처리 시각)  |
| virelis_time         | VI해제시각 (VI가 해제되는 시각)          |
| viaplc_tp            | VI적용구분 (VI 적용 유형)                |
| dynm_stdpc           | 동적기준가격 (동적 VI 적용의 기준 가격)  |
| static_stdpc         | 정적기준가격 (정적 VI 적용의 기준 가격)  |
| static_dispty_rt     | 정적괴리율 (정적 가격 제한폭과의 괴리율) |
| open_pric_pre_flu_rt | 시가대비등락률 (당일 시가 대비 등락률)   |
| vimotn_cnt           | VI발동횟수 (당일 VI 발동 횟수)           |
| stex_tp              | 거래소구분 (KRX, NXT 등)                 |

#### 예제 코드

```typescript
// 코스피 시장의 정규장 VI 발동종목 조회
const response = await client.getVolatilityControlStocks(
  "001",
  "1",
  undefined,
  "0"
);
if (
  response.success &&
  response.data.motn_stk &&
  response.data.motn_stk.length > 0
) {
  const viStocks = response.data.motn_stk;
  console.log(`총 ${viStocks.length}개 종목에서 VI 발동`);

  viStocks.forEach((stock) => {
    console.log(`종목: ${stock.stk_nm}, 발동가격: ${stock.motn_pric}`);
  });
}
```

## 상수 및 타입

### API TR 코드

```typescript
export const StockInfoApiId = {
  /** 주식기본정보요청 */
  BASIC_INFO: "ka10001",

  /** 주식거래원요청 */
  BROKER_INFO: "ka10002",

  /** 체결정보요청 */
  TRADE_INFO: "ka10003",

  /** 신용매매동향요청 */
  CREDIT_TREND: "ka10013",

  /** 일별거래상세요청 */
  DAILY_DETAIL: "ka10015",

  /** 신고저가요청 */
  NEW_HIGH_LOW: "ka10016",

  /** 상하한가요청 */
  LIMIT_PRICE: "ka10017",

  /** 고저가근접요청 */
  NEAR_HIGH_LOW: "ka10018",

  /** 가격급등락요청 */
  PRICE_SURGE_FALL: "ka10019",

  /** 거래량갱신요청 */
  VOLUME_RENEWAL: "ka10024",

  /** 매물대집중요청 */
  PRICE_CONCENTRATION: "ka10025",

  /** 고저PER요청 */
  HIGH_LOW_PER: "ka10026",

  /** 시가대비등락률요청 */
  OPEN_PRICE_CHANGE: "ka10028",

  /** 거래원매물대분석요청 */
  BROKER_PRICE_ANALYSIS: "ka10043",

  /** 거래원순간거래량요청 */
  BROKER_INSTANT_VOLUME: "ka10052",

  /** 변동성완화장치발동종목요청 */
  VOLATILITY_CONTROL: "ka10054",

  /** 당일전일체결량요청 */
  TODAY_PREV_VOLUME: "ka10055",

  /** 투자자별일별매매종목요청 */
  INVESTOR_DAILY_TRADE: "ka10058",

  /** 종목별투자자기관별요청 */
  INVESTOR_BY_STOCK: "ka10059",

  /** 종목별투자자기관별합계요청 */
  INVESTOR_BY_STOCK_TOTAL: "ka10061",

  /** 당일전일체결요청 */
  TODAY_PREV_TRADE: "ka10084",

  /** 관심종목정보요청 */
  FAVORITE_STOCK_INFO: "ka10095",

  /** 종목정보 리스트 */
  STOCK_INFO_LIST: "ka10099",

  /** 종목정보 조회 */
  STOCK_INFO: "ka10100",

  /** 업종코드 리스트 */
  SECTOR_CODE_LIST: "ka10101",

  /** 회원사 리스트 */
  BROKER_LIST: "ka10102",

  /** 프로그램순매수상위50요청 */
  PROGRAM_TOP50_NET_BUY: "ka90003",

  /** 종목별프로그램매매현황요청 */
  PROGRAM_TRADE_BY_STOCK: "ka90004",

  /** 대차거래내역요청 */
  BORROWED_TRADE: "ka90012",
} as const;

export type StockInfoApiIdType =
  (typeof StockInfoApiId)[keyof typeof StockInfoApiId];
```
