import React from "react";

interface MultiStepFormButtonProps {

    nextStep?: () => void;
    prevStep?: () => void;
    currentStep?: number;
    nextButtonTitle: string;
    backButtonTitle?: string
    formId?: string;
}

export const MultiStepFormButton = ({ prevStep, nextStep, backButtonTitle, nextButtonTitle, formId}: MultiStepFormButtonProps) => {


    return (
        <div className="button-wrap d-flex justify-content-between mt-5">
            <a onClick={prevStep} className="back-button">
                {backButtonTitle && backButtonTitle}
            </a>
            <button onClick={nextStep} form={formId} className="next-step-btn btn btn-primary">
                {nextButtonTitle}
            </button>
        </div>
    );
}

export default MultiStepFormButton;