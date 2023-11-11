'use client'

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormButtonSubmitProps = {
    children: React.ReactNode,
    className?: string
} & ComponentProps<"button">

const FormButtonSubmit = ({children, className}: FormButtonSubmitProps) => {
    const {pending} = useFormStatus();
    return ( <button className={className} type="submit" disabled={pending}>
        {pending && <span className="loading loading-infinity loading-md"></span>}
        {children}
    </button> );
}
 
export default FormButtonSubmit;