import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { Avatar, Box, Drawer, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { SearchBox } from '../searchBox';
import CustomSpeedDial from './speedDial';
import { topNavbarStyle } from './style';
import SideNavBar from './sideNavbar';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

const TopNavbar = () => {
    const classes = topNavbarStyle()
    const theme = useTheme()
    const isXS = useMediaQuery(theme.breakpoints.only('xs'))
    const [drawer, setDrawer] = React.useState(false)

    const actions = [
        { icon: <WbSunnyOutlinedIcon className={classes.iconStyle} /> },
        { icon: <UploadFileOutlinedIcon className={classes.iconStyle} /> },
        { icon: <ChatOutlinedIcon className={classes.iconStyle} /> },
        { icon: <NotificationsOutlinedIcon className={classes.iconStyle} /> },
        { icon: <SettingsOutlinedIcon className={classes.iconStyle} /> }
    ];

    return (
        <>


            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} p={"16px 24px"} className={classes.topNavBar}>
                <Stack direction={"row"} alignItems={"center"} spacing={3}>
                    {isXS && <MenuRoundedIcon onClick={() => setDrawer(true)} />}
                    <Avatar src={"/logo.png"} sx={{ width: "150px", borderRadius: "0px" }}></Avatar>
                    {!isXS && <SearchBox customWidth={"200px"} placeholder="Search" />}
                </Stack>
                {
                    !isXS &&
                    <Stack direction={"row"} alignItems={"center"} spacing={5}>
                        <WbSunnyOutlinedIcon className={classes.iconStyle} />
                        <UploadFileOutlinedIcon className={classes.iconStyle} />
                        <ChatOutlinedIcon className={classes.iconStyle} />
                        <NotificationsOutlinedIcon className={classes.iconStyle} />
                        <SettingsOutlinedIcon className={classes.iconStyle} />
                        <Avatar className={classes.profileAvatar} src={"/9440461.jpg"}></Avatar>
                    </Stack>
                }
                {
                    isXS &&
                    <Stack direction={"row"} alignItems={"center"} spacing={5}>
                        <CustomSpeedDial
                            buttonIcon={<MoreHorizRoundedIcon sx={{ color: '#000' }} />}
                            actions={actions}
                        />
                        <Avatar className={classes.profileAvatar} src={"/9440461.jpg"}></Avatar>
                    </Stack>
                }
            </Stack>

            {
                isXS &&
                <Drawer
                    anchor={"left"}
                    open={drawer}
                    className={classes.drawer}
                    onClose={() => setDrawer(false)}
                >
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} className={classes.menuTitleBox}>
                        <Typography className={classes.menuTitle}>Menu</Typography>
                        <CloseRoundedIcon onClick={() => setDrawer(false)} />
                    </Stack>
                    <Box p={"8px 16px"} sx={{ height: "calc(100vh - 75px)", overflow: "auto", background: "#fff" }} >
                        <SideNavBar />
                    </Box>
                </Drawer>
            }

        </>
    )
}

export default TopNavbar