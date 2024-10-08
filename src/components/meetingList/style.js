import { makeStyles } from "@mui/styles";
import { Regular, SemiBold } from "../../utils/constants";

export const meetingListStyle = makeStyles((theme) => ({
    blueBorder: {
        background: theme.palette.primary.main,
        borderTopLeftRadius: "2px",
        borderBottomLeftRadius: "2px"
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
    },
    selectedEventCard: {
        background: theme.palette.primary.light
    },
    deleteIcon: {
        fontSize: "16px",
        color: theme.palette.error.main
    },
    editIcon: {
        fontSize: "16px",
        color: theme.typography.color.primary
    }
}))