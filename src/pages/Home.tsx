import React from "react";
import MultiStepForm from "../components/MultiStepForm";
import StepOneView from "../components/StepOneView";
import StepTwoView from "../components/StepTwoView";
import StepThreeView from "../components/StepThreeView";
import StepFourthView from "../components/StepFourthView";
import ThankYouView from "../components/ThankYouView";


const HomePage = () => {
    return (
        <MultiStepForm>
            <StepOneView description={"step 1"} title={"your info"}/>
            <StepTwoView description={"step 2"} title={"select plan"}/>
            <StepThreeView description={"step 3"} title={"add-ons"}/>
            <StepFourthView description={"step 4"} title={"summary"}/>
            <ThankYouView/>
        </MultiStepForm>
    );
};

export default HomePage;
