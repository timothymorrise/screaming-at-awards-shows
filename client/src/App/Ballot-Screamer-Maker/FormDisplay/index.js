// FORM DISPLAY -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react'
import { connect } from "react-redux";

// IMPORT FROM FILES -- COMPONENTS
import "./FormDisplay.css"
import DisplayCard from "./DisplayCard"
import { getSomeNominees } from "../../../redux/reducers/nominees-reducer"

class FormDisplay extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let { categoryId } = this.props
        this.props.getSomeNominees(categoryId)
    }

    componentWillReceiveProps(nextProps) {
        let { categoryId } = this.props
        let nextId = nextProps.categoryId
        if (categoryId !== nextId) {
            this.props.getSomeNominees(nextId);
        }
    }

    render() {
        let { categoryNum, categories, nominees, nomineeLoading } = this.props
        const generateDisplayCards = nominees.map((nominee, index) =>
            <DisplayCard {...nominee} key={index} />
        )
        const backwardButton = () => {
            if (Number(categoryNum) === 1) {
                return <div className="pseudo-button"></div>
            } else {
                return <button onClick={this.props.lateralMove} name="backward">	&larr;</button>
            }
        }
        const forwardButton = () => {
            if (Number(categoryNum) === (categories.length)) {
                return <div className="pseudo-button"> </div>
            } else {
                return <button onClick={this.props.lateralMove} name="forward">&rarr;</button>
            }
        }
        
        return (
            <div className="form-display">
                {backwardButton()}
                <div className="form-display-container">
                    {generateDisplayCards}
                </div>
                {forwardButton()}
            </div>
        )
    }
}

// EXPORTS
const mapStateToProps = (state) => {
    return {
        nominees: state.nominees.ballotData,
        nomineeLoading: state.nominees.loading,
        categories: state.categories.data
    }
}

export default connect(mapStateToProps, { getSomeNominees })(FormDisplay)