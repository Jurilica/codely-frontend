import { Container, Typography } from "@mui/material";

interface ProblemDescriptionProps {
    title: string;
    difficulty: string;
    description: string;
}

function ProblemDescription({title,difficulty, description}: ProblemDescriptionProps){
    return (
        <Container disableGutters>
            <Typography
                component="h1"
                variant="h2"
                color="text.primary"
                fontSize="1.8rem"
                fontWeight="bold"
                gutterBottom
                >
                {title}
            </Typography>
            <Typography 
                variant="h1" 
                color="text.primary" 
                component="h3"
                fontWeight="bold"
                fontSize="1.2rem"
                gutterBottom >
                {difficulty}
            </Typography>
            <Typography 
                variant="h5" 
                color="text.secondary" 
                component="p"
                fontSize="1.2rem" >
                {description}
            </Typography>
      </Container>
    );
};

export default ProblemDescription;