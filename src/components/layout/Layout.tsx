import { Grid } from "@mui/material";
import Navigation from "../navigation/Navigation";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
       <Grid container>
            <Grid  width="100%">
                <Navigation />
            </Grid>
            <Grid width="100%" height="100%" padding="20px" maxWidth="1400px" marginX="auto">
                <Outlet />
            </Grid>
       </Grid>
    );
}

export default Layout;