const SET_PAGE = 'SET-PAGE';
const SET_ARTICLES = 'SET-ARTICLES';

const initialState = {
    articles: [],
    currentPage: 1,
    totalCount: 0,
    pageSize: 3
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            };
        case SET_ARTICLES:
            return {
                ...state,
                articles: action.articles,
                totalCount: action.totalCount
            };
        default:
            return state;
    }
}

export const setPageAC = (page) => ({type: SET_PAGE, page});
export const setArticlesAC = (articles, totalCount) => ({type: SET_ARTICLES, articles, totalCount});

export default articlesReducer;