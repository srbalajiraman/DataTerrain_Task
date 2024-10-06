import { makeStyles } from "@mui/styles";

export const searchBoxStyle = makeStyles((theme) => ({
    paper: {
        boxShadow: "0px 0px 15px 0px #0000000D",
        borderRadius: "4px",
        padding: "8px 20px",
        width: (props) => props?.customWidth ? props?.customWidth : "auto"
    },
    iconStyle: {
        color: "#545454",
        fontSize: "26px",
        transform: 'scale(0.9)',
        strokeWidth: '0.5',
    }
}))