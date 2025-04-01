import React from 'react'
import { Link } from 'react-router-dom'
import PrivacyPolicy from './PrivacyPolicy'
const Footer = () => {
  return (
    <div>
      {/* Footer for the current page */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f1f1f1",
        }}
      >
        <p>© 2025 Kumar Satyam. All rights reserved.</p>
        <p>
          Powered by <a target='_blank' href="https://github.com/satyam23092003">Kumar Satyam</a>
        </p>
        <p>
          <Link to={"/privacyPolicy"} >Privacy Policy </Link> |
          <Link to={"/termsofService"}> Terms of Service</Link>
        </p>
      </div>
    </div>
  )
}

export default Footer
