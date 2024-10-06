import { makeStyles } from "@mui/styles";
import { Bold, Regular, SemiBold } from "../../utils/constants";

export const CalendarStyle = makeStyles((theme) => ({
    title: {
        fontSize: "20px",
        fontFamily: SemiBold,
        color: theme.typography.color.secondary
    },
    subTitle: {
        fontSize: "14px",
        fontFamily: Regular,
        color: theme.typography.color.secondary
    },
    calendarBox: {
        borderRadius: "4px",
        background: "#fff",
        padding: "16px"
    },
    todoTitle: {
        fontFamily: SemiBold,
        color: theme.palette.primary.main,
        fontSize: "14px",
    },
    createBtn: {
        background: "#fff",
        textTransform: "capitalize",
        fontFamily: SemiBold,
        color: theme.palette.primary.main,
        fontSize: "14px",
        boxShadow: "0px 4px 10px #00000012",
        "&:hover": {
            background: "#fff"
        }
    },
    modalBox: {
        position: 'relative',
        background: "#fff",
        borderRadius: "4px",
        [theme.breakpoints.only("xs")]: {
            overflow: "auto",
            height: "300px"
        }
    },
    modalContentBox: {
        border: `1.5px solid ${theme.palette.border.secondary}`
    },
    modalContentText: {
        fontSize: "12px",
        color: theme.typography.color.primary,
        fontFamily: SemiBold
    },
    downloadBox: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "4px",
        padding: "4px 8px"
    },
    dbIconText: {
        color: theme.palette.primary.main,
        cursor: "pointer"
    },
    dbText: {
        fontSize: "14px",
        color: theme.palette.primary.main,
        fontFamily: SemiBold
    },
    rightBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
        [theme.breakpoints.only("xs")]: {
            paddingBottom: "8px"
        }
    },
    joinBtn: {
        background: theme.palette.primary.main,
        fontSize: "14px",
        color: "#fff",
        fontFamily: Bold,
        "&:hover": {
            background: theme.palette.primary.main,
        }
    },
    meetImgBox: {
        border: `1px solid ${theme.palette.border.secondary}`,
        padding: "16px",
        height: "70px",
        width: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px"
    },
    rightBorder: {
        borderRight: `1px solid ${theme.palette.border.secondary}`,
        margin: "8px 0px",
        [theme.breakpoints.only("xs")]: {
            borderRight: "none",
            borderBottom: `1px solid ${theme.palette.border.secondary}`,
        }
    },
    closeBtn: {
        borderRadius: "50%",
        background: theme.palette.primary.main,
        position: "absolute",
        height: "24px",
        width: "24px",
        top: "-12px",
        right: "-12px",
        cursor: "pointer"
    },
    modalPaper: {
        padding: '16px',
        width: '400px',
        backgroundColor: 'white',
        zIndex: 11,
        position: "relative",
        [theme.breakpoints.only("xs")]: {
            width: "300px",
            height: "300px"
        }
    }
}))