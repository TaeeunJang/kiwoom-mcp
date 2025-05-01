import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`price-tabpanel-${index}`}
      aria-labelledby={`price-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

// 모의 데이터 인터페이스
interface PriceInfo {
  stk_cd: string;
  stk_nm: string;
  stk_pric: string;
  stk_prpr: string;
  stk_rate: string;
  stk_sdpr: string;
  asks: {
    price: string;
    volume: string;
    total_volume: string;
  }[];
  bids: {
    price: string;
    volume: string;
    total_volume: string;
  }[];
  total_ask_volume: string;
  total_bid_volume: string;
}

const PricePage: React.FC = () => {
  const [stockCode, setStockCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<number>(0);
  const [priceInfo, setPriceInfo] = useState<PriceInfo | null>(null);
  const [dailyPriceInfo, setDailyPriceInfo] = useState<any>(null);
  const [afterHoursInfo, setAfterHoursInfo] = useState<any>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearch = async () => {
    if (!stockCode.trim()) {
      setError("종목 코드를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 실제 API 호출 대신 모킹 데이터
      setTimeout(() => {
        // 모킹 데이터
        const mockResponse = {
          success: true,
          data: {
            stk_cd: stockCode,
            stk_nm: "삼성전자",
            stk_pric: "71,000",
            stk_prpr: "1,200",
            stk_rate: "1.72",
            stk_sdpr: "1.72",
            asks: [
              { price: "71,300", volume: "7,351", total_volume: "27,482" },
              { price: "71,200", volume: "5,792", total_volume: "20,131" },
              { price: "71,100", volume: "10,724", total_volume: "14,339" },
              { price: "71,000", volume: "3,615", total_volume: "3,615" },
              { price: "70,900", volume: "0", total_volume: "0" },
            ],
            bids: [
              { price: "70,900", volume: "4,821", total_volume: "4,821" },
              { price: "70,800", volume: "8,327", total_volume: "13,148" },
              { price: "70,700", volume: "6,943", total_volume: "20,091" },
              { price: "70,600", volume: "12,389", total_volume: "32,480" },
              { price: "70,500", volume: "5,732", total_volume: "38,212" },
            ],
            total_ask_volume: "27,482",
            total_bid_volume: "38,212",
          },
        };

        setPriceInfo(mockResponse.data);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("호가 정보를 가져오는데 실패했습니다.");
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        호가 정보
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

      {priceInfo && (
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {priceInfo.stk_nm} ({priceInfo.stk_cd})
            </Typography>
            <Typography
              variant="h4"
              color={
                parseFloat(priceInfo.stk_sdpr) > 0
                  ? "error"
                  : parseFloat(priceInfo.stk_sdpr) < 0
                  ? "primary"
                  : "text.primary"
              }
              gutterBottom
            >
              {priceInfo.stk_pric}
              <Typography
                component="span"
                variant="h6"
                color="inherit"
                sx={{ ml: 1 }}
              >
                {priceInfo.stk_prpr} ({priceInfo.stk_rate}%)
              </Typography>
            </Typography>

            <Grid container spacing={2} sx={{ width: "100%", mt: 2 }}>
              <Grid item xs={12} lg={6}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  매도호가 총 수량: {priceInfo.total_ask_volume}
                </Typography>
                <TableContainer component={Paper} sx={{ width: "100%" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow
                        sx={{ backgroundColor: "rgba(255, 0, 0, 0.05)" }}
                      >
                        <TableCell align="center">호가</TableCell>
                        <TableCell align="right">수량</TableCell>
                        <TableCell align="right">누적</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {priceInfo.asks.map((ask, index) => (
                        <TableRow key={index}>
                          <TableCell
                            align="center"
                            sx={{ color: "error.main", fontWeight: "bold" }}
                          >
                            {ask.price}
                          </TableCell>
                          <TableCell align="right">{ask.volume}</TableCell>
                          <TableCell align="right">
                            {ask.total_volume}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  매수호가 총 수량: {priceInfo.total_bid_volume}
                </Typography>
                <TableContainer component={Paper} sx={{ width: "100%" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow
                        sx={{ backgroundColor: "rgba(0, 0, 255, 0.05)" }}
                      >
                        <TableCell align="center">호가</TableCell>
                        <TableCell align="right">수량</TableCell>
                        <TableCell align="right">누적</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {priceInfo.bids.map((bid, index) => (
                        <TableRow key={index}>
                          <TableCell
                            align="center"
                            sx={{ color: "primary.main", fontWeight: "bold" }}
                          >
                            {bid.price}
                          </TableCell>
                          <TableCell align="right">{bid.volume}</TableCell>
                          <TableCell align="right">
                            {bid.total_volume}
                          </TableCell>
                        </TableRow>
                      ))}
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

export default PricePage;
