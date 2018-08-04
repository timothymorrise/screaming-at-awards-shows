// APP -- COMPONENT 
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

// IMPORT FROM FILES -- COMPONENTS/CSS
import Landing from "./Landing";
import Login from "./Login"
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import Footer from "../shared/Footer";
import BallotScreamer from "./Ballot-Screamer-Maker";
import "./App.css";

// CONSTRUCTOR
export default class App extends Component {
    render() {
        const generateSidebar = () => {
            if (localStorage.token) {
                return <Sidebar/>
            }
            return null
        } 
        return (
            <div>
                <Header />
                <main>
                    {generateSidebar()}
                    <div>
                        <Switch >
                            <Route exact path="/" component={Landing}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/home" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/contact" component={Contact} />
                            {/* USER PAGE */}
                            <Route path="/awards/:award_id/:category_num" component={BallotScreamer} />
                        </Switch>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

// GRAVY
// user auth
// restructure data to include award ids on nominees
// allow for restrictive use of paths 
// shore up security on server end