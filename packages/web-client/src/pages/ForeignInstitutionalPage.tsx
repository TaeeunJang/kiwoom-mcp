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
  Container,
  Paper,
} from "@mui/material";
import {
  Search as SearchIcon,
  TrendingUp,
  TrendingDown,
  Public as PublicIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";

interface ForeignTrend {
  stk_cd: string;
  stk_nm: string;
  date: string;
  buy_qty: string;
  sell_qty: string;
  net_qty: string;
  buy_amount: string;
  sell_amount: string;
  net_amount: string;
  ownership_ratio: string;
}

interface InstitutionalTrend {
  stk_cd: string;
  stk_nm: string;
  date: string;
  pension_fund_net: string;
  investment_trust_net: string;
  insurance_net: string;
  bank_net: string;
  financial_investment_net: string;
  etc_financial_net: string;
  total_net: string;
}

const StatCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2, 3),
  boxShadow: theme.customShadows.card,
}));

const StyledSearchBox = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(0),
  boxShadow: theme.customShadows.card,
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  marginTop: theme.spacing(0.5),
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontSize: "0.75rem",
  fontWeight: 400,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}));

const ValueWithChange = ({
  value,
  changeIndicator,
}: {
  value: string;
  changeIndicator: "positive" | "negative" | "neutral";
}) => {
  const theme = useTheme();
  const color =
    changeIndicator === "positive"
      ? theme.palette.error.main
      : changeIndicator === "negative"
      ? theme.palette.primary.main
      : theme.palette.text.primary;

  return (
    <Typography
      sx={{
        color,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        fontSize: "1rem",
      }}
    >
      {changeIndicator === "positive" && (
        <TrendingUp fontSize="small" sx={{ mr: 0.5 }} />
      )}
      {changeIndicator === "negative" && (
        <TrendingDown fontSize="small" sx={{ mr: 0.5 }} />
      )}
      {value}
    </Typography>
  );
};

