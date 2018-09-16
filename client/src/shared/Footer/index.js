// FOOTER -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React from 'react'

// IMPORT FROM FILES
import "./Footer.css"

function Footer() {
    return (
        <footer>
            <div className="footer-links-wrapper">
               <a className="footer-link" href="mailto:timothy.morrise@gmail.com">
                   EMAIL
               </a>
                <a className="footer-link" href="https://www.linkedin.com/in/timothy-morrise-1086574b" target="_blank">
                    LINKEDIN
                    </a>
                <a className="footer-link" href="https://github.com/timothymorrise" target="_blank">
                    GITHUB
                    </a>
                <a className="footer-link" href="https://www.themoviedb.org/?language=en" target="_blank">
                    Images from TMDB
                    </a>
            </div>
        </footer>
    )
}

export default Footer
