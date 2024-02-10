import React from "react";
import { useFormContext } from "../hooks/FormContext";
import plans from '../data/ServicePlan.json';
import { ServicePlan } from "../models/ServicePlan";
import MultiStepFormButton from "./MultiStepFormButton";
import RenderServicePlan from "./RenderServicePlan";
import Arcade from '../images/icon-arcade.svg';
import Advanced from '../images/icon-advanced.svg';
import Pro from '../images/icon-pro.svg';

interface StepTwoViewProps {
    nextStep?: () => void;
    prevStep?: () => void;
    title: string;
    description: string;
}

const StepTwoView: React.FC<StepTwoViewProps> = ({ nextStep, prevStep }) => {
    const { selectedPlan, setSelectedPlan, setIsYearlyBilling, isYearlyBilling } = useFormContext();

    function toggleYearlyBilling() {
        setIsYearlyBilling(prevState => !prevState);
    }

    const getImageSource = (name: string): string=> {
        switch (name) {
            case "Arcade":
                return Arcade;
            case "Advanced":
                return Advanced;
            case "Pro":
                return Pro;
            default:
                return "";
        }
    }

    function handleClick(plan: ServicePlan) {
        setSelectedPlan(plan);
    }

    return (
        <div>
            <div className="d-flex flex-column">
                <div className="header">Select your plan</div>
                <div className="paragraph-text mb-3">You have the option of monthly or yearly billing.</div>
                <div className="row justify-content-between mx-1">
                    {plans.map((plan, index) => {
                        const servicePlan = new ServicePlan(plan.name, plan.monthlyPrice, plan.yearlyPrice);
                        return (
                            <RenderServicePlan
                                key={index}
                                imageSrc={getImageSource(plan.name)}
                                name={servicePlan.name}
                                price={servicePlan.getPrice(isYearlyBilling)}
                                isSelected={selectedPlan && selectedPlan.name === servicePlan.name}
                                onClick={() => handleClick(servicePlan)}
                            />
                        )
                    })}
                </div>
                <div className="mt-5 mb-2 toggle-container bg-light rounded justify-content-center d-flex align-items-center">
                    Monthly
                    <label className="switch mx-2">
                        <input type="checkbox" onChange={toggleYearlyBilling} checked={isYearlyBilling} />
                        <span className="slider round"></span>
                    </label>
                    Yearly
                </div>
            </div>
            <MultiStepFormButton nextStep={nextStep} prevStep={prevStep} backButtonTitle="Go Back" nextButtonTitle="Next Step"/>
        </div>
    );
}

export default StepTwoView;
