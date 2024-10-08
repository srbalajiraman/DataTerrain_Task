import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { addHours, format } from 'date-fns'
import React from 'react'
import { meetingListStyle } from './style'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

export const MeetingList = ({
    selectedEvent = {},
    handleCloseMeeting = () => false,
    handleClickMeeting = () => false
}) => {
    const classes = meetingListStyle()
    return (
        <Box className={classes.meetingBox}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} p={"8px 16px"}>
                <Typography className={classes.headTitle}>Meetings</Typography>
                <Box className={classes.closeBtn} onClick={() => handleCloseMeeting()}><CloseRoundedIcon sx={{ color: "#fff", fontSize: "20px" }} /></Box>
            </Stack>
            <Divider></Divider>
            <Stack className={classes.meetingContent} rowGap={1} py={1}>
                {
                    selectedEvent?.data?.map((e, i, len) => {
                        return (
                            <>
                                <Grid container>
                                    <Grid item xs={0.5} className={classes.blueBorder}></Grid>
                                    <Grid item xs={11.5} className={selectedEvent?.meeting?.id === e?.id && classes.selectedEventCard}>
                                        <Stack spacing={1} p={2} onClick={() => handleClickMeeting(e)}>
                                            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                                <Typography className={classes.meetTitle}>{e?.job_id?.jobRequest_Title}</Typography>
                                                <Stack direction={"row"} alignItems={"center"} spacing={"4px"}>
                                                    <BorderColorOutlinedIcon className={classes.editIcon} />
                                                    <DeleteOutlineRoundedIcon className={classes.deleteIcon} />
                                                </Stack>
                                            </Stack>
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
                                    </Grid>
                                </Grid>
                                {len?.length - 1 !== i && <Divider></Divider>}
                            </>
                        )
                    })
                }
            </Stack>
        </Box>
    )
}