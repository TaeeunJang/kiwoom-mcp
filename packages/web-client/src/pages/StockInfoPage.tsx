import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

interface StockBasicInfo {
  stk_cd: string;
  stk_nm: string;
  stk_pric: string;
  stk_oprc: string;
  stk_hprc: string;
  stk_lprc: string;
  stk_prpr: string;
  stk_sdpr: string;
  stk_rate: string;
  stk_vol: string;
  stk_mkt: string;
  stk_sect: string;
  stk_issued_shares: string;
  stk_250hgst: string;
  stk_250lwst: string;
}

const StockInfoPage: React.FC = () => {
  const [stockCode, setStockCode] = useState<string>("");
  const [stockInfo, setStockInfo] = useState<StockBasicInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!stockCode.trim()) {
      setError("종목 코드를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 실제 API 호출 대신 모킹 데이터 사용
      // 실제 구현에서는 stockInfoClient.getStockBasicInfo(stockCode) 호출
      setTimeout(() => {
        // 모킹 데이터
        const mockResponse = {
          success: true,
          data: {
            stk_cd: stockCode,
            stk_nm: "삼성전자",
            stk_pric: "71,000",
            stk_oprc: "70,500",
            stk_hprc: "71,800",
            stk_lprc: "70,300",
            stk_prpr: "1,200",
            stk_sdpr: "1.72",
            stk_rate: "1.72",
            stk_vol: "12,345,678",
            stk_mkt: "KOSPI",
            stk_sect: "전기전자",
            stk_issued_shares: "5,969,782,550",
            stk_250hgst: "74,400",
            stk_250lwst: "67,800",
          },
        };

        setStockInfo(mockResponse.data);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("종목 정보를 가져오는데 실패했습니다.");
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        주식 기본 정보
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              fullWidth
              label="종목 코드"
              placeholder="예: KRX:005930"
              value={stockCode}
              onChange={(e) => setStockCode(e.target.value)}
              helperText="거래소별 종목코드를 입력하세요."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              sx={{ height: "56px" }}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "조회"}
            </Button>
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>

      {stockInfo && (
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {stockInfo.stk_nm} ({stockInfo.stk_cd})
            </Typography>

            <Grid container spacing={3} sx={{ width: "100%" }}>
              <Grid item xs={12} lg={6}>
                <TableContainer component={Paper} sx={{ width: "100%" }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                        <TableCell colSpan={2}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            기본 정보
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell width="40%">시장</TableCell>
                        <TableCell>{stockInfo.stk_mkt}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>섹터</TableCell>
                        <TableCell>{stockInfo.stk_sect}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>발행주식수</TableCell>
                        <TableCell>{stockInfo.stk_issued_shares}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>52주 최고가</TableCell>
                        <TableCell>{stockInfo.stk_250hgst}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>52주 최저가</TableCell>
                        <TableCell>{stockInfo.stk_250lwst}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} lg={6}>
                <TableContainer component={Paper} sx={{ width: "100%" }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                        <TableCell colSpan={2}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            가격 정보
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell width="40%">현재가</TableCell>
                        <TableCell>
                          <Typography
                            variant="body1"
                            color={
                              parseFloat(stockInfo.stk_sdpr) > 0
                                ? "error"
                                : parseFloat(stockInfo.stk_sdpr) < 0
                                ? "primary"
                                : "text.primary"
                            }
                            fontWeight="bold"
                          >
                            {stockInfo.stk_pric}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>전일대비</TableCell>
                        <TableCell>
                          <Typography
                            variant="body1"
                            color={
                              parseFloat(stockInfo.stk_sdpr) > 0
                                ? "error"
                                : parseFloat(stockInfo.stk_sdpr) < 0
                                ? "primary"
                                : "text.primary"
                            }
                          >
                            {stockInfo.stk_prpr} ({stockInfo.stk_sdpr}%)
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>시가</TableCell>
                        <TableCell>{stockInfo.stk_oprc}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>고가</TableCell>
                        <TableCell>{stockInfo.stk_hprc}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>저가</TableCell>
                        <TableCell>{stockInfo.stk_lprc}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>거래량</TableCell>
                        <TableCell>{stockInfo.stk_vol}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default StockInfoPage;
