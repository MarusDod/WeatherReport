import styles from '../styles/login.module.scss'
import { useCallback, useState } from "react"
import FormModal from "./FormModal"
import { apolloClient } from "../lib/backendProvider"
import { signupMutation } from "../lib/queries"
import { ToastContainer, toast } from "react-toastify"
import { GraphQLError } from "graphql"
import { useDispatch } from "react-redux"
import { setUser } from "../lib/store"
import { SignupMutation } from "../gql/graphql"

const Signup: React.FC<{hide: () => any}> = ({hide}) => {
    const [username,setUsername] = useState<string>("")
    const [mail,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [confirmation,setConfirmation] = useState<string>("")

    const dispatch = useDispatch()

    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
        ev => {
            ev.preventDefault()

            apolloClient.mutate<SignupMutation>({
                mutation: signupMutation,
                variables: {
                    username,
                    email: mail,
                    password,
                    confirmationPassword: confirmation,
                }
            })
            .then(result => {
                setUsername("")
                setEmail("")
                setPassword("")
                setConfirmation("")

                dispatch(setUser({
                    email: result.data!.signUp.email,
                    username: result.data!.signUp.username
                }))

                toast('Signed Up successfully',{
                    type:  "success",
                })

                hide()
            })
            .catch((errors) => {
                errors.networkError.result.errors.forEach((e: GraphQLError) => {
                    if(e.message){
                        toast(e.message)
                    }
                    (e.originalError as any).validationErrors?.forEach((v: Record<string,string>) => {
                        Object.values(v.constraints).forEach(c => {
                            toast(c,{
                                type:  "warning",
                            })
                        })
                    })
                })

            })

        },
        [username,mail,password,confirmation]
    )
    
    return (
        <FormModal hide={hide}>
            <div className={styles.form}>
                Register Account
            </div>

            <div>
                Username
            </div>

            <input autoFocus={true} type="text" className={styles.input} value={username} onChange={ev => setUsername(ev.target.value)} />

            <div>
                E-mail
            </div>

            <input type="text" className={styles.input} value={mail} onChange={ev => setEmail(ev.target.value)} />

            <div>
                Password
            </div>

            <input type="password" className={styles.input} value={password} onChange={ev => setPassword(ev.target.value)} />

            <div>
                Confirmation Password
            </div>

            <input type="password" className={styles.input} value={confirmation} onChange={ev => setConfirmation(ev.target.value)} />

            <button onClick={onSubmit} className={styles.submit} >
                Sign Up
            </button>
        </FormModal>
    )
}

export default Signup