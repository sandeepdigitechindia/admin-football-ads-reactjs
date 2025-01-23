import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms-of-service" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p>Email: <a href="mailto:info@footballads.com" className="hover:underline">info@footballads.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a></p>
            <p>Address: 123 Football Lane, Soccer City, SC 12345</p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Football Ads. All rights reserved.</p>
            <p className="text-sm">Built with passion for football enthusiasts.</p>

{/* Social Media Links */}
<div className="flex justify-center mt-5 gap-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/social/facebook.png"
              alt="Facebook"
              className="w-8 h-8 hover:text-blue-600 transition-colors"
            />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/social/twitter.png"
              alt="Twitter"
              className="w-8 h-8 hover:text-blue-400 transition-colors"
            />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/social/instagram.png"
              alt="Instagram"
              className="w-8 h-8 hover:text-pink-600 transition-colors"
            />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/social/linkedin.png"
              alt="LinkedIn"
              className="w-8 h-8 hover:text-blue-700 transition-colors"
            />
          </a>
        </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
