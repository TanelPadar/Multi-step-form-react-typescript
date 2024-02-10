import React from "react";
import { useFormContext } from "../hooks/FormContext";
import { ServicePlan } from "../models/ServicePlan";

interface RenderServiceCardProps {
    service: ServicePlan;
    isChecked: boolean;
}

const RenderServiceCard = ({ service, isChecked}: RenderServiceCardProps) => {
    const { isYearlyBilling,setSelectedServices } = useFormContext();

    const handleCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;

        if (checked) {
            setSelectedServices(prevSelectedServices => [
                ...prevSelectedServices,
                service
            ]);
        } else {
            setSelectedServices(prevSelectedServices =>
                prevSelectedServices.filter(selected => selected.name !== service.name)
            );
        }
    };

    return (
        <div className="add-ons-card border rounded align-items-center d-flex justify-content-between my-2">
            <div className="d-flex px-3">
                <div className="px-2">
                    <label>
                        <input type="checkbox" onChange={handleCardChange} checked={isChecked} />
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
export default RenderServiceCard;
