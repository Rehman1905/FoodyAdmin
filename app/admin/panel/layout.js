'use client'
import { usePathname, useRouter } from 'next/navigation';
import style from './layoutAdmin.module.css'
import Image from 'next/image'
import userImg from './image/user.png'
import Link from 'next/link'
import dashboard from './image/dashboard.png'
import category from './image/category.png'
import logout from './image/logout.png'
import offer from './image/offer.png'
import orders from './image/orders.png'
import restuarants from './image/restuarants.png'
import products from './image/products.png'
import hamburger from './image/hamburger.png'
import backImg from './image/back.png'
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Product from './addProduct';
import { dataContext } from '../../context/context';

export default function AdminLayput({ children }) {
    const color = usePathname()
    const [display, setDisplay] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const [greyFont, setGreyFont] = useState(false)
    const [newData, setNewdata] = useContext(dataContext)
    const [product, setProduct] = useState(false)
    const router = useRouter()
    useEffect(() => {  
        if(window){
            setDisplay(window.innerWidth >= 600)
            setIsSmallScreen(window.innerWidth <= 600)
        }  
        const token = localStorage.getItem('access_token')
        if (!token) {
            router.push('/')
        }
    }, [])
    useEffect(() => {
        if(window){
        const handleResize = () => {
            const isSmall = window.innerWidth <= 600;
            setIsSmallScreen(isSmall);
            setDisplay(!isSmall);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }
    }, [])

    const addButtonText = isSmallScreen ? '+' : '+ Add product';
    const hamburgerImg = useCallback(() => {

        if (display == false) {
            setGreyFont(true)
            setDisplay(true)
        } else {
            setGreyFont(false)
            setDisplay(false)
        }
    }, [display])
    const back = useCallback(() => {
        if (isSmallScreen) {
            setDisplay(false)
        }
    }, [isSmallScreen])
    useEffect(() => {
        if (display && isSmallScreen) {
            document.body.style.overflow = 'hidden';
            setGreyFont(true)
        } else {
            document.body.style.overflow = 'auto';
            setGreyFont(false)
        }
    }, [display, isSmallScreen])
    const addProduct = useCallback(() => {
        setNewdata({ display: true, data: 'Create Product' })
        setProduct(true)
        document.body.style.overflow = 'hidden';
    },)
    const menuRef = useRef()
    useEffect(() => {
        if (isSmallScreen) {
            const handleClick = (event) => {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setGreyFont(false)
        setDisplay(false)
                }
            };
            document.addEventListener('mousedown', handleClick);

            return () => {
                document.removeEventListener('mousedown', handleClick);
            };
        } else {
            return
        }
    }, []);
    const grayFunc = () => {
        setGreyFont(false)
        setDisplay(false)
        // document.body.style.overflow = 'hidden';
    }
    return (
        <>
            <header className={style.header} >
                <div className={style.container}>
                    <div className={style.head}>
                        <Image className={style.hamburger} onClick={hamburgerImg} src={hamburger} alt="Hamburger" />
                        <h1 className={style.h}>Foody<span>.</span></h1>
                    </div>
                    <div className={style.add}>
                        <div>
                            <button onClick={addProduct}>{addButtonText}</button>
                        </div>
                        <div>
                            <Image className={style.img} src={userImg} alt='user' />
                            <p>Admin</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className={style.navDiv}>
                <nav style={{ display:display?'block':'none' }} className={`${greyFont ? style.smallNav : style.navigation} ${style.grayNav}`}>
                    <div className={style.navContainer} ref={menuRef}>
                        <Image onClick={back} className={style.back} alt='back' src={backImg} />
                        <div style={{ backgroundColor: color == '/admin/panel' ? '#d172ee' : '#C74FEB' }}>
                            <Image alt='dashboard' src={dashboard} />
                            <Link onClick={back} className={style.linkNav} href='/admin/panel'>Dashboard</Link>
                        </div>
                        <div style={{ backgroundColor: color == '/admin/panel/products' ? '#d172ee' : '#C74FEB' }}>
                            <Image alt='products' src={products} />
                            <Link onClick={back} className={style.linkNav} href='/admin/panel/products'>Products</Link>
                        </div>
                        <div style={{ backgroundColor: color == '/admin/panel/restuarants' ? '#d172ee' : '#C74FEB' }}>
                            <Image alt='restaurants' src={restuarants} />
                            <Link onClick={back} className={style.linkNav} href='/admin/panel/restuarants'>Restuarants</Link>
                        </div>
                        <div style={{ backgroundColor: color == '/admin/panel/category' ? '#d172ee' : '#C74FEB' }}>
                            <Image alt='category' src={category} />
                            <Link onClick={back} className={style.linkNav} href={'/admin/panel/category'}>Category</Link>
                        </div>
                        <div style={{ backgroundColor: color == '/admin/panel/orders' ? '#d172ee' : '#C74FEB' }}>
                            <Image alt='orders' src={orders} />
                            <Link onClick={back} className={style.linkNav} href={'/admin/panel/orders'}>Orders</Link>
                        </div>
                        <div style={{ backgroundColor: color == '/admin/panel/order-history' ? '#d172ee' : '#C74FEB' }}>
                            <Image alt='orders' src={offer} />
                            <Link onClick={back} className={style.linkNav} href={'/admin/panel/order-history'}>History</Link>
                        </div>
                        <div style={{ backgroundColor: color == '/admin/panel/offers' ? '#d172ee' : '#C74FEB' }}>
                            <Image alt='offer' src={offer} />
                            <Link onClick={back} className={style.linkNav} href={'/admin/panel/offers'}>Offer</Link>
                        </div>
                        <div style={{ backgroundColor: color == '/admin/panel/logout' ? '#d172ee' : '#C74FEB' }}>
                            <Image alt='logout' src={logout} />
                            <Link onClick={back} className={style.linkNav} href={'/'}>Logout</Link>
                        </div>
                    </div>
                </nav>
                    <Product type={'add product'} isSmallScreen={isSmallScreen}  />
                <div>
                    {children}
                </div>
            </div>
            <div onClick={grayFunc} style={{ display: greyFont ? 'block' : 'none' }} className={style.gray}></div>
        </>
    )
}