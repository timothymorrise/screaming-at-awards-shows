// BALLOT SELECTOR 
// ==============================

// IMPORT FROM PACKAGES
import React from 'react'

// IMPORT FROM FILES
import FormDisplay from "./FormDisplay"
import Form from "./Form"

function BallotSelector(props) {
    return (
        <div>
        <h1>{props.category.award_name}</h1>
                    <div className="ballot-screamer-form-wrapper">
                        <FormDisplay categoryId={props.category._id} categoryNum={props.category_num} lateralMove={props.lateralMove} />
                        <br />
                        <Form categoryId={props.category._id} awardId={props.award_id} lateralMove={props.lateralMove} />
        </div>
        </div>
    )
}

export default BallotSelector
