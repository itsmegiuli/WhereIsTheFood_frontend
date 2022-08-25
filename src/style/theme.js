import { createTheme } from "@mui/material/styles";
// keys: https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette
const baseTheme = createTheme({
    palette: {
        primary: {
            main: "#f5c20f",
            light: "#FBE697",
            dark: "#aa7700"
        },
        secondary: {
            main: "#f5c20f"
        },
        background: {
            default: "#00000"
        }
    },

    shape: {
        borderRadius: 10
    },
    typography: {
    },
    components: {
        Button: {
            defaultProps: {
                sx: {
                    margin: 4
                }
            }
        },
        TextField: {
            defaultProps: {
                sx: {
                    color: "#ffffff"
                }
            }
        },
        Card: {
            defaultProps: {
                sx: {
                    padding: 4,
                    color: "white"
                }
            }
        },
        Container: {
            defaultProps: {
                sx: {
                    padding: 10
                }
            }

        },
    }
});

export default baseTheme;
