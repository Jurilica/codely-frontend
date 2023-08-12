import { Container, Grid, Typography } from "@mui/material";
import { ExampleData } from "../problems/problemsApiSlice";
import ExampleItem from "./ExampleItem";

interface ExampleContainerProps {
    examples: ExampleData[];
}

function ExampleContainer({examples}: ExampleContainerProps){
    return (
        <Container sx={{marginTop:"30px"}} disableGutters>
            {
                examples.map((example,index) => 
                <Grid key={index}>
                    <Typography 
                        color="text.primary"
                        component="h6"
                        fontSize="1.2rem"
                        fontWeight="bold"
                        gutterBottom>
                            Example {index + 1}:
                    </Typography>
                    <Grid sx={{
                        backgroundColor:"#d3d3d3",
                        marginRight:"20px",
                        padding: "15px",
                        borderRadius: "10px"}}>
                        <ExampleItem name={"Input:"} text={example.input} />
                        <ExampleItem name={"Output:"} text={example.output} />
                        <ExampleItem name={"Explanation:"} text={example.explanation} />
                    </Grid>
                </Grid>)
            }
      </Container>
    );
};

export default ExampleContainer;