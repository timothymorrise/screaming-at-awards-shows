// FOOTER -- COMPONENT
// ==============================

// IMPORT FROM PACKAGES
import React from 'react'

// IMPORT FROM FILES
import "./Footer.css"

function Footer() {
    return (
        <footer>
                    <span>email at: timothy.morrise@gmail.com</span>
                    <a className="footer-link" href="https://twitter.com/cyberMormon" target="_blank">
                        TWITTER
                    </a>
                    <a className="footer-link" href="https://github.com/timothymorrise" target="_blank">
                        GITHUB
                    </a>
                    <a className="footer-link" href="https://www.themoviedb.org/?language=en" target="_blank">
                        Images from TMDB
                    </a>
        </footer>
    )
}

export default Footer
