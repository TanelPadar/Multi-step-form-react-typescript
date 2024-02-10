import React from "react";

interface RenderServicePlanProps {
    imageSrc: string;
    name: string;
    price: string;
    isSelected: boolean;
    onClick: () => void;
}

const RenderServicePlan = ({ imageSrc, name, price, isSelected, onClick }: RenderServicePlanProps) => (
    <div className={`card col-3 ${isSelected ? " active" : ""}`} onClick={onClick}>
        <div className="d-flex mt-3">
            <img src={imageSrc} alt={name} />
        </div>
        <div className="d-block mt-4">
            <h6>{name}</h6>
            <p>{price}</p>
        </div>
    </div>
);

export default RenderServicePlan;
