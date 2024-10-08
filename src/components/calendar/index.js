import { Box, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { addHours, format } from 'date-fns'
import React from 'react'
import { MeetingList } from '../meetingList'
import { CalendarStyle } from './style'

export const Calendar = ({
    dates,
    groupedData,
    hours,
    detailModalOpen = () => false,
}) => {
    const classes = CalendarStyle()

    const [selectedEvent, setSelectedEvent] = React.useState({
        index: "",
        data: [],
        meeting: {}
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
                                                                                    zIndex: 1
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
                                                                                    <Grid container className={classes.eventCard} columnSpacing={1} onClick={() => handleSelectViewEvent(i, groupedData?.[e])}>
                                                                                        <Grid item xs={1} className={classes.blueBorder}></Grid>
                                                                                        <Grid item xs={11} className={selectedEvent?.index === i && classes.selectedEventCard}>
                                                                                            <Stack spacing={"4px"}>
                                                                                                <Typography className={classes.eventText}>{groupedData?.[e]?.[0]?.job_id?.jobRequest_Title}</Typography>
                                                                                                <Typography className={classes.eventText}>Interviewer: {groupedData?.[e]?.[0]?.user_det?.handled_by?.firstName}</Typography>
                                                                                                <Typography className={classes.eventText}>Time: {format(groupedData?.[e]?.[0]?.start, "hh a")} - {format(addHours(groupedData?.[e]?.[0]?.end, 1), "hh a")}</Typography>
                                                                                            </Stack>
                                                                                        </Grid>
                                                                                        {groupedData?.[e]?.length > 1 && <Typography className={classes.countText}>{groupedData?.[e]?.length}</Typography>}
                                                                                    </Grid>
                                                                                </Box>

                                                                                {
                                                                                    (selectedEvent?.index === i && selectedEvent?.data?.length > 0) &&
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
                                                                                            <MeetingList
                                                                                                selectedEvent={selectedEvent}
                                                                                                handleCloseMeeting={handleCloseMeeting}
                                                                                                handleClickMeeting={handleClickMeeting}
                                                                                            />
                                                                                        }
                                                                                    </Box>
                                                                                }
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