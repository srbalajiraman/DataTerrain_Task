import { makeStyles } from "@mui/styles";
import { SemiBold } from "../../utils/constants";

export const topNavbarStyle = makeStyles((theme) => ({
    iconStyle: {
        color: "#545454",
        fontSize: "26px",
        transform: 'scale(0.9)',
        strokeWidth: '0.5',
    },
    profileAvatar: {
        height: "26px",
        width: "26px"
    },
    topNavBar: {
        boxShadow: "0px 4px 8px #00000012",
        background: "#fff"
    },
    drawer: {
        "& .MuiDrawer-paper": {
            width: "calc(100vw - 300px)"
        },
    },
    menuTitleBox: {
        padding: "18px 16px",
        background: "#F7F7F7"
    },
    menuTitle: {
        fontSize: "14px",
        color: theme.typography.color.primary,
        fontFamily: SemiBold
    }
}))


export const sideNavbarStyle = makeStyles((theme) => ({
    sidenavBar: {
        // height: "calc(100vh - 150px)",
        height: "100%",
        overflow: "auto",
        borderTopRightRadius: "30px",
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        // background: "red",
        width: "100%",
        [theme.breakpoints.only("xs")]: {
            borderTopRightRadius: "0px",
            boxShadow: "none",
        }
    },
    iconBox: {
        display: "flex",
        justifyContent: "center",
        cursor: "pointer"
    },
    label: {
        fontSize: "14px",
        color: theme.typography.color.secondary,
        fontFamily: SemiBold
    },
    menu: {
        cursor: "pointer",
        padding: "0px",
        width: "100%"
    },
    selectedMenu: {
        background: theme.palette.primary.light,
        borderRadius: "50px",
        cursor: "pointer",
        padding: "0px",
        width: "100%"
    },
    selectedIcon: {
        background: theme.palette.primary.main,
        borderRadius: "50%"
    },
    subMenuText: {
        fontSize: "14px",
        color: theme.typography.color.menuText,
        fontFamily: SemiBold
    },
    menuArrowBox: {
        height: "20px",
        width: "20px",
        borderRadius: "50%",
        background: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    menuArrowText: {
        fontSize: "22px",
        color: theme.typography.color.white
    },
    subMenuArrowText: {
        color: "#5F769A"
    },
    iconStyle: {
        color: "#545454",
        fontSize: "26px",
        transform: 'scale(0.9)',
        strokeWidth: '0.5',
    },
    selectedIconStyle: {
        color: theme.palette.primary.main,
        fontSize: "26px",
        transform: 'scale(0.9)',
        strokeWidth: '0.5',
    }
}))