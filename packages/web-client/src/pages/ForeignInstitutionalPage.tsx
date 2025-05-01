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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Tabs,
  Tab,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ko } from "date-fns/locale";

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
      id={`foreign-institutional-tabpanel-${index}`}
      aria-labelledby={`foreign-institutional-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ForeignInstitutionalPage: React.FC = () => {
  const [stockCode, setStockCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<number>(0);

  // 투자자 종류
  const [investorType, setInvestorType] = useState<string>("1"); // 1: 외국인, 2: 기관계

  // 일자 선택
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // 결과 데이터
  const [foreignTrendData, setForeignTrendData] = useState<any>(null);
  const [institutionalTrendData, setInstitutionalTrendData] =
    useState<any>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInvestorTypeChange = (event: SelectChangeEvent) => {
    setInvestorType(event.target.value as string);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const handleSearch = async () => {
    if (!stockCode.trim()) {
      setError("종목 코드를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 실제 API 호출은 다음과 같을 것입니다
      // const params = {
      //   stockCode: stockCode,
      //   investorType: investorType,
      //   startDate: formatDate(startDate),
      //   endDate: formatDate(endDate)
      // };
      // const response = await foreignInstitutionalClient.getInvestorTrend(params);

      // 모킹 데이터
      if (tabValue === 0) {
        // 외국인 동향
        const mockForeignResponse = {
          success: true,
          data: {
            stk_cd: stockCode,
            items: [
              {
                dt: "20230612",
                frgnr_nt_buy_qty: "234,567",
                frgnr_nt_buy_amt: "16,782,345,600",
                frgnr_hd_qty: "2,967,482,275",
                frgnr_hd_rt: "49.71",
                stk_pric: "71,600",
              },
              {
                dt: "20230611",
                frgnr_nt_buy_qty: "123,456",
                frgnr_nt_buy_amt: "8,745,897,600",
                frgnr_hd_qty: "2,967,247,708",
                frgnr_hd_rt: "49.70",
                stk_pric: "71,000",
              },
              {
                dt: "20230610",
                frgnr_nt_buy_qty: "-78,912",
                frgnr_nt_buy_amt: "-5,564,784,000",
                frgnr_hd_qty: "2,967,124,252",
                frgnr_hd_rt: "49.70",
                stk_pric: "70,500",
              },
            ],
          },
        };

        setTimeout(() => {
          setForeignTrendData(mockForeignResponse.data);
          setLoading(false);
        }, 500);
      } else {
        // 기관계 동향
        const mockInstitutionalResponse = {
          success: true,
          data: {
            stk_cd: stockCode,
            items: [
              {
                dt: "20230612",
                invstn_cp_nt_buy_qty: "-345,678",
                invstn_cp_nt_buy_amt: "-24,750,148,800",
                pnsn_nt_buy_qty: "123,456",
                pnsn_nt_buy_amt: "8,839,449,600",
                invst_tp_nt_buy_qty: "-123,456",
                invst_tp_nt_buy_amt: "-8,839,449,600",
                bnk_nt_buy_qty: "78,912",
                bnk_nt_buy_amt: "5,650,099,200",
                insr_nt_buy_qty: "-56,789",
                insr_nt_buy_amt: "-4,066,094,400",
                stk_pric: "71,600",
              },
              {
                dt: "20230611",
                invstn_cp_nt_buy_qty: "-234,567",
                invstn_cp_nt_buy_amt: "-16,654,257,000",
                pnsn_nt_buy_qty: "67,890",
                pnsn_nt_buy_amt: "4,820,190,000",
                invst_tp_nt_buy_qty: "-56,789",
                invst_tp_nt_buy_amt: "-4,032,019,000",
                bnk_nt_buy_qty: "45,678",
                bnk_nt_buy_amt: "3,243,138,000",
                insr_nt_buy_qty: "-34,567",
                insr_nt_buy_amt: "-2,454,257,000",
                stk_pric: "71,000",
              },
            ],
          },
        };

        setTimeout(() => {
          setInstitutionalTrendData(mockInstitutionalResponse.data);
          setLoading(false);
        }, 500);
      }
    } catch (err) {
      setError("기관/외국인 정보를 가져오는데 실패했습니다.");
      setLoading(false);
    }
  };

  // 날짜 포맷 함수
  const formatDisplayDate = (dateString: string): string => {
    return `${dateString.substring(0, 4)}-${dateString.substring(
      4,
      6
    )}-${dateString.substring(6, 8)}`;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        기관/외국인 투자 동향
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="종목 코드"
              placeholder="예: KRX:005930"
              value={stockCode}
              onChange={(e) => setStockCode(e.target.value)}
              helperText="거래소별 종목코드를 입력하세요."
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="investor-type-label">투자자 구분</InputLabel>
              <Select
                labelId="investor-type-label"
                value={investorType}
                label="투자자 구분"
                onChange={handleInvestorTypeChange}
              >
                <MenuItem value="1">외국인</MenuItem>
                <MenuItem value="2">기관계</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
            <Grid item xs={12} sm={6} md={2}>
              <DatePicker
                label="시작일"
                value={startDate}
                onChange={(newValue: Date | null) => setStartDate(newValue)}
                format="yyyy-MM-dd"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <DatePicker
                label="종료일"
                value={endDate}
                onChange={(newValue: Date | null) => setEndDate(newValue)}
                format="yyyy-MM-dd"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
          </LocalizationProvider>

          <Grid item xs={12} md={2}>
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

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="기관/외국인 투자 탭"
          >
            <Tab label="외국인 동향" />
            <Tab label="기관계 동향" />
          </Tabs>
        </Box>

        {/* 외국인 동향 탭 */}
        <TabPanel value={tabValue} index={0}>
          {foreignTrendData && (
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {stockCode} 외국인 매매 동향
                </Typography>

                <TableContainer component={Paper} sx={{ width: "100%" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>일자</TableCell>
                        <TableCell>종가</TableCell>
                        <TableCell>순매수량</TableCell>
                        <TableCell>순매수금액</TableCell>
                        <TableCell>보유수량</TableCell>
                        <TableCell>보유비율</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {foreignTrendData.items.map(
                        (item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{formatDisplayDate(item.dt)}</TableCell>
                            <TableCell>{item.stk_pric}</TableCell>
                            <TableCell
                              sx={{
                                color: item.frgnr_nt_buy_qty.startsWith("-")
                                  ? "blue"
                                  : "red",
                              }}
                            >
                              {item.frgnr_nt_buy_qty}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: item.frgnr_nt_buy_amt.startsWith("-")
                                  ? "blue"
                                  : "red",
                              }}
                            >
                              {item.frgnr_nt_buy_amt}
                            </TableCell>
                            <TableCell>{item.frgnr_hd_qty}</TableCell>
                            <TableCell>{item.frgnr_hd_rt}%</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}
        </TabPanel>

        {/* 기관계 동향 탭 */}
        <TabPanel value={tabValue} index={1}>
          {institutionalTrendData && (
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {stockCode} 기관계 매매 동향
                </Typography>

                <TableContainer component={Paper} sx={{ width: "100%" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>일자</TableCell>
                        <TableCell>종가</TableCell>
                        <TableCell>투신</TableCell>
                        <TableCell>연기금</TableCell>
                        <TableCell>보험</TableCell>
                        <TableCell>은행</TableCell>
                        <TableCell>기타금융</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {institutionalTrendData.items.map(
                        (item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{formatDisplayDate(item.dt)}</TableCell>
                            <TableCell>{item.stk_pric}</TableCell>
                            <TableCell
                              sx={{
                                color: item.invstn_cp_nt_buy_qty.startsWith("-")
                                  ? "blue"
                                  : "red",
                              }}
                            >
                              {item.invstn_cp_nt_buy_qty}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: item.pnsn_nt_buy_qty.startsWith("-")
                                  ? "blue"
                                  : "red",
                              }}
                            >
                              {item.pnsn_nt_buy_qty}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: item.insr_nt_buy_qty.startsWith("-")
                                  ? "blue"
                                  : "red",
                              }}
                            >
                              {item.insr_nt_buy_qty}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: item.bnk_nt_buy_qty.startsWith("-")
                                  ? "blue"
                                  : "red",
                              }}
                            >
                              {item.bnk_nt_buy_qty}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: item.invst_tp_nt_buy_qty.startsWith("-")
                                  ? "blue"
                                  : "red",
                              }}
                            >
                              {item.invst_tp_nt_buy_qty}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}
        </TabPanel>
      </Box>
    </Box>
  );
};

export default ForeignInstitutionalPage;
