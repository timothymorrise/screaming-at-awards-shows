// FORM -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react'
import { connect } from "react-redux";

// IMPORT FROM FILES -- CSS // REDUCER
import "./Form.css"
import { getSomeNominees } from "../../../../redux/reducers/nominees-reducer"
import { getBallot, postBallot, updateBallot } from "../../../../redux/reducers/ballots-reducer"

// CONSTRUCTOR
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predicted: "",
            favorite: "",
            screamingAt: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
        let { categoryId } = this.props
        this.props.getSomeNominees(categoryId)
        this.props.getBallot(categoryId)
        this.setState(
            {

            }
        )
    }

    componentWillReceiveProps(nextProps) {
        let { categoryId } = this.props
        let nextId = nextProps.categoryId
        if (categoryId !== nextId) {
            this.props.getSomeNominees(nextId);
            this.props.getBallot(nextId)
        }
        let nextBallot = nextProps.ballot
        if (nextProps.ballot !== null) {
            this.setState(
                {
                    predicted: nextBallot.predicted,
                    favorite: nextBallot.favorite,
                    screamingAt: nextBallot.screamingAt
                }
            )
        } else if (nextProps.ballot == null) {
            this.setState(
                {
                    predicted: "",
                    favorite: "",
                    screamingAt: ""
                }
            )
        }


    }

    handleChange(e) {
        let { value, name } = e.target
        this.setState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    handleSubmit(e) {
        if (this.state.predicted && this.state.favorite && this.state.screamingAt) {
            e.preventDefault();
            let ballot = {
                awards_id: this.props.awardId,
                category_id: this.props.categoryId,
                predicted: this.state.predicted,
                favorite: this.state.favorite,
                screamingAt: this.state.screamingAt
            }
            if (this.props.ballot !== null) {
                let { _id } = this.props.ballot
                this.props.updateBallot(ballot, _id)
            } else {
                this.props.postBallot(ballot)
            }
        } else {
            e.preventDefault()
            alert("Please fill out ballot completely before clicking VOTE")
        }
    }

    render() {
        let { nominees, loading } = this.props
        const titles = nominees.sort((a, b) => a.film_name.localeCompare(b.film_name)
        )
            .map((nominee, index) => {
                let { film_name, recipient } = nominee
                return <div key={index} className="form-title">
                    <h4>{film_name}</h4>
                    <h6>{recipient}</h6>
                </div>
            })
        const generateInputs = (questionValue) => nominees.map((nominee, index) => {
            let { _id, film_name, recipient } = nominee
            return <div key={index} className="form-radio">
                <input onChange={this.handleChange}
                    type="radio"
                    name={questionValue}
                    value={_id}
                    checked={this.state[questionValue] === _id} />
            </div>
        })
        return (
            loading ?
                <div></div>
                :
                <div className="form-wrapper">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-title-wrapper">
                            {titles}
                        </div>
                        <div>
                            <h2 className="form-question-title">Predicted Winner: </h2>
                            {generateInputs("predicted")}
                        </div>
                        <div>
                            <h2 className="form-question-title">Favorite to Win: </h2>
                            {generateInputs("favorite")}
                        </div>
                        <div>
                            <h2 className="form-question-title">Yelling At: </h2>
                            {generateInputs("screamingAt")}
                        </div>
                        <button>VOTE</button>
                    </form>
                </div>
        )
    }
}

// EXPORTS
const mapStateToProps = (state) => {
    return {
        nominees: state.nominees.ballotData,
        ballot: state.ballots.currentBallot,
        loading: state.ballots.loadingSingle,
        user: state.user
    }
}

export default connect(mapStateToProps, {
    getSomeNominees,
    getBallot,
    postBallot,
    updateBallot
})(Form)