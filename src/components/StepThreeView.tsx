import React from "react";
import {useFormContext} from "../hooks/FormContext";
import services from "../data/ServiceType.json";
import MultiStepFormButton from "./MultiStepFormButton";
import {ServicePlan} from "../models/ServicePlan";
import RenderServiceCard from "./RenderServiceCard";

interface StepThreeViewProps {
    title: string;
    description: string;
    nextStep?: () => void;
    prevStep?: () => void;
}

function StepThreeView({ nextStep, prevStep }: StepThreeViewProps) {
    const { selectedServices} = useFormContext();


    return (
        <div>
            <div className="d-flex flex-column">
                <div className="header">Pick add-ons</div>
                <div className="paragraph-text mb-3">Add-ons help you enhance your gaming experience.</div>
                <div className="d-block">
                    {services.map((service, index) => {
                        const isChecked = selectedServices.some(selected => selected.name === service.name);
                        const servicePlan = new ServicePlan(service.name, service.monthlyPrice, service.yearlyPrice, service.description);
                        return (
                            <RenderServiceCard key={index} service={servicePlan} isChecked={isChecked}/>
                        );
                    })}
                </div>
            </div>
            <MultiStepFormButton nextStep={nextStep} prevStep={prevStep} backButtonTitle="Go Back" nextButtonTitle="Next Step"/>
        </div>
    );
}

export default StepThreeView;