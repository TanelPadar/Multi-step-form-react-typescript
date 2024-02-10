import React, {useState, ReactNode, PropsWithChildren} from "react";
import {FormProvider} from "../hooks/FormContext";

interface MultiStepFormProps {
    children: ReactNode;
}

const MultiStepForm = ({children}: PropsWithChildren<MultiStepFormProps>): React.ReactElement => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
    };

    const openStep = (index: number) => {
        setCurrentStep(index);
    };


    return (
        <>
            <FormProvider>
                <div className="container-fluid  d-flex justify-content-center align-items-center vh-100">
                    <div className="container border ">
                        <div className="row bg-white rounded-3">
                            <div className="d-flex m-2 col-3 sidebar rounded-2">
                                <div className="mt-5">
                                    {React.Children.map(children, (child, index) => {
                                        if (!React.isValidElement(child) || index === 4) {
                                            return null;
                                        }
                                        return (
                                            <div className="d-flex align-items-center w-auto mt-3">
                                                <div
                                                    className={`circle mx-3 border-info ${index === currentStep ? "StepActive" : ""}`}>
                                                    {index + 1}
                                                </div>
                                                <div className="d-block">
                                                    <div className="step">{child.props.description}</div>
                                                    <div className="step-info text-uppercase">{child.props.title}</div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            </div>

                            <div className="content col-8 d-flex flex-column m-2 mt-5">
                                <div className="d-flex align-items-center justify-content-center mb-4">
                                    {React.Children.map(children, (child, index) => {
                                        if (index === currentStep) {
                                            return React.cloneElement(child as React.ReactElement, {
                                                nextStep,
                                                prevStep,
                                                currentStep,
                                                openStep
                                            });
                                        }
                                        return null;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FormProvider>
        </>
    );
};

export default MultiStepForm;
