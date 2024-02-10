import React from "react";
import {useFormContext} from "../hooks/FormContext";
import MultiStepFormButton from "./MultiStepFormButton";

interface prices {
    yearlyPrice: number;
    monthlyPrice: number;
}

interface StepFourthViewProps {
    title: string;
    description: string;
    nextStep?: () => void;
    prevStep?: () => void;
    currentStep?: number;
    openStep?: (index: number) => void;
}

const StepFourthView = ({ nextStep, prevStep, openStep}: StepFourthViewProps) => {
    const {selectedPlan, selectedServices, isYearlyBilling} = useFormContext();

    const calculatePlanPrice = (plan: prices, isYearlyBilling: boolean): number => {
        return isYearlyBilling ? plan.yearlyPrice : plan.monthlyPrice;
    };

    const calculateServicePrices = (services: prices[], isYearlyBilling: boolean): number => {
        return services.reduce((total, service) => {
            return total + (isYearlyBilling ? service.yearlyPrice : service.monthlyPrice);
        }, 0);
    };

    const formatPrice = (price: number, isYearlyBilling: boolean): string => {
        const cycle = isYearlyBilling ? "/yr" : "/mo";
        return `$${price}${cycle}`;
    };

    const calculateTotalPrice = (selectedPlan: prices, selectedServices: prices[], isYearlyBilling: boolean): string => {
        const planPrice = calculatePlanPrice(selectedPlan, isYearlyBilling);
        const servicePrices = calculateServicePrices(selectedServices, isYearlyBilling);
        const totalPrice = planPrice + servicePrices;
        return formatPrice(totalPrice, isYearlyBilling);
    };

    return (
        <div>
            <div className="d-flex flex-column">
                <div className="header">Finishing up</div>
                <div className="paragraph-text mb-3">Double-check everything looks OK before confirming.</div>
                <div className="summary-card  rounded d-flex flex-column  bg-light">
                    <div className="d-flex w-100 justify-content-between align-items-center border-bottom">
                        <div className="d-block p-3">
                            <p className="arcade-monthly">{`${selectedPlan.name} (${isYearlyBilling ? "Yearly" : "Monthly"})`}</p>
                            <a onClick={() => openStep && openStep(1)} className="change">Change</a>
                        </div>
                        <div>
                            <p className="price pe-3">{isYearlyBilling ? `$${selectedPlan.yearlyPrice}/yr` : `$${selectedPlan.monthlyPrice}/mo`}</p>

                        </div>
                    </div>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <div className="d-block p-3">
                            {selectedServices.map((service, index) =>
                                <p className="services py-1">{service.name}</p>
                            )}
                        </div>
                        <div className="d-block">
                            {selectedServices.map((price) => (
                                <p className="price2 pe-3 py-1">
                                    {isYearlyBilling ? `$+${price.yearlyPrice}/yr` : `+${price.monthlyPrice}/mo`}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-3">
                    <p className="text-muted">{`Total ${isYearlyBilling ? "(per year)" : "(per month)"}`}</p>
                    <p className="h4 total-price">{`+${calculateTotalPrice(selectedPlan,selectedServices,isYearlyBilling)}`}</p>
                </div>

            </div>
            <MultiStepFormButton nextStep={nextStep} prevStep={prevStep} backButtonTitle="Go Back" nextButtonTitle="Confirm"/>
        </div>
    );
}

export default StepFourthView;