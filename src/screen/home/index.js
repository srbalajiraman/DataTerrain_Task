import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'
import { addDays, addMonths, eachDayOfInterval, eachHourOfInterval, endOfMonth, endOfWeek, format, getDay, startOfMonth, startOfWeek, startOfYear, subDays, subMonths } from 'date-fns'
import React from 'react'
import { Calendar } from '../../components/calendar'
import WithNavBar from '../../HOC/withNavBar'
import { CalendarStyle } from './style'
import { CalendarHeader } from '../../components/calendar/calendarHeader'
import { DayCalendar } from '../../components/dayCalendar'
import { MonthCalendar } from '../../components/monthCalendar'
import { YearCalendar } from '../../components/yearCalendar'

const Home = () => {
    const classes = CalendarStyle()
    const modalRef = React.useRef(null);
    const [isModalOpen, setModalOpen] = React.useState(false);

    const [weekdates, setWeekdates] = React.useState({ startDate: new Date("2024-08-26"), endDate: addDays(new Date("2024-08-26"), 6) })
    const [dates, setDates] = React.useState([])
    const [data, setData] = React.useState([])
    const [detailData, setDetailData] = React.useState({})
    const [monthData, setMonthData] = React.useState({
        monthstartDate: startOfWeek("2024-08-29"),
        monthendDate: endOfWeek("2024-08-29"),
        dates: [],
        month: "2024-08-29"
    })
    const [yearData, setYearData] = React.useState({
        dates: [],
        year: "2024"
    })
    const [calType, setCalType] = React.useState("Week")


    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);


    const handleBackdropClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseModal();
        }
    };

    // calendar functions

    const hours = eachHourOfInterval({
        start: new Date(2024, 10, 3, 0),
        end: new Date(2024, 10, 3, 23)
    })


    const monthStart = startOfMonth(monthData?.month);
    const monthEnd = endOfMonth(monthStart);
    const monthstartDate = startOfWeek(monthStart);
    const monthendDate = endOfWeek(monthEnd);

    React.useEffect(() => {
        getdateRange(weekdates.startDate, weekdates.endDate)
        getData(calType)
        let monthdays = dateRange(monthstartDate, monthendDate)
        setMonthData({
            ...monthData,
            dates: monthdays
        })
        generateYearCalendar(yearData?.year)
        // eslint-disable-next-line
    }, [])

    const getdateRange = (startDate, endDate) => {
        const date = new Date(startDate);

        const dateArr = [];

        while (date <= endDate) {
            dateArr.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        setDates(dateArr)

        return dateArr
    }

    const monthnext = () => {
        let tempMonth = addMonths(monthData?.month, 1)
        let monthStart = startOfMonth(tempMonth);
        let monthEnd = endOfMonth(monthStart);
        const monthDays = getdateRange(startOfWeek(monthStart), endOfWeek(monthEnd))

        setMonthData({
            ...monthData,
            dates: monthDays,
            month: format(new Date(tempMonth), "yyyy-MM-dd")
        })
    }

    const monthprev = () => {
        let tempMonth = subMonths(monthData?.month, 1)
        let monthStart = startOfMonth(tempMonth);
        let monthEnd = endOfMonth(monthStart);

        const monthDays = getdateRange(startOfWeek(monthStart), endOfWeek(monthEnd))

        setMonthData({
            ...monthData,
            dates: monthDays,
            month: format(tempMonth, "yyy-MM-dd")
        })
    }

    const weeknext = () => {
        const start = addDays(weekdates.endDate, 1)
        const end = addDays(weekdates.endDate, 7)
        setWeekdates({
            startDate: start, endDate: end
        })
        getdateRange(start, end)
    }

    const weekprev = () => {
        const start = subDays(weekdates.startDate, 7)
        const end = subDays(weekdates.startDate, 1)
        setWeekdates({
            startDate: start, endDate: end
        })
        getdateRange(start, end)
    }

    const dayNext = () => {
        const start = addDays(weekdates.startDate, 1)
        const end = addDays(weekdates.startDate, 1)
        setWeekdates({
            startDate: start, endDate: end
        })
        getdateRange(start, end)
    }

    const dayprev = () => {
        const start = subDays(weekdates.startDate, 1)
        const end = subDays(weekdates.startDate, 1)
        setWeekdates({
            startDate: start, endDate: end
        })
        getdateRange(start, end)
    }

    const yearnext = () => {
        const currentYear = (Number(yearData?.year) + 1).toString()

        generateYearCalendar(currentYear)
    }

    const yearprev = () => {
        const currentYear = (Number(yearData?.year) - 1).toString()

        generateYearCalendar(currentYear)
    }

    const getData = (type) => {
        setData([])
        fetch("/calendarfromtoenddate.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((res) => {

                let constructedData = []
                if (type === "Week" || type === "Day") {
                    constructedData = groupByStartTime(res)
                } else {
                    constructedData = groupByDate(res)
                }
                setData(constructedData)
            })
            .catch((error) => {
                console.error('Error fetching the JSON file:', error);
            });
    }


    const groupByStartTime = (data) => {
        const groups = {};
        for (const item of data) {
            const startTime = item.start;
            if (!groups[startTime]) {
                groups[startTime] = [];
            }
            groups[startTime].push(item);
        }
        return groups
    }

    const groupByDate = (data) => {
        let groupedMonthData = data?.reduce((acc, curr) => {
            const date = format(curr.start, "dd-MM-yyyy")

            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(curr)
            return acc
        }, {})
        return groupedMonthData
    };

    const handleOpenDetailModal = () => {
        fetch("/calendar_meeting.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setDetailData(data)
                handleOpenModal()
            })
            .catch((error) => {
                console.error('Error fetching the JSON file:', error);
            });

    }

    const dateRange = (startDate, endDate) => {
        const date = new Date(startDate.getTime());

        const dates = [];

        while (date <= endDate) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }


    const generateYearCalendar = (year) => {
        const months = [];
        const monthList = []
        for (let i = 0; i < 12; i++) {
            const monthStart = startOfMonth(addMonths(startOfYear(new Date(year, 0, 1)), i));
            const monthEnd = endOfMonth(monthStart);

            let adjustedStart = monthStart;
            if (getDay(monthStart) !== 0) {
                adjustedStart = subDays(monthStart, getDay(monthStart));
            }

            let adjustedEnd = monthEnd;
            if (getDay(monthEnd) !== 6) {
                adjustedEnd = addDays(monthEnd, 6 - getDay(monthEnd));
            }

            const days = eachDayOfInterval({ start: adjustedStart, end: adjustedEnd });


            months.push({
                month: format(monthStart, "dd-MMM-yyyy"),
                dates: days.map(date => date)
            });

            monthList.push(format(monthStart, "dd-MM-yyyy"))
        }
        setYearData({
            ...yearData,
            dates: months,
            month: monthList,
            year: year
        })
    };


    const handleChangeCalType = (type) => {
        setCalType(type)
        if (type === "Week") {
            const start = new Date("2024-08-26")
            const end = addDays(new Date("2024-08-26"), 6)
            setWeekdates({ startDate: start, endDate: end })
            getdateRange(start, end)
        }
        if (type === "Day") {
            setWeekdates({ startDate: new Date("2024-08-29"), endDate: new Date("2024-08-29") })
        }
        getData(type)
    }

    const handleNext = () => {
        switch (calType) {
            case "Week":
                weeknext()
                break;
            case "Day":
                dayNext()
                break
            case "Month":
                monthnext()
                break
            case "Year":
                yearnext()
                break
            default:
                return true
        }
    }

    const handlePrev = () => {
        switch (calType) {
            case "Week":
                weekprev()
                break;
            case "Day":
                dayprev()
                break
            case "Month":
                monthprev()
                break
            case "Year":
                yearprev()
                break
            default:
                return true
        }
    }

    return (
        <Box m={2}>

            <Stack spacing={2}>
                <Typography className={classes.title}>
                    Calendar
                </Typography>
                <Typography className={classes.subTitle}>
                    Enjoy your selecting potential candidates Tracking and Management System.
                </Typography>
            </Stack>

            <Box className={classes.calendarBox} mt={2}>
                <Box style={{ position: 'relative', overflow: 'hidden' }}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={3}>
                        <Typography className={classes.title}>Your Todo's </Typography>
                        <Button className={classes.createBtn}>
                            <AddOutlinedIcon />
                            Create Schedule
                        </Button>
                    </Stack>
                    <CalendarHeader
                        weekdates={weekdates}
                        next={handleNext}
                        prev={handlePrev}
                        type={calType}
                        handleChangeCalType={handleChangeCalType}
                        month={monthData?.month}
                        year={yearData?.year}
                    />
                    {
                        calType === "Week" &&
                        <Calendar
                            weekdates={weekdates}
                            dates={dates}
                            groupedData={data}
                            hours={hours}
                            detailModalOpen={handleOpenDetailModal}
                            weeknext={weeknext}
                            weekprev={weekprev}
                        />
                    }

                    {
                        calType === "Day" &&
                        <DayCalendar hours={hours}
                            groupedData={data}
                            weekdates={weekdates}
                            detailModalOpen={handleOpenDetailModal} />
                    }

                    {
                        calType === "Month" &&
                        <Box sx={{ overflow: "auto" }}>
                            <MonthCalendar
                                dates={monthData?.dates}
                                month={monthData?.month}
                                data={data}
                                detailModalOpen={handleOpenDetailModal} />
                        </Box>
                    }


                    {
                        calType === "Year" &&
                        <YearCalendar
                            dates={yearData?.dates}
                            detailModalOpen={handleOpenDetailModal}
                            data={data} />
                    }

                    {isModalOpen && (
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            bgcolor="rgba(255, 255, 255, 0.8)"
                            zIndex={10}
                            onClick={handleBackdropClick}
                        >
                            <Paper
                                ref={modalRef}
                                className={classes.modalPaper}
                            >
                                <Box className={classes.modalBox}>
                                    <Grid container className={classes.modalContentBox}>
                                        <Grid item xs={12} sm={6} className={classes.rightBorder} p={1}>
                                            <Stack spacing={2}>
                                                <Typography className={classes.modalContentText}>Interview With: {detailData?.user_det?.candidate?.candidate_firstName ?? "-"}</Typography>
                                                <Typography className={classes.modalContentText}>Position: {detailData?.job_id?.jobRequest_Title ?? "-"}</Typography>
                                                <Typography className={classes.modalContentText}>Created By: {detailData?.job_id?.jobRequest_createdBy ?? "-"}</Typography>
                                                <Typography className={classes.modalContentText}>Interview Date: {format(detailData?.start, "dd MMM yyyy")}</Typography>
                                                <Typography className={classes.modalContentText}>Interview Time: {format(detailData?.start, "hh")} - {format(detailData?.end, "hh:mm a")}</Typography>
                                                <Typography className={classes.modalContentText}>Interview Via: Google Meet</Typography>
                                                <Stack spacing={1}>
                                                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} className={classes.downloadBox}>
                                                        <Typography className={classes.dbText}>Resume.docx</Typography>
                                                        <Stack direction={"row"} alignItems={"center"}>
                                                            <VisibilityIcon className={classes.dbIconText} />
                                                            <FileDownloadOutlinedIcon className={classes.dbIconText} />
                                                        </Stack>
                                                    </Stack>
                                                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} className={classes.downloadBox}>
                                                        <Typography className={classes.dbText}>Aadharcard</Typography>
                                                        <Stack direction={"row"} alignItems={"center"}>
                                                            <VisibilityIcon className={classes.dbIconText} />
                                                            <FileDownloadOutlinedIcon className={classes.dbIconText} />
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} sm={6} className={classes.rightBox}>
                                            <Box className={classes.meetImgBox}>
                                                <Avatar src='/googlemeet.webp'
                                                    sx={{ height: "100px", width: "100px", borderRadius: "0px" }}>
                                                </Avatar>
                                            </Box>
                                            <Button className={classes.joinBtn}>JOIN</Button>
                                        </Grid>
                                    </Grid>

                                </Box>
                                <Box className={classes.closeBtn} onClick={handleCloseModal}>
                                    <CloseRoundedIcon sx={{ color: "#fff" }} />
                                </Box>
                            </Paper>

                        </Box>
                    )}
                </Box>
            </Box>



        </Box>
    )
}

export default WithNavBar(Home)