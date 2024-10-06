import { makeStyles } from "@mui/styles";


export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "100%",
        justifyContent: "center",
    },
    content: {
        background: "transparent",
        height: "calc(100vh - 110px)",
        overflow: "hidden",
        marginTop: "30px"
    }
}));
