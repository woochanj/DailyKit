import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer-wrapper">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-heading">DailyKit</h3>
                    <p className="footer-description">
                        Essential tools for developers and designers.
                        Simple, clean, and efficient utilities to boost your productivity.
                    </p>
                </div>

                <ul className="footer-links">
                    <li><Link href="/tools">All Tools</Link></li>
                    <li><Link href="/about">About Us</Link></li>
                    <li><Link href="/privacy">Privacy Policy</Link></li>
                    <li><Link href="/terms">Terms of Service</Link></li>
                </ul>

                <div className="footer-divider" />

                <div className="footer-copyright">
                    Copyright © {new Date().getFullYear()} DailyKit. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
