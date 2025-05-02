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
  Skeleton,
  useTheme,
  Divider,
  Tab,
  Tabs,
  styled,
} from "@mui/material";
import {
  Search as SearchIcon,
  TrendingUp,
  TrendingDown,
  AutoGraph as AutoGraphIcon,
} from "@mui/icons-material";

interface PriceInfo {
  stk_cd: string;
  stk_nm: string;
  price_date: string;
  open_price: string;
  high_price: string;
  low_price: string;
  close_price: string;
  volume: string;
  prev_close: string;
  change: string;
  change_percent: string;
}

const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  color: theme.palette.primary.contrastText,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledSearchBox = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(0),
  boxShadow: theme.customShadows.card,
}));

const PriceInfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontSize: "0.75rem",
  fontWeight: 400,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}));

const PriceInfoValue = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 600,
  marginTop: theme.spacing(0.5),
}));

const PricePage: React.FC = () => {
  const theme = useTheme();
  const [stockCode, setStockCode] = useState<string>("");
  const [priceInfo, setPriceInfo] = useState<PriceInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearch = async () => {
    if (!stockCode.trim()) {
      setError("종목 코드를 입력해주세요");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 기본값 설정 (테스트용)
      const searchCode = stockCode.trim() || "005930";

      // 실제 API 호출 대신 모킹 데이터 사용
      // 실제 구현에서는 API 호출 수행
      setTimeout(() => {
        // 모킹 데이터
        const mockResponse = {
          success: true,
          data: {
            stk_cd: searchCode,
            stk_nm: "삼성전자",
            price_date: "2023-05-25",
            open_price: "70,500",
            high_price: "71,800",
            low_price: "70,300",
            close_price: "71,000",
            volume: "12,345,678",
            prev_close: "69,800",
            change: "+1,200",
            change_percent: "+1.72",
          },
        };

        setPriceInfo(mockResponse.data);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("가격 정보를 가져오는데 실패했습니다");
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
          주식 가격 정보
        </Typography>
        <Button
          variant="contained"
          startIcon={<AutoGraphIcon />}
          sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }}
        >
          기술적 분석
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

      {priceInfo && (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {priceInfo.stk_nm} ({priceInfo.stk_cd})
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: priceInfo.change.startsWith("+")
                  ? "error.main"
                  : priceInfo.change.startsWith("-")
                  ? "primary.main"
                  : "text.primary",
                fontWeight: 500,
                fontSize: "1rem",
              }}
            >
              {priceInfo.close_price} / {priceInfo.change} (
              {priceInfo.change_percent})
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <GradientBox>
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    현재가
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    {priceInfo.close_price}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {priceInfo.change.startsWith("+") ? (
                      <TrendingUp
                        sx={{ mr: 1, color: "primary.contrastText" }}
                      />
                    ) : priceInfo.change.startsWith("-") ? (
                      <TrendingDown
                        sx={{ mr: 1, color: "primary.contrastText" }}
                      />
                    ) : null}
                    <Typography
                      variant="body1"
                      sx={{ color: "primary.contrastText" }}
                    >
                      {priceInfo.change} ({priceInfo.change_percent})
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "primary.contrastText", opacity: 0.8 }}
                    >
                      거래량
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "primary.contrastText", fontWeight: 600 }}
                    >
                      {priceInfo.volume}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "primary.contrastText", opacity: 0.8 }}
                    >
                      기준일
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "primary.contrastText", fontWeight: 600 }}
                    >
                      {priceInfo.price_date}
                    </Typography>
                  </Box>
                </Box>
              </GradientBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    가격 요약
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <PriceInfoLabel>시가</PriceInfoLabel>
                      <PriceInfoValue>{priceInfo.open_price}</PriceInfoValue>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <PriceInfoLabel>고가</PriceInfoLabel>
                      <PriceInfoValue>{priceInfo.high_price}</PriceInfoValue>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <PriceInfoLabel>저가</PriceInfoLabel>
                      <PriceInfoValue>{priceInfo.low_price}</PriceInfoValue>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <PriceInfoLabel>전일종가</PriceInfoLabel>
                      <PriceInfoValue>{priceInfo.prev_close}</PriceInfoValue>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 3 }} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <PriceInfoLabel>전일대비</PriceInfoLabel>
                      <Typography
                        variant="h5"
                        sx={{
                          color: priceInfo.change.startsWith("+")
                            ? "error.main"
                            : priceInfo.change.startsWith("-")
                            ? "primary.main"
                            : "text.primary",
                          fontWeight: 700,
                        }}
                      >
                        {priceInfo.change} ({priceInfo.change_percent})
                      </Typography>
                    </Box>
                    <Button variant="outlined" size="small">
                      차트 보기
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, mb: 2, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="stock price information tabs"
            >
              <Tab label="가격 정보" />
              <Tab label="호가 정보" />
            </Tabs>
          </Box>

          {tabValue === 0 && (
            <Card>
              <CardHeader title="상세 가격 데이터" />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "background.neutral" }}>
                        <TableCell width="25%">구분</TableCell>
                        <TableCell align="right" width="25%">
                          값
                        </TableCell>
                        <TableCell>설명</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>날짜</TableCell>
                        <TableCell align="right">
                          {priceInfo.price_date}
                        </TableCell>
                        <TableCell>가격 정보 기준일</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>시가</TableCell>
                        <TableCell align="right">
                          {priceInfo.open_price}
                        </TableCell>
                        <TableCell>장 시작 시 첫 거래 가격</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>고가</TableCell>
                        <TableCell align="right">
                          {priceInfo.high_price}
                        </TableCell>
                        <TableCell>장중 최고 거래 가격</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>저가</TableCell>
                        <TableCell align="right">
                          {priceInfo.low_price}
                        </TableCell>
                        <TableCell>장중 최저 거래 가격</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>종가</TableCell>
                        <TableCell align="right">
                          {priceInfo.close_price}
                        </TableCell>
                        <TableCell>장 마감 시 마지막 거래 가격</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>거래량</TableCell>
                        <TableCell align="right">{priceInfo.volume}</TableCell>
                        <TableCell>당일 총 거래량</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>전일종가</TableCell>
                        <TableCell align="right">
                          {priceInfo.prev_close}
                        </TableCell>
                        <TableCell>이전 거래일 종가</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>변동</TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: priceInfo.change.startsWith("+")
                              ? "error.main"
                              : priceInfo.change.startsWith("-")
                              ? "primary.main"
                              : "text.primary",
                            fontWeight: 600,
                          }}
                        >
                          {priceInfo.change} ({priceInfo.change_percent})
                        </TableCell>
                        <TableCell>전일 종가 대비 변동</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

          {tabValue === 1 && (
            <Card>
              <CardHeader title="호가 정보" />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  실시간 호가 정보는 현재 제공되지 않습니다. 실제 API 연동 시
                  구현될 예정입니다.
                </Typography>
                <Skeleton variant="rectangular" width="100%" height={300} />
              </CardContent>
            </Card>
          )}
        </>
      )}

      {loading && (
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Skeleton variant="rectangular" width="100%" height={400} />
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default PricePage;
