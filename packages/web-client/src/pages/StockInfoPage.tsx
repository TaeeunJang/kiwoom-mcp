import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
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
  CardHeader,
  CardContent,
  Stack,
  Icon,
  Skeleton,
  styled,
  useTheme,
  Tab,
  Tabs,
  Container,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShowChart as ShowChartIcon,
  Business as BusinessIcon,
  Inventory as InventoryIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";

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

const StyledIcon = styled(Icon)(({ theme }) => ({
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  marginRight: theme.spacing(2),
}));

const StyledSearchBox = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(0),
  boxShadow: theme.customShadows.card,
}));

const StockInfoPage: React.FC = () => {
  const theme = useTheme();
  const [stockCode, setStockCode] = useState<string>("");
  const [stockInfo, setStockInfo] = useState<StockBasicInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

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

      // 기본값 설정 (테스트용)
      const searchCode = stockCode.trim() || "005930";

      // 실제 API 호출 대신 모킹 데이터 사용
      // 실제 구현에서는 stockInfoClient.getStockBasicInfo(stockCode) 호출
      setTimeout(() => {
        // 모킹 데이터
        const mockResponse = {
          success: true,
          data: {
            stk_cd: searchCode,
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

  // 페이지 로드 시 자동으로 기본 데이터 로드
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          주식 기본 정보
        </Typography>
        <Button
          variant="contained"
          startIcon={<BarChartIcon />}
          sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }}
        >
          차트 보기
        </Button>
      </Box>

      <StyledSearchBox>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                label="종목 코드"
                placeholder="예: 005930"
                value={stockCode}
                onChange={(e) => setStockCode(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <SearchIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "text.secondary" }}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                sx={{
                  height: 40,
                  boxShadow: theme.customShadows?.primary,
                }}
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
        </CardContent>
      </StyledSearchBox>

      {stockInfo && (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {stockInfo.stk_nm} ({stockInfo.stk_cd})
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  parseFloat(stockInfo.stk_sdpr) > 0
                    ? "error.main"
                    : parseFloat(stockInfo.stk_sdpr) < 0
                    ? "primary.main"
                    : "text.primary",
                fontWeight: 500,
                fontSize: "1rem",
              }}
            >
              {stockInfo.stk_pric} / {stockInfo.stk_prpr} ({stockInfo.stk_sdpr}
              %)
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* 주가 정보 카드 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <StyledIcon sx={{ backgroundColor: "primary.lighter" }}>
                      <ShowChartIcon color="primary" />
                    </StyledIcon>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary" }}
                      >
                        현재가
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          mt: 0.5,
                          color:
                            parseFloat(stockInfo.stk_sdpr) > 0
                              ? "error.main"
                              : parseFloat(stockInfo.stk_sdpr) < 0
                              ? "primary.main"
                              : "text.primary",
                        }}
                      >
                        {stockInfo.stk_pric}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            parseFloat(stockInfo.stk_sdpr) > 0
                              ? "error.main"
                              : parseFloat(stockInfo.stk_sdpr) < 0
                              ? "primary.main"
                              : "text.primary",
                        }}
                      >
                        {stockInfo.stk_prpr} ({stockInfo.stk_sdpr}%)
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* 거래량 정보 카드 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <StyledIcon sx={{ backgroundColor: "info.lighter" }}>
                      <InventoryIcon color="info" />
                    </StyledIcon>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary" }}
                      >
                        거래량
                      </Typography>
                      <Typography variant="h4" sx={{ mt: 0.5 }}>
                        {stockInfo.stk_vol}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        발행주식: {stockInfo.stk_issued_shares}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* 시장 정보 카드 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <StyledIcon sx={{ backgroundColor: "warning.lighter" }}>
                      <BusinessIcon color="warning" />
                    </StyledIcon>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary" }}
                      >
                        시장
                      </Typography>
                      <Typography variant="h4" sx={{ mt: 0.5 }}>
                        {stockInfo.stk_mkt}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        섹터: {stockInfo.stk_sect}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* 52주 정보 카드 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <StyledIcon sx={{ backgroundColor: "success.lighter" }}>
                      <ShowChartIcon color="success" />
                    </StyledIcon>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary" }}
                      >
                        52주 범위
                      </Typography>
                      <Typography variant="h4" sx={{ mt: 0.5 }}>
                        {stockInfo.stk_250lwst}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        ~ {stockInfo.stk_250hgst}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, mb: 2, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="stock information tabs"
            >
              <Tab label="기본 정보" />
              <Tab label="가격 정보" />
            </Tabs>
          </Box>

          {tabValue === 0 && (
            <Card sx={{ mt: 2 }}>
              <CardHeader title="기본 정보" />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell width="30%" sx={{ fontWeight: "medium" }}>
                          시장
                        </TableCell>
                        <TableCell>{stockInfo.stk_mkt}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          섹터
                        </TableCell>
                        <TableCell>{stockInfo.stk_sect}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          발행주식수
                        </TableCell>
                        <TableCell>{stockInfo.stk_issued_shares}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          52주 최고가
                        </TableCell>
                        <TableCell>{stockInfo.stk_250hgst}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          52주 최저가
                        </TableCell>
                        <TableCell>{stockInfo.stk_250lwst}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

          {tabValue === 1 && (
            <Card sx={{ mt: 2 }}>
              <CardHeader title="가격 정보" />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell width="30%" sx={{ fontWeight: "medium" }}>
                          현재가
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              parseFloat(stockInfo.stk_sdpr) > 0
                                ? "error.main"
                                : parseFloat(stockInfo.stk_sdpr) < 0
                                ? "primary.main"
                                : "text.primary",
                            fontWeight: 600,
                          }}
                        >
                          {stockInfo.stk_pric}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          전일대비
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              parseFloat(stockInfo.stk_sdpr) > 0
                                ? "error.main"
                                : parseFloat(stockInfo.stk_sdpr) < 0
                                ? "primary.main"
                                : "text.primary",
                          }}
                        >
                          {stockInfo.stk_prpr} ({stockInfo.stk_sdpr}%)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          시가
                        </TableCell>
                        <TableCell>{stockInfo.stk_oprc}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          고가
                        </TableCell>
                        <TableCell>{stockInfo.stk_hprc}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "medium" }}>
                          저가
                        </TableCell>
                        <TableCell>{stockInfo.stk_lprc}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {loading && (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {[1, 2, 3, 4].map((index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="rectangular" width="100%" height={120} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default StockInfoPage;
