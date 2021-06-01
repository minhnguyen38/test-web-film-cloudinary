import Link from 'next/link'
import pageStyles from '../styles/Page.module.css'

const Header = () => {
    return (
        <div className={pageStyles.header}>
            <div className={pageStyles.logoContainer}><Link href="/">LOGO</Link></div>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
            </ul>
        </div>
    )
}

export default Header
