import styles from '../styles/login.module.scss'
import { useCallback, useState } from "react"
import FormModal from "./FormModal"
import { apolloClient } from "../lib/backendProvider"
import { loginMutation } from "../lib/queries"
import { toast } from "react-toastify"
import { GraphQLError } from "graphql"
import { handleGraphqlErrors } from "../lib/helper"
import { useDispatch } from "react-redux"
import { setUser } from '../lib/store'
import { LoginMutation } from "../gql/graphql"

const Login: React.FC<{hide: () => any}> = ({hide}) => {
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")

    const dispatch = useDispatch()

    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
        ev => {
            ev.preventDefault()

            apolloClient.mutate<LoginMutation>({
                mutation: loginMutation,
                variables: {
                    email,
                    password,
                }
            })
            .then(result => {
                dispatch(setUser({
                    email: result.data!.login.email,
                    username: result.data!.login.username
                }))

                setEmail("")
                setPassword("")

                toast('Logged in successfully',{
                    type:  "success",
                    position: 'top-center'
                })

                hide()
            })
            .catch((errors) => {
                handleGraphqlErrors(errors)

            })

        },
        [email,password])

    return <FormModal hide={hide}>
            <div className={styles.form}>
                Login Form
            </div>

            <div className={styles.label}>
                E-mail
            </div>

            <input type="text" value={email} onChange={ev => setEmail(ev.target.value)} className={styles.input} />

            <div className={styles.label}>
                Password
            </div>

            <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} className={styles.input} />

            <button onClick={onSubmit} className={styles.submit} >
                Log In
            </button>
    </FormModal>
}

export default Login