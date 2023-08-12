import { Grid, Typography } from "@mui/material";

interface ExampleItemProps {
    name: string;
    text: string;
}

function ExampleItem({name, text}: ExampleItemProps){
    return (
        <Grid container whiteSpace="pre-line">
            <Typography 
                color="text.primary"
                gutterBottom
                paddingRight="10px">
                    {name}
            </Typography>
            <Typography 
                color="text.secondary"
                gutterBottom>
                    {text}
            </Typography>
        </Grid>     
    );
};

export default ExampleItem;