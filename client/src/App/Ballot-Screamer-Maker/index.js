// BALLOT SCREAMER -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react';
import { connect } from "react-redux";

// IMPORT FROM FILES -- ACTION CREATOR / COMPONENTS / CSS
import { getCategories } from "../../redux/reducers/categories-reducer"
import FormDisplay from "./FormDisplay"
import Form from "./Form"
import BallotDisplay from "./BallotDisplay"
import "./BallotScreamerMaker.css"

class BallotScreamer extends Component {
    constructor(props) {
        super(props);
        this.lateralMove = this.lateralMove.bind(this);
    }

    componentDidMount() {
        let { award_id } = this.props.match.params
        this.props.getCategories(award_id)
    }

    componentWillReceiveProps(nextProps) {
        let { award_id } = this.props.match.params
        let nextId = nextProps.match.params.award_id
        if (award_id !== nextId) {
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
        let { categoryLoading, categories } = this.props
        let category = categories.filter(category => {
            let { order_number } = category
            if (category_num === order_number) return category
        })[0]
        return (
            categoryLoading ?
                <div>
                    LOADING...
                </div>
                :
                <div className="ballot-screamer">
                    <h1>{category.award_name}</h1>
                    <div className="ballot-screamer-form-wrapper">
                        <FormDisplay categoryId={category._id} categoryNum={category_num} lateralMove={this.lateralMove} />
                        <br />
                        <Form categoryId={category._id} awardId={award_id} lateralMove={this.lateralMove}/>
                    </div>
                    <div>
            
                    </div>
                    <BallotDisplay awardId={award_id} />
                </div>
        )
    }
}

// EXPORTS
const mapStateToProps = (state) => {
    return {
        categories: state.categories.data,
        categoryLoading: state.categories.loading
    }
}

export default connect(mapStateToProps, { getCategories })(BallotScreamer)
