const express = require("express");
const router = express.Router();

// OAuth 인증 라우터
const authRoutes = require("./인증/authRoutes");

// 종목정보 라우터
const stockInfoRoutes = require("./종목정보/stockInfoRoutes");

// 시세 라우터
const priceRoutes = require("./시세/priceRoutes");

// 계좌 라우터
const accountRoutes = require("./계좌/accountRoutes");

// 주문 라우터
const orderRoutes = require("./주문/orderRoutes");

// 실시간시세 라우터
const realtimeRoutes = require("./실시간시세/realtimeRoutes");

// 라우터 연결
router.use("/auth", authRoutes);
router.use("/stock-info", stockInfoRoutes);
router.use("/price", priceRoutes);
router.use("/account", accountRoutes);
router.use("/order", orderRoutes);
router.use("/realtime", realtimeRoutes);

module.exports = router;
