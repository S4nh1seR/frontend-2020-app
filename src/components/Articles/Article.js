import React, {useState} from "react";
import {reduxForm} from "redux-form";
import Form from "./Form";

const ArticleData = (props) => {
    return (
        <div>
            {props.article.image_url && <img src={props.article.image_url}/>}
            <h5>{props.article.title}</h5>
            User: {props.article.user.username}
            <p>{props.article.content}</p>
            {props.isOwner && <button onClick={props.goToEditMode}>Edit</button>}
        </div>
    );
}

const EditArticleReduxForm = reduxForm({form: 'editArticle'})(Form);

const ArticleHook = (props) => {
    let [editMode, setEditMode] = useState(false);

    const onSubmit = (formData) => {
        props.updateArticle(formData);
        setEditMode(false);
    }

    return (
        <div>
            {editMode
                ? <EditArticleReduxForm initialValues={{title: props.article.title, content: props.article.content}}
                                    onSubmit={onSubmit} buttonText={'Save changes'}/>
                : <ArticleData isOwner={props.isOwner} article={props.article} goToEditMode={() => setEditMode(true)}/>}
        </div>
    )
}

export default ArticleHook;