const express = require("express");
const router = express.Router();
const orderController = require("../../../controllers/api/주문/orderController");

// 주식 주문
router.post("/stock", orderController.placeOrder);

// 주문 취소
router.post("/cancel", orderController.cancelOrder);

// 주문 정정
router.post("/modify", orderController.modifyOrder);

// 주문 가능 금액 조회
router.get("/orderable-amount", orderController.getOrderableAmount);

module.exports = router;
