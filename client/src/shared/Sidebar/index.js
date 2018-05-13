// SIDEBAR -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// IMPORT FROM FILES -- ACTION CREATORS
import { getAwards } from "../../redux/reducers/awards-reducer"
import "./Sidebar.css"

class Sidebar extends Component {
    
    componentDidMount() {
        this.props.getAwards()
    }

   
    
    render() {
        let { awards } = this.props
        let generateLinks = () => {
            return awards.map((award, index) => {
                let { awards_show_name, 
                    awards_show_year,
                    _id  } = award
                return <Link key={index} to={`/awards/${_id}/1`} >{awards_show_name} &mdash; {awards_show_year}</Link>
            })
        }

        return (
            
            <aside>
                {generateLinks()}
            </aside>
        )
    }
}

// EXPORTS
const mapStateToProps = (state) => {
    return {
        awards: state.awards.data
    }
}

export default connect(mapStateToProps, { getAwards } )(Sidebar)

// GRAVY:
    // beatuify the urls - 