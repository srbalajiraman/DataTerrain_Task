import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { addHours, format } from 'date-fns'
import React from 'react'
import { CalendarHeader } from './calendarHeader'
import { CalendarStyle } from './style'

export const Calendar = ({
    weekdates,
    dates,
    groupedData,
    hours,
    detailModalOpen = () => false,
    weeknext = () => false,
    weekprev = () => false
}) => {
    const classes = CalendarStyle()

    const [selectedEvent, setSelectedEvent] = React.useState({
        index: "",
        data: []
    })

    const handleSelectViewEvent = (index, data) => {
        setSelectedEvent({
            index, data
        })
    }

    const handleCloseMeeting = () => {
        setSelectedEvent({
            index: "",
            data: []
        })
    }

    return (
        <>
            <CalendarHeader
                weekdates={weekdates}
                weeknext={weeknext}
                weekprev={weekprev}
            />
            <TableContainer className={classes.table_container} component={Paper} style={{ maxWidth: '100%', overflowX: 'auto', marginTop: "16px", position: "relative", zIndex: 0 }}>
                <Table stickyHeader sx={{ border: "none", overflow: "auto", tableLayout: "fixed" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: "70px" }}>

                            </TableCell>
                            {
                                dates?.map((d) => {
                                    return (
                                        <TableCell className={classes.headCell}>
                                            <Stack spacing={1} alignItems={"center"}>
                                                <Typography className={classes.headTitle}>{format(d, "dd MMM")}</Typography>
                                                <Typography className={classes.headSubTitle}>{format(d, "EEEE")}</Typography>
                                            </Stack>
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ border: '1px solid #F1F3F3' }}>
                        {
                            hours?.map((hr) => {
                                return (
                                    <TableRow sx={{ position: "relative", border: '1px solid #F1F3F3' }}>
                                        <TableCell className={classes.timeCol}>
                                            <center>
                                                <Typography className={classes.timeColText}>{format(hr, 'h a').replace(/AM|PM/, match => match.split('').join('.'))}</Typography>
                                            </center>
                                        </TableCell>
                                        {
                                            dates?.map((d) => {
                                                return (
                                                    <TableCell className={classes.tableCol} sx={{ border: '1px solid #F1F3F3' }} style={{ width: '500px' }}>
                                                        {
                                                            Object.keys(groupedData)?.map((e, i) => {
                                                                return (
                                                                    <>

                                                                        {
                                                                            (format(hr, 'hh:mm a') === format(e, 'hh:mm a') && format(e, "dd-MM-yyyy") === format(d, "dd-MM-yyyy")) &&

                                                                            <Box
                                                                                sx={{
                                                                                    position: "absolute",
                                                                                    maxHeight: "400px",
                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "center",
                                                                                    width: "530px",
                                                                                    zIndex: 9
                                                                                }}
                                                                            >
                                                                                <Box
                                                                                    sx={{
                                                                                        position: "absolute",
                                                                                        left: 0,
                                                                                        zIndex: 9,
                                                                                        marginLeft: "16px",
                                                                                    }}
                                                                                >
                                                                                    <Grid container className={classes.eventCard} columnSpacing={1} onClick={() => groupedData?.[e]?.length > 1 && handleSelectViewEvent(i, groupedData?.[e])}>
                                                                                        <Grid item xs={1} className={classes.blueBorder}></Grid>
                                                                                        <Grid item xs={11}>
                                                                                            <Stack spacing={"4px"}>
                                                                                                <Typography className={classes.eventText}>{groupedData?.[e]?.[0]?.job_id?.jobRequest_Title}</Typography>
                                                                                                <Typography className={classes.eventText}>Interviewer: {groupedData?.[e]?.[0]?.user_det?.handled_by?.firstName}</Typography>
                                                                                                <Typography className={classes.eventText}>Time: {format(groupedData?.[e]?.[0]?.start, "hh a")} - {format(addHours(groupedData?.[e]?.[0]?.end, 1), "hh a")}</Typography>
                                                                                            </Stack>
                                                                                        </Grid>
                                                                                        {groupedData?.[e]?.length > 1 && <Typography className={classes.countText}>{groupedData?.[e]?.length}</Typography>}
                                                                                    </Grid>
                                                                                </Box>

                                                                                <Box
                                                                                    sx={{
                                                                                        position: "absolute",
                                                                                        right: 0,
                                                                                        zIndex: 9,
                                                                                        marginRight: "16px",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        selectedEvent?.index === i &&
                                                                                        <Box className={classes.meetingBox}>
                                                                                            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} p={"8px 16px"}>
                                                                                                <Typography className={classes.headTitle}>Meetings</Typography>
                                                                                                <Box className={classes.closeBtn} onClick={() => handleCloseMeeting()}><CloseRoundedIcon sx={{ color: "#fff", fontSize: "20px" }} /></Box>
                                                                                            </Stack>
                                                                                            <Divider></Divider>
                                                                                            <Box className={classes.meetingContent}>
                                                                                                {
                                                                                                    selectedEvent?.data?.map((e, i, len) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <Stack spacing={1} p={2} onClick={detailModalOpen}>
                                                                                                                    <Typography className={classes.meetTitle}>{e?.job_id?.jobRequest_Title}</Typography>
                                                                                                                    <Stack
                                                                                                                        direction="row"
                                                                                                                        divider={<Divider orientation="vertical" flexItem />}
                                                                                                                        spacing={2}
                                                                                                                    >
                                                                                                                        <Typography className={classes.headSubTitle}>{e?.desc}</Typography>
                                                                                                                        <Typography className={classes.headSubTitle}>Interviewer: {e?.user_det?.handled_by?.firstName}</Typography>
                                                                                                                    </Stack>
                                                                                                                    <Stack
                                                                                                                        direction="row"
                                                                                                                        divider={<Divider orientation="vertical" flexItem />}
                                                                                                                        spacing={2}
                                                                                                                    >
                                                                                                                        <Typography className={classes.headSubTitle}>Date: {format(e?.start, "dd MMM yyyy")}</Typography>
                                                                                                                        <Typography className={classes.headSubTitle}>Time: {format(e?.start, "hh a")} - {format(addHours(e?.end, 1), "hh a")}</Typography>
                                                                                                                    </Stack>
                                                                                                                </Stack>
                                                                                                                {len?.length - 1 !== i && <Divider></Divider>}
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </Box>
                                                                                        </Box>
                                                                                    }
                                                                                </Box>
                                                                            </Box>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}