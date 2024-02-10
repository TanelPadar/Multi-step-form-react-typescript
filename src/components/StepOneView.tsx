import {SubmitHandler, useForm} from 'react-hook-form';
import React from "react";
import MultiStepFormButton from "./MultiStepFormButton";
import FormInputField from "./FormInput";


type FormFields = {
    name: string;
    email: string;
    phone: number;
}


interface StepOneViewProps {
    title: string;
    description: string;
    nextStep?: () => void

}

const StepOneView = ({nextStep}: StepOneViewProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormFields>();
    const onSubmit: SubmitHandler<FormFields> = (data) => {
        data && nextStep?.()
    };


    return (
        <div>
            <div className="d-flex flex-column">
                <div className="header">Personal Info</div>
                <div className="paragraph-text mb-3">Please provide your name, email address, and phone number.</div>
                <form id="stepOneForm" onSubmit={handleSubmit(onSubmit)}>
                    <FormInputField
                        register={register}
                        errorMessage="Name is required"
                        name="name"
                        label="Name"
                        errors={errors}
                    />
                    <FormInputField
                        register={register}
                        errorMessage="Email is required"
                        name="email"
                        label="Email"
                        errors={errors}
                    />
                    <FormInputField
                        register={register}
                        errorMessage="Phone is required"
                        name="phone"
                        label="Phone"
                        errors={errors}
                    />
                </form>
            </div>
            <MultiStepFormButton formId="stepOneForm" nextButtonTitle="Next Step"/>
        </div>
    );
}

export default StepOneView;
