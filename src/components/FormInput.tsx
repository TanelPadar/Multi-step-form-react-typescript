import React from 'react';

interface FormInputFieldProps {
    register: any;
    errorMessage: string;
    name: string;
    label: string;
    errors: any;
}

const FormInputField: React.FunctionComponent<FormInputFieldProps> = ({ register, errorMessage, name, label, errors }) => {
    return (
        <div className="d-block my-2">
            <label>{label}</label>
            <input
                {...register(name, {
                    required: errorMessage,
                })}
                type="text"
                placeholder={label}
                className="w-100 py-2 rounded border border-1 px-2"
            />
            {errors[name] && <span className="inputError">{errors[name].message}</span>}
        </div>
    );
};

export default FormInputField;
