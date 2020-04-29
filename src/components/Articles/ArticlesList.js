import React from "react";
import ArticleForm from "./ArticleForm";
import {setArticlesAC, setPageAC} from "../../redux/articlesReducer";
import {connect} from "react-redux";
import Paginator from "../common/Paginator/Paginator";
import {NavLink} from "react-router-dom";
import {articleAPI, isSuccessResponse} from "../../api/api";

const ArticlesList = (props) => {
    const articlesList = props.articles.map(a => {
        return (
                <div key={a.id}>
                    <NavLink to={`/article/${a.id}`}>{a.title}</NavLink>
                    <br/>
                    User: {a.user.username}
                    <br/>
                    {props.currentUser === a.user.username ? <button onClick={(e) => props.deleteArticle(a.id)}>Delete</button> : ''}
                    <hr/>
                </div>
        );
    });

    return (
        <div>
            {articlesList}
            {props.isAuth ? <ArticleForm buttonText={'Add article'}/>: ''}
        </div>
    );
}

class ArticlesListContainer extends React.Component {
    getArticles = (page, pageSize) => {
        const limit = pageSize;
        const offset = (page - 1) * pageSize;
        articleAPI.getArticles(limit, offset).then(response => {
            if (isSuccessResponse(response)) {
                this.props.setArticles(response.data.data.articles, response.data.data.pagination.rowCount);
            }
        });
    }

    deleteArticle = (articleId) => {
        let page = this.props.currentPage;
        const pageSize = this.props.pageSize;
        const totalCount = this.props.totalCount;
        articleAPI.deleteArticle(articleId).then(response => {
            const pageCount = Math.ceil((totalCount - 1) / pageSize);
            if (page > pageCount) {
                page -= 1;
            }
            this.props.setPage(page);
            this.getArticles(page, pageSize);
        })
    }

    componentDidMount() {
        this.getArticles(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (page) => {
        this.props.setPage(page);
        this.getArticles(page, this.props.pageSize);
    }

    render() {
        return (
            <div>
                <Paginator currentPage={this.props.currentPage} pageSize={this.props.pageSize}
                           totalItemsCount={this.props.totalCount} onPageChanged={this.onPageChanged}/>
                <ArticlesList articles={this.props.articles} currentUser={this.props.currentUser}
                          deleteArticle={this.deleteArticle} isAuth={this.props.isAuth}
                currentPage={this.props.currentPage} pageSize={this.props.pageSize} totalCount={this.props.totalCount}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    articles: state.articlesPage.articles,
    totalCount: state.articlesPage.totalCount,
    currentPage: state.articlesPage.currentPage,
    pageSize: state.articlesPage.pageSize,
    currentUser: state.app.username,
    isAuth: state.app.isAuth
})

const mapDispatchToProps = {
    setPage: setPageAC,
    setArticles: setArticlesAC
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesListContainer);