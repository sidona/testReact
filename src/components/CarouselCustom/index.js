import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CardCustom from "../Card";
import {Divider} from "@mui/material";


export default function CarouselCustom(props) {
    const theme = useTheme();
    const {item, activeStep, onHandleNext, maxSteps, onHandleBack} = props;

    return (
        <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
            <CardCustom content={item?.body} title={item?.title} userId={item?.userId} postId={item?.id}/>
            <Divider />
            <MobileStepper
                variant="dots"
                steps={maxSteps || 5}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={onHandleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={onHandleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}
