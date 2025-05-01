const express = require("express");
const router = express.Router();
const authController = require("../../../controllers/api/인증/authController");

// 접근 토큰 발급
router.post("/token", authController.getToken);

// 접근 토큰 폐기
router.post("/revoke", authController.revokeToken);

// 토큰 상태 확인
router.get("/status", authController.getTokenStatus);

module.exports = router;
