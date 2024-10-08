import { Box, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { addHours, format } from 'date-fns'
import React from 'react'
import { MeetingList } from '../meetingList'
import { monthCalendarStyle } from './style'



export const MonthCalendar = ({
    dates = [],
    month = "",
    data = {},
    detailModalOpen = () => false
}) => {
    const theme = useTheme()
    const isXS = useMediaQuery(theme.breakpoints.only('xs'))
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wedsday",
        "Thusday",
        "Friday",
        "Saturday"
    ]
    const classes = monthCalendarStyle()
    const [selectedEvent, setSelectedEvent] = React.useState({
        index: "",
        data: []
    })


    const handleSelectViewEvent = (index, data) => {
        setSelectedEvent({
            index, data: data?.length > 1 ? data : []
        })
    }

    const handleCloseMeeting = () => {
        setSelectedEvent({
            index: "",
            data: []
        })
    }

    const handleClickMeeting = (meet) => {
        setSelectedEvent({
            ...selectedEvent,
            meeting: meet
        })
        detailModalOpen()
    }

    return (
        <>

            <Box>
                <Grid container>
                    <Grid item sm={12} md={12} lg={12}>
                        <Grid container>
                            {
                                days.map(e => {
                                    return (
                                        <Grid item xs={1.7} textAlign={"center"} p={1}>
                                            <span className={classes.days}> {isXS ? e.slice(0, 3) : e} </span>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        <Grid container mt={0} className={classes.calDates}>
                            <Grid item sm={12} md={12} lg={12}>
                                <Grid container>
                                    {
                                        dates?.map((e) => {
                                            return (
                                                <Grid item xs={1.7} className={classes.date_outline} sx={{ width: "100%" }}>
                                                    <Stack mt={1} justifyContent={"space-between"} height="100%" pb={2}>
                                                        <Box className={classes.date}>
                                                            <span
                                                                className={format(e, "MM") === format(month, "MM")
                                                                    ? " " : classes.hidden_other_month_dates}>
                                                                {format(e, "dd")}
                                                            </span>
                                                        </Box>
                                                        {
                                                            Object.keys(data)?.map((d, i) => {
                                                                return (
                                                                    <>
                                                                        {
                                                                            format(e, "dd-MM-yyyy") === d &&
                                                                            <Box
                                                                                sx={{
                                                                                    position: "absolute",
                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "center",
                                                                                    zIndex: 1
                                                                                }}
                                                                            >
                                                                                <Box
                                                                                    sx={{
                                                                                        position: "absolute",
                                                                                        left: 0,
                                                                                        zIndex: 9,
                                                                                        marginLeft: "16px",
                                                                                        marginTop: "150px"
                                                                                    }}
                                                                                >
                                                                                    <Grid container className={classes.eventCard} columnSpacing={1} onClick={() => handleSelectViewEvent(i, data?.[d])}>
                                                                                        <Grid item xs={1} className={classes.blueBorder}></Grid>
                                                                                        <Grid item xs={11} className={selectedEvent?.index === i && classes.selectedEventCard}>
                                                                                            <Stack spacing={"4px"}>
                                                                                                <Typography className={classes.eventText}>{data?.[d]?.[0]?.job_id?.jobRequest_Title}</Typography>
                                                                                                <Typography className={classes.eventText}>Interviewer: {data?.[d]?.[0]?.user_det?.handled_by?.firstName}</Typography>
                                                                                                <Typography className={classes.eventText}>Time: {format(data?.[d]?.[0]?.start, "hh a")} - {format(addHours(data?.[d]?.[0]?.end, 1), "hh a")}</Typography>
                                                                                            </Stack>
                                                                                        </Grid>
                                                                                        {data?.[d]?.length > 1 && <Typography className={classes.countText}>{data?.[d]?.length}</Typography>}
                                                                                    </Grid>
                                                                                </Box>

                                                                                {
                                                                                    selectedEvent?.index === i && selectedEvent?.data?.length > 0 && (
                                                                                        <Box
                                                                                            sx={{
                                                                                                position: "absolute",
                                                                                                left: 0,
                                                                                                zIndex: 9,
                                                                                                marginLeft: "-300px",
                                                                                                marginTop: "-50px"
                                                                                            }}
                                                                                        >
                                                                                            {selectedEvent?.index === i && (
                                                                                                // <Box className={classes.meetingBox}>
                                                                                                //     <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} p={"8px 16px"}>
                                                                                                //         <Typography className={classes.headTitle}>Meetings</Typography>
                                                                                                //         <Box className={classes.closeBtn} onClick={() => handleCloseMeeting()}>
                                                                                                //             <CloseRoundedIcon sx={{ color: "#fff", fontSize: "20px" }} />
                                                                                                //         </Box>
                                                                                                //     </Stack>
                                                                                                //     <Divider></Divider>
                                                                                                //     <Box className={classes.meetingContent}>
                                                                                                //         {selectedEvent?.data?.map((e, i, len) => (
                                                                                                //             <>
                                                                                                //                 <Stack spacing={1} p={2} onClick={detailModalOpen}>
                                                                                                //                     <Typography className={classes.meetTitle}>{e?.job_id?.jobRequest_Title}</Typography>
                                                                                                //                     <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                                                                                                //                         <Typography className={classes.headSubTitle}>{e?.desc}</Typography>
                                                                                                //                         <Typography className={classes.headSubTitle}>
                                                                                                //                             Interviewer: {e?.user_det?.handled_by?.firstName}
                                                                                                //                         </Typography>
                                                                                                //                     </Stack>
                                                                                                //                     <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                                                                                                //                         <Typography className={classes.headSubTitle}>Date: {format(e?.start, "dd MMM yyyy")}</Typography>
                                                                                                //                         <Typography className={classes.headSubTitle}>
                                                                                                //                             Time: {format(e?.start, "hh a")} - {format(addHours(e?.end, 1), "hh a")}
                                                                                                //                         </Typography>
                                                                                                //                     </Stack>
                                                                                                //                 </Stack>
                                                                                                //                 {len?.length - 1 !== i && <Divider></Divider>}
                                                                                                //             </>
                                                                                                //         ))}
                                                                                                //     </Box>
                                                                                                // </Box>

                                                                                                <MeetingList
                                                                                                    selectedEvent={selectedEvent}
                                                                                                    handleCloseMeeting={handleCloseMeeting}
                                                                                                    handleClickMeeting={handleClickMeeting}
                                                                                                />
                                                                                            )}
                                                                                        </Box>
                                                                                    )
                                                                                }
                                                                            </Box>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </Stack>
                                                </Grid >
                                            )
                                        })
                                    }
                                </Grid >
                            </Grid >
                        </Grid >
                    </Grid >
                </Grid >
            </Box >
        </>
    )
}
