const express = require("express");
const router = express.Router();
const priceController = require("../../../controllers/api/시세/priceController");

// 현재가 조회
router.get("/current", priceController.getCurrentPrice);

// 호가 조회
router.get("/orderbook", priceController.getOrderbook);

// 일봉 조회
router.get("/daily", priceController.getDailyChart);

// 분봉 조회
router.get("/minute", priceController.getMinuteChart);

// 거래량 조회
router.get("/volume", priceController.getVolumeData);

module.exports = router;
