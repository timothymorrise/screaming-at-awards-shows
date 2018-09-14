// BALLOT -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react';
import { connect } from "react-redux";

// IMPORT FROM FILES -- ACTION CREATOR / COMPONENTS / CSS
import { getCategories } from "../../redux/reducers/categories-reducer"
import BallotSelector from "./BallotSelector"
import BallotDisplay from "./BallotDisplay"
import { getNominees } from "../../redux/reducers/nominees-reducer"
import { getBallots } from "../../redux/reducers/ballots-reducer"

import "./BallotScreamerMaker.css"

class BallotWrapper extends Component {
    constructor(props) {
        super(props);
        this.lateralMove = this.lateralMove.bind(this);
    }

    componentDidMount() {
        let { award_id } = this.props.match.params
        this.props.getCategories(award_id)
        this.props.getNominees();
        this.props.getBallots(award_id);
    }

    componentWillReceiveProps(nextProps) {
        let { award_id } = this.props.match.params
        let nextId = nextProps.match.params.award_id
        if (award_id !== nextId) {
            this.props.getBallots(nextId)
            this.props.getCategories(nextId);
        }
    }

    lateralMove(e) {
        let { award_id, category_num } = this.props.match.params
        if (e.target.name === "backward") {
            this.props.history.push(`/awards/${award_id}/${(Number(category_num) - 1)}`);
        } else if (e.target.name === "forward") {
            this.props.history.push(`/awards/${award_id}/${(Number(category_num) + 1)}`)
        }
    }

    render() {
        let { award_id, category_num } = this.props.match.params
        let { categoryLoading,
            categories,
            nomineeLoading } = this.props
        let category = categories.filter(category => {
            if (category_num === category.order_number) return category
        })[0]
        return (
            categoryLoading || nomineeLoading ?
                <div>
                    LOADING...
                </div>
                :
                <div className="ballot-screamer">
                    <BallotSelector
                        category={category}
                        category_num={category_num}
                        lateralMove={this.lateralMove}
                        award_id={award_id}
                        />
                    <BallotDisplay awardId={award_id} />
                </div>
        )
    }
}

// EXPORTS
const mapStateToProps = (state) => {
    return {
        categories: state.categories.data,
        categoryLoading: state.categories.loading,
        nomineeLoading: state.nominees.nomineeLoading
    }
}

export default connect(mapStateToProps, { getCategories, getNominees, getBallots })(BallotWrapper)
