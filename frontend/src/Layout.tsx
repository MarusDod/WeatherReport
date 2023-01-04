import styles from './styles/layout.module.scss'
import logo from './assets/logoWeather.png'
import React, { useCallback, useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { CityInfoByNameQueryDocument, GeoCodeDto } from './gql/graphql'
import { apolloClient } from './lib/backendProvider'
import { debounce } from 'lodash'


const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [search,setSearch] = useState<string>("")
    const [searchParams,setSearchParams] = useSearchParams()
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
                name: city,
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

    const onSearchSubmit = useCallback((suggestion: GeoCodeDto) => {
        console.log('ENTER')

        searchParams.set("city",search)
        setSearch("")
    },[search])

    const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(ev => {
        ev.preventDefault()
        console.log(ev.target.value)

        setSearch(ev.target.value.trim())
    },[search])

    return (<>
        <div className={styles.nav}>
            <img
                src={logo}
                alt="logo weather"
                />
            <div>
                Weather Report
            </div>
            <div style={{position: "relative",marginRight: "auto"}}>
                <input 
                    placeholder='Search location...' 
                    className={styles.search} 
                    type="text"
                    onChange={debounce(onSearchChange,500)}
                    />

                <div className={styles.dropdown}>
                    {suggestions.map(sug => 
                        <div className={styles.dropitem} onClick={() => onSearchSubmit(sug)}>
                            {sug.name} - {sug.country}
                        </div>
                    )}
                </div>
            </div>

            <button>Sign Up</button>
            <button>Log in</button>
        </div>
        <div className={styles.rest}>
            {children}
        </div>
    </>)
}

export default Layout