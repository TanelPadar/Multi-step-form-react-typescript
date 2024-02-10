import React from "react";
import {useFormContext} from "../hooks/FormContext";
import services from "../data/ServiceType.json";
import MultiStepFormButton from "./MultiStepFormButton";
import {ServicePlan} from "../models/ServicePlan";


interface ServiceCardProps {
    service: ServicePlan;
}

interface StepThreeViewProps {
    title: string;
    description: string;
    nextStep?: () => void;
    prevStep?: () => void;
}

function ServiceCard({service}: ServiceCardProps) {
    const {isYearlyBilling, selectedServices, setSelectedServices} = useFormContext();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = event.target;
        if (checked) {
            setSelectedServices(prevSelectedServices => [
                ...prevSelectedServices,
                {
                    serviceName: service.name,
                    serviceDesc: service.description || "",
                    monthlyPrice: service.monthlyPrice,
                    yearlyPrice: service.yearlyPrice,
                }
            ]);
        } else {
            setSelectedServices(prevSelectedServices =>
                prevSelectedServices.filter(selected => selected.serviceName !== service.name)
            );
        }
    };


    const isChecked = selectedServices.some(selected => selected.serviceName === service.name);

    return (
        <div className="add-ons-card border rounded align-items-center d-flex justify-content-between my-2">
            <div className="d-flex px-3">
                <div className="px-2">
                    <label>
                        <input type="checkbox" onChange={handleChange} checked={isChecked}/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div>
                    <p className="service-info">{service.name}</p>
                    <p className="service-desc">{service.description}</p>
                </div>
            </div>
            <div className="service-price px-3">
                {service.getPrice(isYearlyBilling)}
            </div>
        </div>
    );
}

function StepThreeView({nextStep, prevStep}: StepThreeViewProps) {

    return (
        <div>
            <div className="d-flex flex-column">
                <div className="header">Pick add-ons</div>
                <div className="paragraph-text mb-3">Add-ons help you enchance your gaming experience.</div>
                <div className="d-block">
                    {services.map((service) => {
                        const servicePlan = new ServicePlan(service.name, service.monthlyPrice, service.yearlyPrice, service.description);
                        return <ServiceCard service={servicePlan}/>;
                    })}
                </div>

            </div>
            <MultiStepFormButton nextStep={nextStep} prevStep={prevStep} backButtonTitle="Go Back"
                                 nextButtonTitle="Next Step"/>
        </div>
    );
}

export default StepThreeView;
