const express = require("express");
const router = express.Router();
const stockInfoController = require("../../../controllers/api/종목정보/stockInfoController");

// 종목기본정보 조회
router.get("/basic", stockInfoController.getStockBasicInfo);

// 종목시간외단일가 조회
router.get("/after-hours", stockInfoController.getStockAfterHoursPrice);

// 종목별투자자기관별동향 조회
router.get("/investor-trend", stockInfoController.getStockInvestorTrend);

// 종목별증권사순매수 조회
router.get("/broker-buying", stockInfoController.getStockBrokerBuying);

module.exports = router;
