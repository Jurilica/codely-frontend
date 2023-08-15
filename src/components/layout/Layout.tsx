import { Grid } from "@mui/material";
import Navigation from "../navigation/Navigation";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
       <Grid container>
            <Navigation />
            <Grid width="100%" height="100%" padding="20px" maxWidth="1200px" marginX="auto">
                <Outlet />
            </Grid>
       </Grid>
    );
}

export default Layout;