const ForeignInstitutionalPage: React.FC = () => {
  const theme = useTheme();
  const [stockCode, setStockCode] = useState<string>("");
  const [foreignTrend, setForeignTrend] = useState<ForeignTrend | null>(null);
  const [institutionalTrend, setInstitutionalTrend] =
    useState<InstitutionalTrend | null>(null);
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
        const mockForeignResponse = {
          success: true,
          data: {
            stk_cd: searchCode,
            stk_nm: "삼성전자",
            date: "2023-05-25",
            buy_qty: "1,235,678",
            sell_qty: "1,024,567",
            net_qty: "+211,111",
            buy_amount: "87,654,321,000",
            sell_amount: "72,456,789,000",
            net_amount: "+15,197,532,000",
            ownership_ratio: "52.34",
          },
        };

        const mockInstitutionalResponse = {
          success: true,
          data: {
            stk_cd: searchCode,
            stk_nm: "삼성전자",
            date: "2023-05-25",
            pension_fund_net: "+54,321,000",
            investment_trust_net: "-23,456,000",
            insurance_net: "+12,345,000",
            bank_net: "-7,654,000",
            financial_investment_net: "+87,654,000",
            etc_financial_net: "-4,321,000",
            total_net: "+118,889,000",
          },
        };

        setForeignTrend(mockForeignResponse.data);
        setInstitutionalTrend(mockInstitutionalResponse.data);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("외국인/기관 정보를 가져오는데 실패했습니다");
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
          외국인/기관 투자 동향
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<PublicIcon />}
            sx={{ mr: 1 }}
            color="info"
          >
            외국인 상위
          </Button>
          <Button
            variant="contained"
            startIcon={<BusinessIcon />}
            color="secondary"
          >
            기관 상위
          </Button>
        </Box>
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

      {foreignTrend && institutionalTrend && (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {foreignTrend.stk_nm} ({foreignTrend.stk_cd})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              기준일: {foreignTrend.date}
            </Typography>
          </Box>

          <Box sx={{ mt: 4, mb: 2, borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="investment trend tabs"
            >
              <Tab
                icon={<PublicIcon sx={{ mr: 1 }} />}
                label="외국인 동향"
                iconPosition="start"
              />
              <Tab
                icon={<BusinessIcon sx={{ mr: 1 }} />}
                label="기관 동향"
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {tabValue === 0 && (
            <>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <StatCard>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <PublicIcon color="info" sx={{ mr: 1 }} />
                      <Typography variant="h6">외국인 순매수</Typography>
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: "bold",
                        color: foreignTrend.net_amount.startsWith("+")
                          ? "error.main"
                          : foreignTrend.net_amount.startsWith("-")
                          ? "primary.main"
                          : "text.primary",
                        mb: 3,
                      }}
                    >
                      {foreignTrend.net_amount}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <InfoLabel>매수금액</InfoLabel>
                        <InfoValue>{foreignTrend.buy_amount}</InfoValue>
                      </Grid>
                      <Grid item xs={6}>
                        <InfoLabel>매도금액</InfoLabel>
                        <InfoValue>{foreignTrend.sell_amount}</InfoValue>
                      </Grid>
                    </Grid>
                  </StatCard>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <StatCard>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <PublicIcon color="info" sx={{ mr: 1 }} />
                      <Typography variant="h6">외국인 순매수량</Typography>
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: "bold",
                        color: foreignTrend.net_qty.startsWith("+")
                          ? "error.main"
                          : foreignTrend.net_qty.startsWith("-")
                          ? "primary.main"
                          : "text.primary",
                        mb: 3,
                      }}
                    >
                      {foreignTrend.net_qty}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <InfoLabel>매수수량</InfoLabel>
                        <InfoValue>{foreignTrend.buy_qty}</InfoValue>
                      </Grid>
                      <Grid item xs={6}>
                        <InfoLabel>매도수량</InfoLabel>
                        <InfoValue>{foreignTrend.sell_qty}</InfoValue>
                      </Grid>
                    </Grid>
                  </StatCard>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <StatCard>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <PublicIcon color="info" sx={{ mr: 1 }} />
                      <Typography variant="h6">외국인 지분율</Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
                      {foreignTrend.ownership_ratio}%
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "background.neutral",
                        height: 8,
                        borderRadius: 1,
                        mt: 2,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: `${Math.min(
                            Number(
                              foreignTrend.ownership_ratio.replace(/,/g, "")
                            ),
                            100
                          )}%`,
                          bgcolor: "info.main",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ mt: 1, display: "block", color: "text.secondary" }}
                    >
                      외국인 보유 지분율 (전체 대비)
                    </Typography>
                  </StatCard>
                </Grid>
              </Grid>

              <Card>
                <CardHeader
                  title="외국인 투자 세부 정보"
                  subheader={`${foreignTrend.date} 기준`}
                />
                <CardContent>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow
                          sx={{ backgroundColor: "background.neutral" }}
                        >
                          <TableCell>구분</TableCell>
                          <TableCell align="right">값</TableCell>
                          <TableCell>설명</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>매수량</TableCell>
                          <TableCell align="right">
                            {foreignTrend.buy_qty}
                          </TableCell>
                          <TableCell>해당 일자 외국인 총 매수량</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>매도량</TableCell>
                          <TableCell align="right">
                            {foreignTrend.sell_qty}
                          </TableCell>
                          <TableCell>해당 일자 외국인 총 매도량</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>순매수량</TableCell>
                          <TableCell align="right">
                            <ValueWithChange
                              value={foreignTrend.net_qty}
                              changeIndicator={
                                foreignTrend.net_qty.startsWith("+")
                                  ? "positive"
                                  : foreignTrend.net_qty.startsWith("-")
                                  ? "negative"
                                  : "neutral"
                              }
                            />
                          </TableCell>
                          <TableCell>
                            매수량-매도량 (양수: 순매수, 음수: 순매도)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>매수금액</TableCell>
                          <TableCell align="right">
                            {foreignTrend.buy_amount}
                          </TableCell>
                          <TableCell>해당 일자 외국인 총 매수금액</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>매도금액</TableCell>
                          <TableCell align="right">
                            {foreignTrend.sell_amount}
                          </TableCell>
                          <TableCell>해당 일자 외국인 총 매도금액</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>순매수금액</TableCell>
                          <TableCell align="right">
                            <ValueWithChange
                              value={foreignTrend.net_amount}
                              changeIndicator={
                                foreignTrend.net_amount.startsWith("+")
                                  ? "positive"
                                  : foreignTrend.net_amount.startsWith("-")
                                  ? "negative"
                                  : "neutral"
                              }
                            />
                          </TableCell>
                          <TableCell>
                            매수금액-매도금액 (양수: 순매수, 음수: 순매도)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>보유 지분율</TableCell>
                          <TableCell align="right">
                            {foreignTrend.ownership_ratio}%
                          </TableCell>
                          <TableCell>
                            전체 유통주식 대비 외국인 보유 비율
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </>
          )}

          {tabValue === 1 && (
            <>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <StatCard>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <BusinessIcon color="secondary" sx={{ mr: 1 }} />
                      <Typography variant="h6">기관 총 순매수</Typography>
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: "bold",
                        color: institutionalTrend.total_net.startsWith("+")
                          ? "error.main"
                          : institutionalTrend.total_net.startsWith("-")
                          ? "primary.main"
                          : "text.primary",
                        mb: 1,
                      }}
                    >
                      {institutionalTrend.total_net}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      기준일: {institutionalTrend.date}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <InfoLabel>연기금</InfoLabel>
                        <ValueWithChange
                          value={institutionalTrend.pension_fund_net}
                          changeIndicator={
                            institutionalTrend.pension_fund_net.startsWith("+")
                              ? "positive"
                              : institutionalTrend.pension_fund_net.startsWith(
                                  "-"
                                )
                              ? "negative"
                              : "neutral"
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InfoLabel>투자신탁</InfoLabel>
                        <ValueWithChange
                          value={institutionalTrend.investment_trust_net}
                          changeIndicator={
                            institutionalTrend.investment_trust_net.startsWith(
                              "+"
                            )
                              ? "positive"
                              : institutionalTrend.investment_trust_net.startsWith(
                                  "-"
                                )
                              ? "negative"
                              : "neutral"
                          }
                        />
                      </Grid>
                    </Grid>
                  </StatCard>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <Card sx={{ height: "100%" }}>
                    <CardHeader title="기관별 순매수 분포" />
                    <CardContent>
                      <Grid container spacing={2}>
                        {[
                          {
                            label: "증권사",
                            value: institutionalTrend.financial_investment_net,
                          },
                          {
                            label: "보험",
                            value: institutionalTrend.insurance_net,
                          },
                          { label: "은행", value: institutionalTrend.bank_net },
                          {
                            label: "연기금",
                            value: institutionalTrend.pension_fund_net,
                          },
                          {
                            label: "투자신탁",
                            value: institutionalTrend.investment_trust_net,
                          },
                          {
                            label: "기타금융",
                            value: institutionalTrend.etc_financial_net,
                          },
                        ].map((item, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper
                              sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                bgcolor: "background.neutral",
                                boxShadow: "none",
                              }}
                            >
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                {item.label}
                              </Typography>
                              <Box
                                sx={{
                                  mt: 2,
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <ValueWithChange
                                  value={item.value}
                                  changeIndicator={
                                    item.value.startsWith("+")
                                      ? "positive"
                                      : item.value.startsWith("-")
                                      ? "negative"
                                      : "neutral"
                                  }
                                />
                              </Box>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Card>
                <CardHeader
                  title="기관 투자자 세부 정보"
                  subheader={`${institutionalTrend.date} 기준`}
                />
                <CardContent>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow
                          sx={{ backgroundColor: "background.neutral" }}
                        >
                          <TableCell>기관 구분</TableCell>
                          <TableCell align="right">순매수금액</TableCell>
                          <TableCell>설명</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>연기금</TableCell>
                          <TableCell align="right">
                            <ValueWithChange
                              value={institutionalTrend.pension_fund_net}
                              changeIndicator={
                                institutionalTrend.pension_fund_net.startsWith(
                                  "+"
                                )
                                  ? "positive"
                                  : institutionalTrend.pension_fund_net.startsWith(
                                      "-"
                                    )
                                  ? "negative"
                                  : "neutral"
                              }
                            />
                          </TableCell>
                          <TableCell>국민연금, 기타 연기금</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>투자신탁</TableCell>
                          <TableCell align="right">
                            <ValueWithChange
                              value={institutionalTrend.investment_trust_net}
                              changeIndicator={
                                institutionalTrend.investment_trust_net.startsWith(
                                  "+"
                                )
                                  ? "positive"
                                  : institutionalTrend.investment_trust_net.startsWith(
                                      "-"
                                    )
                                  ? "negative"
                                  : "neutral"
                              }
                            />
                          </TableCell>
                          <TableCell>자산운용사, 뮤추얼펀드 등</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>보험</TableCell>
                          <TableCell align="right">
                            <ValueWithChange
                              value={institutionalTrend.insurance_net}
                              changeIndicator={
                                institutionalTrend.insurance_net.startsWith("+")
                                  ? "positive"
                                  : institutionalTrend.insurance_net.startsWith(
                                      "-"
                                    )
                                  ? "negative"
                                  : "neutral"
                              }
                            />
                          </TableCell>
                          <TableCell>생명보험, 손해보험사</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>은행</TableCell>
                          <TableCell align="right">
                            <ValueWithChange
                              value={institutionalTrend.bank_net}
                              changeIndicator={
                                institutionalTrend.bank_net.startsWith("+")
                                  ? "positive"
                                  : institutionalTrend.bank_net.startsWith("-")
                                  ? "negative"
                                  : "neutral"
                              }
                            />
                          </TableCell>
                          <TableCell>시중은행, 특수은행 등</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>금융투자</TableCell>
                          <TableCell align="right">
                            <ValueWithChange
                              value={
                                institutionalTrend.financial_investment_net
                              }
                              changeIndicator={
                                institutionalTrend.financial_investment_net.startsWith(
                                  "+"
                                )
                                  ? "positive"
                                  : institutionalTrend.financial_investment_net.startsWith(
                                      "-"
                                    )
                                  ? "negative"
                                  : "neutral"
                              }
                            />
                          </TableCell>
                          <TableCell>증권사, 선물사 등</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>기타금융</TableCell>
                          <TableCell align="right">
                            <ValueWithChange
                              value={institutionalTrend.etc_financial_net}
                              changeIndicator={
                                institutionalTrend.etc_financial_net.startsWith(
                                  "+"
                                )
                                  ? "positive"
                                  : institutionalTrend.etc_financial_net.startsWith(
                                      "-"
                                    )
                                  ? "negative"
                                  : "neutral"
                              }
                            />
                          </TableCell>
                          <TableCell>
                            종금사, 저축은행 등 기타 금융기관
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{ backgroundColor: "background.neutral" }}
                        >
                          <TableCell>
                            <Typography variant="subtitle2">합계</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="subtitle2">
                              <ValueWithChange
                                value={institutionalTrend.total_net}
                                changeIndicator={
                                  institutionalTrend.total_net.startsWith("+")
                                    ? "positive"
                                    : institutionalTrend.total_net.startsWith(
                                        "-"
                                      )
                                    ? "negative"
                                    : "neutral"
                                }
                              />
                            </Typography>
                          </TableCell>
                          <TableCell>전체 기관 순매수 합계</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </>
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

export default ForeignInstitutionalPage;
