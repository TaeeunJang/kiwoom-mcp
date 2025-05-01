# 기관/외국인 API 참조 문서

기관 투자자와 외국인 투자자의 매매동향 및 관련 정보를 조회하는 API입니다.

## 기본 정보

- **운영 도메인**: https://openapi.kbsec.com
- **모의 도메인**: https://openapivts.kbsec.com
- **URL**: /uapi/domestic-stock/v1/trading/foreign-institutional
- **포맷**: JSON
- **Content-Type**: application/json;charset=UTF-8

## API 클라이언트 사용 방법

`ForeignInstitutionalClient` 클래스를 사용하여 기관/외국인 API에 접근할 수 있습니다.

```typescript
import { ForeignInstitutionalClient } from "@kiwoom/core/apis/foreign-institutional";

// 클라이언트 인스턴스 생성
const client = new ForeignInstitutionalClient();

// 외국인 종목별 매매동향 조회
const foreignTrend = await client.getForeignInvestorTrend(
  "005930",
  "20240101",
  "20240531"
);

// 기관 투자자 정보 조회
const institutionalInfo = await client.getInstitutionalInvestorInfo(
  "005930",
  "20240531"
);

// 외국인/기관 연속매매 현황 조회
const continuousTrading = await client.getContinuousTradingStatus(
  "J",
  "1",
  "1",
  "2"
);
```

## 메서드 설명

### getForeignInvestorTrend

외국인 투자자의 종목별 매매동향 정보를 조회합니다.

**파라미터**:

- `code` (string): 종목코드
- `startDate` (string, 선택): 시작일자 (YYYYMMDD 형식)
- `endDate` (string, 선택): 종료일자 (YYYYMMDD 형식)

**응답 예시**:

```json
{
  "success": true,
  "data": {
    "stk_frgnr": [
      {
        "dt": "20240531",
        "close_pric": "83400",
        "pred_pre": "1200",
        "trde_qty": "2578612",
        "chg_qty": "45326",
        "poss_stkcnt": "3256891423",
        "wght": "52.36",
        "gain_pos_stkcnt": "621512347",
        "frgnr_limit": "3878403770",
        "frgnr_limit_irds": "0",
        "limit_exh_rt": "83.98"
      }
      // ... 추가 데이터
    ]
  }
}
```

### getInstitutionalInvestorInfo

기관 투자자의 종목별 매매 정보를 조회합니다.

**파라미터**:

- `code` (string): 종목코드
- `date` (string, 선택): 조회일자 (YYYYMMDD 형식)

**응답 예시**:

```json
{
  "success": true,
  "data": {
    // 향후 정의될 응답 구조
  }
}
```

### getContinuousTradingStatus

외국인/기관의 연속매매 현황을 조회합니다.

**파라미터**:

- `market` (string, 기본값 'J'): 시장구분코드 (J: 주식, ETF)
- `investorType` (string, 기본값 '1'): 투자자구분코드 (1: 외국인, 2: 기관계)
- `tradingType` (string, 기본값 '1'): 매매구분코드 (1: 순매수, 2: 순매도)
- `period` (string, 기본값 '2'): 기간 (1: 5일, 2: 10일, 3: 20일, 4: 60일)

**응답 예시**:

```json
{
  "success": true,
  "data": {
    // 향후 정의될 응답 구조
  }
}
```

## TR 코드 목록

| TR 코드 | 설명                     |
| ------- | ------------------------ |
| ka10008 | 외국인기관 매매동향 요청 |
| ka10009 | 기관요청                 |
| ka10010 | 외국인기관 연속매매 요청 |
