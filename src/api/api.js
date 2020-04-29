import * as axios from 'axios';

const createInstance = (isAuth = true) => {
    if (isAuth) {
        let token = localStorage.getItem('userToken');
        return axios.create({
            baseURL: 'http://localhost:8080/',
            headers: {
                'authorization': token
            }
        })
    }
    return axios.create({
        baseURL: 'http://localhost:8080/'
    });
}

export const authAPI = {
    signUp: (username, password) => {
        return createInstance(false).post('register', {username, password});
    },
    signIn: (username, password) => {
        return createInstance(false).post('login', {username, password});
    },
    me: () => {
        return createInstance().get('/user');
    }
}

export const articleAPI = {
    addArticle: (title, content, image_url) => {
        return createInstance().post('articles', {title, content, image_url});
    },
    getArticle: (articleId) => {
        return createInstance(false).get(`articles/${articleId}`);
    },
    deleteArticle: (articleId) => {
        return createInstance().delete(`articles/${articleId}`);
    },
    updateArticle: (articleId, newArticle) => {
        return createInstance().put(`articles/${articleId}`, newArticle);
    },
    getArticles: (limit, offset) => {
        return createInstance(false).get(`articles?limit=${limit}&offset=${offset}`);
    }
}

const successStatus = 200;
export const isSuccessResponse = (response) => {
    return (response.status === successStatus);
}