import { makeStyles } from "@mui/styles";
import { Regular, SemiBold } from "../../utils/constants";

export const monthCalendarStyle = makeStyles((theme) => ({
    calDates: {
        textAlign: "center",
        overflow: "auto",
        height: `calc(100vh - 405px)`,
        width: "100%",
        overflowX: 'auto',
        marginTop: "16px",
        position: "relative",
        [theme.breakpoints.only("xs")]: {
            width: "600px",
        }
    },
    calContainer: {
        width: "100%",
        overflowX: 'auto',
        marginTop: "16px",
        position: "relative",
        [theme.breakpoints.only("xs")]: {
            width: "500px",
        }
    },
    date: {
        color: theme.typography.color.secondary,
        fontSize: "1.125rem",
        fontWeight: "bold"
    },
    date_outline: {
        color: "black",
        border: `1px solid ${theme.palette.border.secondary}`,
        height: 120,
    },
    hidden_other_month_dates: {
        visibility: "hidden"
    },
    eventlabel: {
        overflow: "hidden",
        width: "100%",
        cursor: "pointer",
        // background:"#8FAEFF"

    },
    eventtxt: {
        whiteSpace: "nowrap",
        width: "99%",
        fontSize: "14px",
        cursor: "pointer"

    },
    moreLabel: {
        float: "left",
        fontSize: "14px",
        fontWeight: "bold",
        color: theme.palette.info.main,
    },
    days: {
        fontSize: "14px",
        color: theme.palette.primary.main,
        textAlign: "center",
        fontFamily: SemiBold
    },
    eventBox: {

        position: "absolute",
        zIndex: 1,

    },
    eventCard: {
        borderRadius: '2px',
        background: "white",
        boxShadow: "0px 4px 10px #00000012",
        width: "180px",
        position: "relative",
        cursor: 'pointer'
    },
    blueBorder: {
        background: theme.palette.primary.main,
        borderTopLeftRadius: "2px",
        borderBottomLeftRadius: "2px"
    },
    eventText: {
        fontSize: "12px",
        fontFamily: Regular,
        color: theme.typography.color.primary
    },
    countText: {
        position: "absolute",
        top: "-6px",
        right: "-6px",
        background: "#FFD05A",
        fontFamily: SemiBold,
        color: theme.typography.color.primary,
        fontSize: "14px",
        height: "20px",
        width: "20px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    cellBorder: {
        border: "1px solid #F1F3F3"
    },
    headTitle: {
        fontFamily: SemiBold,
        color: theme.typography.color.primary,
        fontSize: "14px",
    },
    headSubTitle: {
        fontFamily: Regular,
        color: theme.typography.color.primary,
        fontSize: "12px",
    },
    meetingBox: {
        background: "#fff",
        width: "300px",
        boxShadow: "0px 1px 8px 4px #00000012",
        borderRadius: "8px"
    },
    meetingContent: {
        height: "250px",
        overflow: "auto",
        cursor: "pointer"
    },
    closeBtn: {
        height: "20px",
        width: "20px",
        borderRadius: "50%",
        background: theme.palette.primary.main,
        cursor: "pointer"
    },
    meetTitle: {
        textAlign: "left",
        fontFamily: SemiBold,
        color: theme.typography.color.primary,
        fontSize: "12px",
    },
    selectedEventCard: {
        background: theme.palette.primary.light
    },
    tooltip: {
        "&.MuiTooltip-tooltip": {
            background: "transparent"
        }
    }
}))