import { Box, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { MonthCalendar } from "../monthCalendar";
import { yearCalendarStyle } from "./style";

export const YearCalendar = ({
    dates = [],
    detailModalOpen = () => false,
    data = {},
}) => {
    const classes = yearCalendarStyle()

    return (
        <>
            <Box className={classes.year_container}>
                {
                    dates?.map((e, i) => {
                        return (
                            <Stack spacing={2} mt={1}>
                                <Typography className={classes.monthText}>{format(e?.month, "MMMM")}</Typography>
                                <MonthCalendar
                                    dates={e?.dates}
                                    month={e?.month}
                                    data={data}
                                    detailModalOpen={detailModalOpen}
                                />
                            </Stack>
                        )
                    })
                }
            </Box>
        </>
    );
}