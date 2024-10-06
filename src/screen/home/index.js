import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'
import { addDays, eachHourOfInterval, format, subDays } from 'date-fns'
import React from 'react'
import { Calendar } from '../../components/calendar'
import WithNavBar from '../../HOC/withNavBar'
import { CalendarStyle } from './style'

const Home = () => {
    const classes = CalendarStyle()
    const modalRef = React.useRef(null);
    const [isModalOpen, setModalOpen] = React.useState(false);

    const [weekdates, setWeekdates] = React.useState({ startDate: new Date("2024-08-29"), endDate: addDays(new Date("2024-08-29"), 6) })
    const [dates, setDates] = React.useState([])
    const [data, setData] = React.useState([])
    const [detailData, setDetailData] = React.useState({})


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
    React.useEffect(() => {
        getdateRange(weekdates.startDate, weekdates.endDate)
        getData()
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

    const getData = async () => {

        fetch("/calendarfromtoenddate.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((res) => {
                setData(res)
                groupByStartTime(res)
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
        setData(groups)
    }

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
                        <Typography>Your Todo's </Typography>
                        <Button className={classes.createBtn}>
                            <AddOutlinedIcon />
                            Create Schedule
                        </Button>
                    </Stack>

                    <Calendar
                        weekdates={weekdates}
                        dates={dates}
                        groupedData={data}
                        hours={hours}
                        detailModalOpen={handleOpenDetailModal}
                        weeknext={weeknext}
                        weekprev={weekprev}
                    />

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