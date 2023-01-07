import styles from './styles/layout.module.scss'
import Logo from './assets/logoWeather.png'
import CloudImage from './assets/backgroundClouds.webp'
import Avatar from './assets/avatar.png'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { CityInfoByNameQueryDocument, GeoCodeDto, LoginMutation, LogoutMutation, ProfileQueryQuery, User } from './gql/graphql'
import { apolloClient } from './lib/backendProvider'
import { debounce } from 'lodash'
import { Region } from './lib/types'
import Signup from './components/Signup'
import Login from './components/Login'
import { ToastContainer, toast } from 'react-toastify'
import { logoutMutation, profileQuery } from './lib/queries'
import store, { ReduxUser, RootReducer, clearUser, setUser } from './lib/store'
import { useDispatch, useSelector } from 'react-redux'
import OutsideClickHandler from 'react-outside-click-handler'


const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [searchParams,setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showSignup,setShowSignup] = useState<boolean>(false)
    const [showLogin,setShowLogin] = useState<boolean>(false)

    const loggedInUser = useSelector<RootReducer,ReduxUser>(state => state.user)
    const isLoggedIn = useMemo(() => !!loggedInUser.email && !!loggedInUser.username, [loggedInUser])

    const [search,setSearch] = useState<string>("")
    const [suggestions,setSuggestions] = useState<GeoCodeDto[]>([])


    useEffect(() => {
        if(search === ''){
            setSuggestions([])
            return
        }

        const [city] = search.split(' ')

        apolloClient.query({
            query: CityInfoByNameQueryDocument,
            variables: {
                city: city,
            }
        })
        .then(({error,data}) => {
            if(error){
                console.error({error})
            }

            setSuggestions(data.geoCode.map(d => ({
                country: d.country,
                lat: d.lat,
                lon: d.lon,
                name: d.name
            })))
        })
    }, [search])

    const logout = () => {

        apolloClient.mutate<LogoutMutation>({
            mutation: logoutMutation,
        })
        .then(result => {

            if(result.data!.logout.success){
                toast("Logged Out",{
                    type: 'default'
                })
            }
            else {
                toast("Error logging out",{
                    type: 'error'
                })
            }

            dispatch(clearUser())
        })
    }

    const onSearchSubmit = useCallback((suggestion: GeoCodeDto) => {
        searchParams.set("latitude",suggestion.lat.toString())
        searchParams.set("longitude",suggestion.lon.toString())

        setSearchParams(searchParams)

        setSearch("")
    },[search])

    const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(ev => {
        ev.preventDefault()

        setSearch(ev.target.value.trim())
    },[search])

    const keyDownHandler = useCallback((e: KeyboardEvent) => {
            if(e.key === 'Escape'){
                setSuggestions([])
            }
    },[suggestions])

    useEffect(() => {
        window.addEventListener('keydown',keyDownHandler)

        apolloClient.query<ProfileQueryQuery>({
            query: profileQuery
        })
        .then(result => {
            dispatch(setUser({
                email: result.data.profile.email,
                username: result.data.profile.username
            }))
        })

        return () => window.removeEventListener('keydown',keyDownHandler)
    },[])



    return (<>
        {showSignup && <Signup hide={() => setShowSignup(false)} />}
        {showLogin && <Login hide={() => setShowLogin(false)} />}
        <div className={styles.nav}>
            <img
                src={Logo}
                alt="logo weather"
                onClick={() => navigate('/')}
                style={{cursor:'pointer'}}
                />
            <div>
                Weather Report
            </div>
            <div style={{position: "relative",margin: "auto"}}>
                <input 
                    placeholder='Search location...' 
                    className={styles.search} 
                    type="text"
                    onChange={debounce(onSearchChange,500)}
                    disabled={!isLoggedIn}
                    style={{cursor: isLoggedIn ? 'text' : 'not-allowed'}}
                    />

                <OutsideClickHandler onOutsideClick={() => setSuggestions([])} >
                    <div className={styles.dropdown}>
                        {suggestions.map(sug => 
                            <div className={styles.dropitem} onClick={() => onSearchSubmit(sug)}>
                                {sug.name} - {sug.country}
                            </div>
                        )}
                    </div>
                </OutsideClickHandler>
            </div>

            {!isLoggedIn && <button onClick={() => setShowSignup(true)}>Sign Up</button>}
            {!isLoggedIn && <button onClick={() => setShowLogin(true)}>Log in</button>}
            {isLoggedIn && <img src={Avatar} alt="(You)" title={loggedInUser.username!!} style={{objectFit: 'contain',maxHeight:"90%",maxWidth:"90%"}} />}
            {isLoggedIn && <button onClick={logout}>Log Out</button>}
        </div>
        <div className={styles.rest} style={{
            backgroundImage: `url(${CloudImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }}>
            {children}
        </div>
    </>)
}

export default Layout