// BALLOT DISPLAY -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react'
import { connect } from "react-redux";

// IMPORT FROM FILES
import "./BallotDisplay.css";
import getBallots from "../../../redux/reducers/ballots-reducer";

class BallotDisplay extends Component {

    render() {
        let { awards, 
            awardId, 
            awardsLoading,
            categories, 
            categoryLoading,
            nominees, 
            nomineeSomeLoading,
            nomineeLoading,
            ballots,
            ballotsLoading } = this.props;
        let title = () => {
            let award = awards.filter(award => {
                return (award._id === awardId)
            })[0]
            return <div>
                <h1>{award.awards_show_name}</h1>
            </div>
        }
        let votes = () => {
            console.log(ballots)
            return ballots.sort((ballot1, ballot2) => {
                let order1 = categories.filter(category => {
                    return (category._id === ballot1.category_id)
                })[0].order_number
                let order2 = categories.filter(category => {
                    return (category._id === ballot2.category_id)
                })[0].order_number
                return (order1 - order2)
            })
            .map((ballot) => {
                let categoryTitle = categories.filter(category => {
                    return (category._id === ballot.category_id)
                })[0].award_name
                let predictedNominee = nominees.filter(nominee => {
                    return (nominee._id === ballot.predicted)
                })[0]
                let favoriteNominee = nominees.filter(nominee => {
                    return (nominee._id === ballot.favorite)
                })[0]
                let screamingAtNominee = nominees.filter(nominee => {
                    return (nominee._id === ballot.screamingAt)
                })[0]

               return <div className="ballot-display-category" key={ballot._id}>
                   <h2>{categoryTitle}</h2>
                   <p><span className="ballot-display-bold">Predicted winner:</span> {predictedNominee.recipient} for <span className="ballot-display-italics">{predictedNominee.film_name}</span></p>
                   <p><span className="ballot-display-bold">Favorite to win:</span> {favoriteNominee.recipient} for <span className="ballot-display-italics">{favoriteNominee.film_name}</span></p>
                   <p><span className="ballot-display-bold">Would like to Scream At:</span> {screamingAtNominee.recipient} for <span className="ballot-display-italics">{screamingAtNominee.film_name}</span></p>
               </div>
            })
        }
        return (
            ( ballotsLoading || nomineeLoading || categoryLoading || nomineeSomeLoading || awardsLoading ) ?
            <div>
                LOADING...
            </div>
            :
            
            <div className="ballot-display">
                {ballots.length ? title(): null}
                {ballots.length ? votes() : null}
            </div>
        )
    }
}


// EXPORTS
const mapStateToProps = (state) => {
    return {
        awards: state.awards.data,
        awardsLoading: state.awards.loading,
        categories: state.categories.data,
        categoryLoading: state.categories.loading,
        nominees: state.nominees.data,
        nomineeSomeLoading: state.nominees.someLoading,
        nomineeLoading: state.nominees.loading,
        ballots: state.ballots.data,
        ballotsLoading: state.ballots.loadingMany, 
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { getBallots })(BallotDisplay);