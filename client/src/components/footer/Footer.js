import React from 'react'
import './footer.css'

const Footer = () => {
  return (
   <footer class="brand-footer">
    <div class="footer-container">
        <div class="brand-mission">
            <h2>About Us</h2>
            <p>At NexMall, we are committed to providing premium products that inspire and empower</p>
            </div>
        </div>

        <div class="social-media">
            <h2>Follow Us</h2>
            <a href="#" aria-label="Twitter"><img src= '/images/icons.png' alt="Twitter"/></a>
        </div>
        
        <div class="copyright">
            <p>&copy; 2025 NexMall. All rights reserved.</p>
        </div>
   </footer>
  )
}

export default Footer
