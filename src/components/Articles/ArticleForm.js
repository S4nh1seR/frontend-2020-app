import Form from "./Form";
import React from "react";
import {reduxForm} from "redux-form";
import {setArticlesAC} from "../../redux/articlesReducer";
import {connect} from "react-redux";
import {articleAPI, isSuccessResponse} from "../../api/api";

const ArticleReduxForm = reduxForm({form: 'articleForm'})(Form);

const ArticleForm = (props) => {
    const getArticles = (page, pageSize) => {
        const limit = pageSize;
        const offset = (page - 1) * pageSize;
        articleAPI.getArticles(limit, offset).then(response => {
            if (isSuccessResponse(response)) {
                props.setArticles(response.data.data.articles, response.data.data.pagination.rowCount);
            }
        });
    }

    const addArticle = (title, content) => {
        const page = props.currentPage;
        const pageSize = props.pageSize;
        articleAPI.addArticle(title, content).then(response => {
            if (isSuccessResponse(response)) {
                getArticles(page, pageSize);
            }
        });
    }

    const onSubmit = (formData) => {
        addArticle(formData.title, formData.content);
    };

    return <ArticleReduxForm buttonText={props.buttonText} onSubmit={onSubmit}/>;
};

const mapDispatchToProps = {
    setArticles: setArticlesAC
};

const mapStateToProps = (state) => ({
    currentPage: state.articlesPage.currentPage,
    pageSize: state.articlesPage.pageSize
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleForm);