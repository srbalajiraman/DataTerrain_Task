import {
    Box,
    Stack
} from '@mui/material';
import React from 'react';
import { sideNavbarStyle } from './style';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

const SideNavBar = () => {
    const classes = sideNavbarStyle();
    const [selected, setSelected] = React.useState(4)
    const sideBarList = [
        {
            id: 1,
            icon: <DashboardOutlinedIcon className={classes.iconStyle} />,
            selectedIcon: <DashboardOutlinedIcon className={classes.selectedIconStyle} />
        },
        {
            id: 2,
            icon: <NoteAltOutlinedIcon className={classes.iconStyle} />,
            selectedIcon: <NoteAltOutlinedIcon className={classes.selectedIconStyle} />
        },
        {
            id: 3,
            icon: <ListAltOutlinedIcon className={classes.iconStyle} />,
            selectedIcon: <ListAltOutlinedIcon className={classes.selectedIconStyle} />
        },
        {
            id: 4,
            icon: <FormatListBulletedOutlinedIcon className={classes.iconStyle} />,
            selectedIcon: <FormatListBulletedOutlinedIcon className={classes.selectedIconStyle} />
        },
        {
            id: 5,
            icon: <PeopleOutlinedIcon className={classes.iconStyle} />,
            selectedIcon: <PeopleOutlinedIcon className={classes.selectedIconStyle} />
        },
        {
            id: 6,
            icon: <BusinessCenterOutlinedIcon className={classes.iconStyle} />,
            selectedIcon: <BusinessCenterOutlinedIcon className={classes.selectedIconStyle} />
        },
        {
            id: 7,
            icon: <SupportAgentOutlinedIcon className={classes.iconStyle} />,
            selectedIcon: <SupportAgentOutlinedIcon className={classes.selectedIconStyle} />
        },
        {
            id: 8,
            icon: <TuneRoundedIcon className={classes.iconStyle} />,
            selectedIcon: <TuneRoundedIcon className={classes.selectedIconStyle} />
        }
    ]

    return (
        <>
            <Box className={classes.sidenavBar}>
                <Stack justifyContent={"space-between"} height={"calc(100vh - 150px)"} p={2} >
                    {
                        sideBarList?.map((e) => {
                            return (
                                <Box onClick={() => setSelected(e?.id)} className={classes.iconBox}>
                                    {
                                        e?.id === selected ? e?.selectedIcon : e?.icon
                                    }
                                </Box>
                            )
                        })
                    }
                </Stack>
            </Box>
        </>
    )
};

export default SideNavBar;
