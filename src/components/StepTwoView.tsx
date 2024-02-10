import React from "react";
import Arcade from '../images/icon-arcade.svg';
import Advanced from '../images/icon-advanced.svg';
import Pro from '../images/icon-pro.svg';
import { useFormContext } from "../hooks/FormContext";
import plans from '../data/ServicePlan.json';
import {ServicePlan} from "../models/ServicePlan";
import MultiStepFormButton from "./MultiStepFormButton";

interface ServiceCard {
    plan: ServicePlan;
    onClickValue: (planName: string) => void;
}

interface StepTwoViewProps {
    title: string;
    description: string;
    nextStep?: () => void;
    prevStep?: () => void;
    currentStep?: number;
}

const StepTwoView = ({ nextStep, prevStep }: StepTwoViewProps) => {
    const { selectedPlan, setSelectedPlan, setIsYearlyBilling, isYearlyBilling } = useFormContext();

    function toggleYearlyBilling() {
        setIsYearlyBilling(prevState => !prevState);
    }

    const ServiceCardDisplay = ({ onClickValue, plan }: ServiceCard) => (
        <div className={`card col-3 ${selectedPlan && selectedPlan.name === plan.name ? " active" : ""}`} onClick={() => onClickValue(plan.name)}>
            <div className="d-flex mt-3">
                <img src={getImageSource(plan.name)} alt={plan.name} />
            </div>
            <div className="d-block mt-4">
                <h6>{plan.name}</h6>
                <p>{plan.getPrice(isYearlyBilling)}</p>
            </div>
        </div>
    );

    const getImageSource = (name: string): string => {
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

    function handleClick(planName: string) {
        const newSelectedPlan = plans.find(plan => plan.name === planName);
        if (newSelectedPlan) {
            setSelectedPlan(newSelectedPlan);
        }
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
                            <ServiceCardDisplay
                                key={index}
                                plan={servicePlan}
                                onClickValue={handleClick}
                            />
                        )})}
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
