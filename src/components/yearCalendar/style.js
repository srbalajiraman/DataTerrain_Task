import { makeStyles } from "@mui/styles";
import { Bold } from "../../utils/constants";

export const yearCalendarStyle = makeStyles((theme) => ({
    monthText: {
        fontSize: "20px",
        color: theme.typography.color.primary,
        fontFamily: Bold,
        textAlign: "center",
        width: "100%"
    },
    year_container: {
        height: "calc(100vh - 360px)",
        overflow: "auto"
    }
}))