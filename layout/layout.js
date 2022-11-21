import Image from 'next/image'
import styles from '../styles/Layout.module.css'

function Layout({ children }) {
    return (
        <div className="flex xl:p-20  xl:h-screen bg-gray-200">
            <div className="m-auto xs:h-screen bg-slate-50 rounded-md w-full xl:w-3/4 grid lg:grid-cols-2">
                <div className={styles.imgStyle}>
                    <div className={styles.cartoonImg}>
                    </div>
                    <div className={styles.cloud_one}>
                    </div>
                    <div className={styles.cloud_two}>
                    </div>
                </div>
                <div className="right flex flex-col justify-evenly p-5">
                    <div className="text-center xs:py-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Layout