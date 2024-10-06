import { InputBase, Paper, Stack } from '@mui/material'
import React from 'react'
import { searchBoxStyle } from './style'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export const SearchBox = ({
    customWidth = "auto",
    placeholder = ""
}) => {
    const classes = searchBoxStyle({
        customWidth
    })
    return (
        <>
            <Paper
                component="form"
                className={classes.paper}
            >
                <Stack direction={"row"} alignItems={"center"}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={placeholder}
                        inputProps={{ 'aria-label': placeholder }}
                        onChange={(e) => console.log(e.target.value)}
                    />
                    <SearchOutlinedIcon className={classes.iconStyle} />
                </Stack>

            </Paper>
        </>
    )
}