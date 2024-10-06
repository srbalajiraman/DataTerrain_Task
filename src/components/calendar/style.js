import { makeStyles } from "@mui/styles";
import { Bold, Regular, SemiBold } from "../../utils/constants";

export const CalendarStyle = makeStyles((theme) => ({
    table_container: {
        maxHeight: `calc(100vh - 365px)`,
    },
    headCell: {
        width: "120px",
        borderRight: "1.5px solid #F1F3F3"
    },
    timeCol: {
        position: "relative",
        width: "auto",
        display: "flex",
        alignItems: "center",
        height: "100px",
        border: `1px solid #F1F3F3`
    },
    timeColText: {
        position: "absolute",
        bottom: 0,
        left: 0,
        fontFamily: SemiBold,
        color: theme.palette.primary.main,
        fontSize: "14px",
        textAlign: "center",
        width: "100%"
    },
    tableCol: {
        height: "70px"
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
        position: "absolute",
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
        fontFamily: SemiBold,
        color: theme.typography.color.primary,
        fontSize: "12px",
    }
}))

export const CalendarHeaderStyle = makeStyles((theme) => ({
    iconBtn: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "8px"
    },
    dateBox: {
        padding: "4px 20px",
        borderRadius: "4px",
        boxShadow: "0px 4px 10px #00000021",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    dateText: {
        fontSize: "20px",
        color: theme.palette.primary.main,
        fontFamily: Bold,
    },
    dateDurationText: {
        fontSize: "20px",
        color: theme.typography.color.primary,
        fontFamily: SemiBold,
        textAlign: "center",
        width: "100%"
    },
    calendarTypeText: {
        fontSize: "14px",
        color: theme.typography.color.primary,
        fontFamily: Regular,
        cursor: "pointer"
    },
    selectedCalendarTypeText: {
        fontSize: "14px",
        color: theme.typography.color.primary,
        fontFamily: Regular,
        cursor: "pointer",
        display: 'inline-block',
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -3,
            height: 2,
            backgroundColor: theme.palette.primary.main,
        },
    },
    calBtn: {
        [theme.breakpoints.only("xs")]: {
            justifyContent: "space-between"
        }
    }
}))