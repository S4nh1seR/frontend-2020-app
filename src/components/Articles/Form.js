import {Field} from "redux-form";
import {Input, Textarea} from "../common/FormControls/FormControls";
import {reqiuredField, maxSizeValidate} from "../../validators/validators";
import React from "react";

const Form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Input} name='title' placeholder={'Title'} validate={[reqiuredField]}/>
            <Field component={Textarea} name='content' placeholder={'Content'} validate={[reqiuredField]}/>
            <Field component={Input} name='image_url' placeholder={'Image URL'} validate={[maxSizeValidate]}/>
            <button>{props.buttonText}</button>
        </form>
    );
};

export default Form;