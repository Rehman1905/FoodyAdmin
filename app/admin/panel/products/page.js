'use client'
import '../../admin.css'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import style from './products.module.css';
// import img from '../image/pizza.png';
import deleteImg from './image/delete.png';
import editImg from './image/edit.png';
import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from '../addProduct';
import { dataContext } from '../../../context/context';
// import pizza from '../image/pizza.png'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteProduct } from '../../../features/productSlice';

export default function Products() {
    const [products, setProducts] = useState([])
    const dataProduct = useSelector(state => state.product?.data)
    useEffect(() => {
        dataProduct?.then(result => setProducts(result))
    }, [dataProduct])
    const [res, setRes] = useState([])
    const dataRes = useSelector(state => state.restuarant?.data)
    useEffect(() => {
        dataRes?.then(result => setRes(result))
    }, [dataRes])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        customPaging: function (i) {
            return (
                <div className={style.dotsContainer}>
                    <div className={style.slider}>
                        {i + 1}
                    </div>
                </div>
            );
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const [delet, setDelet] = useState(false)
    const [newData, setNewdata] = useContext(dataContext)
    const [edit, setEdit] = useState(false)
    const [resDeletId, setResDeletID] = useState('')
    const [option, setOption] = useState('all')
    const handleChangeProduct = (e) => {
        setOption(e.target.value)
    }
    const editBtn = useCallback((id) => {
        console.log(products)
        const productToEdit = products.find(product => product.id === id)
        setNewdata({
            display: true,
            data: 'Edit Product',
            editData: productToEdit
        })
    }, [products, newData])
    const deleteBtn = useCallback((id) => {
        setDelet(true)
        setResDeletID(id)
        document.body.style.overflow = 'hidden'
    }, [])
    const [isSmallScreen, setIsSmallScreen] = useState(false)

    useEffect(()=>{
        if(window){
            setIsSmallScreen(window.innerWidth <= 600)
        }
    })
    const cancelBtn = useCallback(() => {
        setDelet(false)
        document.body.style.overflow = 'auto'
    }, [])
    const dispatch = useDispatch()
    const deletProduct = useCallback(async () => {
        await axios.delete(`/api/products/${resDeletId}`)
        dispatch(deleteProduct(resDeletId))
        cancelBtn()
    }, [resDeletId, cancelBtn])
    const filterProduct = option === 'all'
        ? products
        : products.filter(product => product.rest_id === option)
    return (
        <>
            <div className={style.container}>
                <div className={style.productHead}>
                    <h2>Products</h2>
                    <select onChange={handleChangeProduct}>
                        <option value={'all'}>All restuarant</option>
                        {res.map(restuarant => (
                            <option key={restuarant.id} value={restuarant.id}>{restuarant.name}</option>
                        ))}
                    </select>
                </div>
                <div className={style.productMain}>
                    <Slider style={{display:filterProduct.length<4?'none':'block'}} {...settings}>
                        {filterProduct.map(product => (
                            <div className={style.productDiv} key={(product.id)}>
                                <Image alt='product' className={style.productImg} src={product.img_url} width={130} height={130} />
                                <h3>{product.name}</h3>
                                <p className={style.restaurant}>{product.restaurant}</p>
                                <div className={style.updateDiv}>
                                    <p className={style.price}>{product.price}$</p>
                                    <div >
                                        <Image alt='edit' className={style.updateImg} onClick={() => editBtn(product.id)} src={editImg} />
                                        <Image alt='deleteImg' className={style.updateImg} onClick={() => deleteBtn(product.id)} src={deleteImg} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div style={{display:filterProduct.length<4?'flex':'none'}} className={`${style.productMain} ${style.productMainSame}`}>
                        {filterProduct.map(product => (
                            <div className={style.productDiv} key={(product.id)}>
                                <Image alt='product' className={style.productImg} src={product.img_url} width={130} height={130} />
                                <h3>{product.name}</h3>
                                <p className={style.restaurant}>{product.restaurant}</p>
                                <div className={style.updateDiv}>
                                    <p className={style.price}>{product.price}$</p>
                                    <div >
                                        <Image alt='edit' className={style.updateImg} onClick={() => editBtn(product.id)} src={editImg} />
                                        <Image alt='deleteImg' className={style.updateImg} onClick={() => deleteBtn(product.id)} src={deleteImg} />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className={style.editProduct}  >
                <Product style={{ display: edit ? 'block' : 'none' }} isSmallScreen={isSmallScreen} type='edit product' />
            </div>
            <div>
                <div style={{ width: '100%', height: '100vh', display: delet ? 'flex' : 'none' }}>
                    <div className={style.delete}>
                        <h2>Are you sure it’s deleted ?</h2>
                        <p>Attention! If you delete this product, it will not come back...</p>
                        <div>
                            <button className={style.cancelDelete} onClick={cancelBtn}>Cancel</button>
                            <button className={style.deletBtn} onClick={deletProduct}>Delete</button>
                        </div>
                    </div>
                </div>
                <div style={{ display: delet ? 'flex' : 'none' }} className={style.backFont}></div>
            </div>
        </>
    )
}
