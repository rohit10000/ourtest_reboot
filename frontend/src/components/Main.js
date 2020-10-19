import React, {Component} from "react";
import { connect } from 'react-redux';
import {Route, Switch, withRouter, Redirect} from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import {fetchSections, fetchTests, fetchTopics} from "../redux/ActionCreators";
import Home from "../pages/Home";
import Section from "../pages/Section";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import SidePanel from "./SidePanel";

//Main component is the center point of this app. So, it is the class component because it is involved in
//keeping track of the state and all the dispatch methods are declared here.

class Main extends Component{
    componentDidMount() {
        this.props.fetchTests();
        this.props.fetchSections();
        this.props.fetchTopics();
    }

    render() {
        const SectionWithId = ({match}) =>{
            return(
                <div>
                    <Header user={this.props.user} />
                    <Section test={this.props.tests.tests.filter((test) => test._id === match.params.testId)[0]}
                             testsLoading={this.props.tests.isLoading}
                             testsErrMess={this.props.tests.errMess}
                             sections={this.props.sections.sections.filter((section) => section.testId === match.params.testId, 10)}
                             sectionsLoading={this.props.sections.isLoading}
                             sectionsErrMess={this.props.sections.errMess}
                             topics={this.props.topics.topics}
                             topicsLoading={this.props.topics.isLoading}
                             topicsErrMess={this.props.topics.errMess}
                    />
                    <Footer/>
                </div>

            );
        };
        return(
            <div className={"Main"}>
                <Switch >
                    {/*route for home page. Here header component just takes user state as input as
                    to check whether any user is signed in or not. Also home component takes tests
                    information as input as because our home component is concerned in showing test cards
                    e.g. jee advance, gate, cat, etc.*/}
                    <Route path={"/home"}>
                        <Header user={this.props.user} />
                        <Home tests={this.props.tests}/>
                        <Footer/>
                    </Route>

                    {/*route for section page. It's job will be to basically show the section and all the
                    topics that are present in the section. Further we can also click to any topic and
                    can do quiz on that topic. Section component takes the test information with specific
                    testId, all section details in that test and all topics in every section ans input and
                     renders it.*/}
                    <Route path={'/section/:testId'} component={SectionWithId}/>

                    {/*route for quiz page. It only matches the topicId from the url and there on does its work.*/}
                    <Route path={'/quiz/:topicId'}>
                        <Header user={this.props.user} />
                        <Quiz/>
                    </Route>

                    <Route exact path={"/result"}>
                        <Header user={this.props.user} />
                        <Result result={this.props.result}
                                quiz={this.props.quiz}
                                topic={this.props.topics.topics.filter((topic) => this.props.quiz.questions[0] &&
                                    (topic._id === this.props.quiz.questions[0].topicId))[0]}
                                topicsLoading={this.props.topics.isLoading}
                                topicsErrMess={this.props.topics.errMess}/>
                        <Footer/>
                    </Route>
                    <Redirect to="/home" />
                </Switch>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
        tests: state.tests,
        sections: state.sections,
        topics: state.topics,
        quiz: state.quiz,
        result: state.result
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        fetchTests: ()=> dispatch(fetchTests()),
        fetchSections: () => dispatch(fetchSections()),
        fetchTopics: () => dispatch(fetchTopics())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));