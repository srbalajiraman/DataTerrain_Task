import { Box, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { CalendarHeaderStyle } from './style';
import { calendarType } from '../../utils/constants';
import { format } from 'date-fns';

export const CalendarHeader = ({
    weekdates,
    next = () => false,
    prev = () => false,
    type = "Week",
    handleChangeCalType = () => false,
    month = "",
    year = "2024"
}) => {
    const classes = CalendarHeaderStyle()
    const theme = useTheme()
    const isXS = theme.breakpoints.only("xs")

    return (
        <>
            <Grid container spacing={isXS ? 2 : 0}>
                <Grid item xs={12} sm={2} md={3} lg={2}>
                    <Stack direction={"row"} spacing={3} className={classes.calBtn}>
                        <Stack direction={"row"} alignItems={"center"} spacing={1}>
                            <IconButton className={classes.iconBtn} onClick={prev}><ArrowBackIosOutlinedIcon /></IconButton>
                            <IconButton className={classes.iconBtn} onClick={next}><ArrowForwardIosOutlinedIcon /></IconButton>
                        </Stack>
                        <Box className={classes.dateBox}>
                            <Typography className={classes.dateText}>{format(new Date(), "dd")}</Typography>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={10} md={6} lg={8}>
                    <Typography className={classes.dateDurationText}>
                        {type === "Week" && `${format(weekdates?.startDate, "dd MMMM")} to ${format(weekdates?.endDate, "dd MMMM")}, ${format(weekdates?.startDate, "yyyy")}`}
                        {type === "Day" && format(weekdates?.startDate, "dd MMMM yyyy")}
                        {type === "Month" && format(month, "MMMM yyyy")}
                        {type === "Year" && year}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={2} display={"flex"} justifyContent={"end"}>
                    {
                        isXS && <center>
                            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                                {
                                    calendarType?.map((e, i) => {
                                        return (
                                            <Typography className={type === e ? classes.selectedCalendarTypeText : classes.calendarTypeText}
                                                onClick={() => handleChangeCalType(e)}>{e}</Typography>
                                        )
                                    })
                                }
                            </Stack>
                        </center>
                    }
                    {
                        !isXS && <Stack direction={"row"} alignItems={"center"} spacing={2}>
                            {
                                calendarType?.map((e, i) => {
                                    return (
                                        <Typography className={i === 1 ? classes.selectedCalendarTypeText : classes.calendarTypeText}>{e}</Typography>
                                    )
                                })
                            }
                        </Stack>
                    }
                </Grid>
            </Grid>
        </>
    )
}