import { Container, Typography } from "@mui/material";

interface ProblemDescriptionProps {
    title: string;
    description: string;
}

function ProblemDescription({title, description}: ProblemDescriptionProps){
    return (
        <Container disableGutters>
            <Typography
                component="h1"
                variant="h2"
                color="text.primary"
                gutterBottom
                >
                {title}
            </Typography>
        <Typography variant="h5" color="text.secondary" component="p">
          {description}
        </Typography>
      </Container>
    );
};

export default ProblemDescription;