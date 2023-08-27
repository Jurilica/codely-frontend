import { Box, Container, Typography } from "@mui/material";
import DifficultyPill from "../../../components/difficulty/DifficultyPill";
import { ProblemDifficulty } from "../../../app/enums";

interface ProblemDescriptionProps {
    title: string;
    difficulty: ProblemDifficulty;
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
            <Box marginBottom="10px">
                <DifficultyPill difficulty={difficulty} />
            </Box>
            <Typography 
                variant="h5" 
                color="text.secondary" 
                component="p"
                fontSize="1.2rem" 
                whiteSpace="pre-line">
                {description}
            </Typography>
      </Container>
    );
};

export default ProblemDescription;