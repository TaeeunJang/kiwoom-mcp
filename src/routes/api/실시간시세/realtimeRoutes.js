const express = require("express");
const router = express.Router();
const realtimeController = require("../../../controllers/api/실시간시세/realtimeController");

// 실시간시세 구독
router.post("/subscribe", realtimeController.subscribe);

// 실시간시세 구독 해제
router.post("/unsubscribe", realtimeController.unsubscribe);

// 실시간시세 구독 목록 조회
router.get("/subscriptions", realtimeController.getSubscriptions);

module.exports = router;
