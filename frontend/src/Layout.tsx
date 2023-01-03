import styles from './styles/layout.module.scss'
import logo from './assets/logoWeather.png'
import React from 'react'

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => (<>
    <div className={styles.nav}>
        <img
            src={logo}
            alt="logo weather"
            />
        <div>
            Weather Report
        </div>
        <input placeholder='Search location...' className={styles.search} />

        <button>Sign Up</button>
        <button>Log in</button>
    </div>
    <div className={styles.rest}>
        {children}
    </div>
</>)

export default Layout