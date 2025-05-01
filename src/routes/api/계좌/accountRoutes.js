const express = require("express");
const router = express.Router();
const accountController = require("../../../controllers/api/계좌/accountController");

// 계좌 목록 조회
router.get("/list", accountController.getAccountList);

// 계좌 잔고 조회
router.get("/balance", accountController.getAccountBalance);

// 계좌 수익률 조회
router.get("/profit", accountController.getAccountProfit);

// 주문 내역 조회
router.get("/order-history", accountController.getOrderHistory);

// 체결 내역 조회
router.get("/trade-history", accountController.getTradeHistory);

module.exports = router;
