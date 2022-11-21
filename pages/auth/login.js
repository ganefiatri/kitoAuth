import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Layout from "../../layout/layout"
import styles from "../../styles/Form.module.css"
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi"
import { useState } from "react"
import {useSession, signIn, signOut} from "next-auth/react"
import { useFormik } from 'formik'
import login_validate from "../../lib/validate"
import {useRouter} from "next/router"

function Login() {
    const [show, setShow] = useState(false)
    const router = useRouter()
    // formik hook
    const formik = useFormik({
        initialValues: {
            email:'',
            password:''
        },
        validate:login_validate,
        onSubmit
    })

    async function onSubmit(values){
        const status = await signIn('credentials',{
            redirect:false,
            email:values.email,
            password:values.password,
            callbackUrl:"/" 
        })

        if(status.ok) router.push(status.url)
    }

    // Google Handler function
    async function handleGoogleSignin(){
        signIn('google', {callbackUrl: "http://localhost:3000"})
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <section className="w-3/4 mx-auto flex flex-col gap-10">
                <div className="title">
                    <h1 className="text-gray-800 text-4xl font-bold py-4">KITO LOGIN</h1>
                    <p className="w-3/4 mx-auto text-gray-400">Sign In to this page to see stock Product</p>
                </div>
                {/* form */}
                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
                    <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                        <input type="email" name="email" placeholder="Email" className={styles.input_text} {...formik.getFieldProps('email')}/>
                        <span className="icon flex items-center px-4">
                            <HiAtSymbol size={25}/>
                        </span>
                    </div>

                        {/* {formik.errors.email && formik.touched.email ? <span className="text-rose-500">{formik.errors.email}</span> : <></>} */}

                    <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                        <input type={`${show ? "text" : "password"}`} name="password" placeholder="Password" className={styles.input_text} {...formik.getFieldProps('password')}/>
                        <span className="icon flex items-center px-4" onClick={() => setShow(!show)}>
                            <HiFingerPrint size={25} className="cursor-pointer"/>
                        </span>
                    </div>
                        {/* {formik.errors.password && formik.touched.password ? <span className="text-rose-500">{formik.errors.password}</span> : <></>} */}

                    {/* login botton */}
                    <div className="input-button">
                        <button type="submit" className={styles.button}>Login</button>
                    </div>
                    <div className="input-button">
                        <button type="button" onClick={handleGoogleSignin} className={styles.button_custom}>Sign In With Google
                        <Image src={'/assets/google.svg'} width="20" height={20} alt="logo-google"/>
                        </button>
                    </div>

                    {/* handle to sign up */}
                    <p className="text-center text-gray-400">
                        don't have an account yet? <Link href={'/auth/register'}><span className="text-blue-700">Sign Up</span></Link>
                    </p>
                </form>
            </section>
        </Layout>
    )
}

export default Login