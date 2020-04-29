import React from "react";
import SignUp from "./components/Authentification/SignUp";
import {Route} from "react-router-dom";
import SignIn from "./components/Authentification/SignIn";
import Header from "./components/Header/Header";
import Articles from "./components/Articles/ArticlesList";
import Article from "./components/Articles/ArticleContainer";

const App = (props) => {
  return (
      <div>
          <Header/>
          <Route path={'/articles'} render={() => <Articles/>}/>
          <Route path={'/article/:id'} render={() => <Article/>}/>
          <Route path={'/signin'} render={() => <SignIn/>} />
          <Route path={'/signup'} render={() => <SignUp/>} />
      </div>
  );
}

export default App;