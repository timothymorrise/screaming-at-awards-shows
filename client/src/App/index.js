// APP -- COMPONENT 
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux"
import { verify } from "../redux/reducers/auth-reducer";

// IMPORT FROM FILES -- COMPONENTS/CSS
import Landing from "./Landing";
import Login from "./Login"
import Home from "./Home";
import About from "./About";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import Footer from "../shared/Footer";
import BallotWrapper from "./Ballot";
import ProtectedRoute from "../shared/ProtectedRoute"
import "./App.css";

// CONSTRUCTOR
class App extends Component {
    
    componentDidMount() {
        this.props.verify();
    }
    
    render() {
        const { isAuthenticated, loading } = this.props
        const generateSidebar = () => {
            if (isAuthenticated) {
                return <Sidebar/>
            }
            return null
        } 
        return (
            <div>
                <Header />
                {loading ? 
                <div>Loading data</div>
                :
                <main>
                    {generateSidebar()}
                    <div>
                        <Switch >
                        <Route exact path="/" render={ props => isAuthenticated ? 
                        <Redirect to="/home"/> :
                        <Landing {...props}/>
                    }/>
                    <Route path="/login" render={ props => isAuthenticated ?
                        <Redirect to="/home"/> :
                        <Login {...props}/>
                    } />
                            <Route path="/about" component={About} />
                            <ProtectedRoute path="/home" component={Home} />
                            <ProtectedRoute path="/awards/:award_id/:category_num" component={BallotWrapper} />
                        </Switch>
                    </div>
                </main>}
                <Footer />
            </div>
        )
    }
}
// EXPORTS
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.auth.loading
    }
}

export default withRouter(connect(mapStateToProps, {verify})(App))

// GRAVY
// restructure data to include award ids on nominees
// allow for restrictive use of paths 
// shore up security on server end