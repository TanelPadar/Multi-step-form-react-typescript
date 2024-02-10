import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { IServicePlan } from "../models/ServicePlan";

interface FormContextType {
    isYearlyBilling: boolean;
    setIsYearlyBilling: Dispatch<SetStateAction<boolean>>;
    selectedPlan: IServicePlan;
    setSelectedPlan: Dispatch<SetStateAction<IServicePlan>>;
    selectedServices: IServicePlan[];
    setSelectedServices: Dispatch<SetStateAction<IServicePlan[]>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};

interface FormProviderProps {
    children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    const [isYearlyBilling, setIsYearlyBilling] = useState<boolean>(false);
    const [selectedPlan, setSelectedPlan] = useState<IServicePlan>({ name: "", monthlyPrice: 0, yearlyPrice: 0 });
    const [selectedServices, setSelectedServices] = useState<IServicePlan[]>([]);

    return (
        <FormContext.Provider value={{ isYearlyBilling, setIsYearlyBilling, selectedPlan, setSelectedPlan, selectedServices, setSelectedServices }}>
            {children}
        </FormContext.Provider>
    );
};
