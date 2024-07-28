'use client'
import style from './layoutAdmin.module.css'
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import upload from './image/upload.png'
import exit from './image/exit.png'
import Image from 'next/image';
import { dataContext } from '../../context/context';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../features/categorySlice';
import { addRestuarant } from '../../features/restuarantSlice';
import { addProductData } from '../../features/productSlice';
import { addOfferData } from '../../features/offerSlice';
export default function Product({ isSmallScreen, greyFont }) {
    const dispatch=useDispatch()

    const [newData, setNewdata] = useContext(dataContext)
    const exitFunction = useCallback(() => {
        setNewdata({
            display: false,
            data: ''
        })
        document.body.style.overflow = 'auto';
    })
    const [addImg, setAddImg] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setAddImg(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleClickOutside = (event) => {
        if (event.target.closest(`.${style.addContainer}`) === null) {
            setNewdata({
                display: false,
                data: ''
            });
            setAddImg(null);
            
            document.body.style.overflow = 'auto';
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const nameRef = useRef()
    const description = useRef()
    const price = useRef()
    const slugRef = useRef()
    const cuisine = useRef()
    const priceDelivery = useRef()
    const priceMin = useRef()
    const address = useRef()
    const title=useRef()
    const [category,setCategory]=useState([])
    const [resId,setResId]=useState('')

    const [restuarants,setRestuarants]=useState([])
    const restuarantData=useSelector(state=>state.restuarant.data)
    useEffect(()=>{
        restuarantData.then(result=>setRestuarants(result))
    },[restuarantData])


    const data = useSelector(state => state.category.data)
    useEffect(()=>{
        data.then(result=>setCategory(result))
    },[data])
    const [selectedValue, setSelectedValue] = useState('');
    useEffect(()=>{
        setSelectedValue(category[0]?.id)
    },[category])
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const handleChangeRes=(e)=>{
        setResId(e.target.value)
    }
    useEffect(()=>{
        if(newData.data=='Edit Category'){
            nameRef.current.value=newData.editData.name
            slugRef.current.value=newData.editData.slug
        }
        if(newData.editData){
        setAddImg(newData.editData.img_url)
    }
    },[newData.editData])
    useEffect(()=>{
        if(newData.data==='Edit Restuarant'){
            nameRef.current.value=newData.editData?.name
            setSelectedValue(newData.editData?.category_id)
            cuisine.current.value=newData.editData?.cuisine
            setAddImg(newData.editData?.img_url)
            address.current.value=newData.editData?.address
            priceMin.current.value=newData.editData?.delivery_min
            priceDelivery.current.value=newData.editData?.delivery_price
        }
    },[newData.editData])

    
    useEffect(()=>{
        if(newData.data==='Edit Product'){
            nameRef.current.value=newData.editData?.name
            description.current.value=newData.editData?.description
            setAddImg(newData.editData?.img_url)
            setResId(newData.editData?.rest_id)
            price.current.value=newData.editData?.price
        }
    },[newData.editData])
    
    useEffect(()=>{
        if(newData.data==='Edit Offer'){
            nameRef.current.value=newData.editData?.name
            description.current.value=newData.editData?.description
            setAddImg(newData.editData?.img_url)
        }
    })
    const addProduct = useCallback(async () => {
        try {
            if (newData.data == 'Add Category') {
                if (fileInputRef.current.value === null) {
                    alert('include image')
                    return
                }
                if (nameRef.current.value.trim() === '') {
                    alert('include name')
                    return
                }
                if (slugRef.current.value.trim() === '') {
                    alert('include slug')
                    return
                }   
                const addData=    {
                    name: nameRef.current.value,
                    slug: slugRef.current.value,
                    img_url: addImg
                }         
                await axios.post('/api/category',addData )
                dispatch(addCategory(addData))
                nameRef.current.value = ''
                slugRef.current.value = ''
                fileInputRef.current.value = ''
                setAddImg(null)
                setNewdata({
                    display:false,
                    data:''
                })
                return
            }
            if (newData.data == 'Create Product') {
                if (!fileInputRef.current.value) {
                    alert('include image')
                    return
                }
                if (!description.current.value) {
                    alert('fill the description input')
                    return
                }
                if (!nameRef.current.value) {
                    alert('fill the name input')
                    return
                } if (!price.current.value) {
                    alert('fill the price input')
                    return
                }
                console.log('before',resId)
                if(!resId){
                    setResId(restuarants[0]?.id)
                }
                console.log('after',resId)
                await axios.post('/api/products', {
                    name: nameRef.current.value,
                    description: description.current.value,
                    img_url: addImg,
                    rest_id: resId,
                    price: price.current.value
                })
                dispatch(addProductData())
                nameRef.current.value = ''
                description.current.value = ''
                fileInputRef.current.value = ''
                price.current.value = ''
                setAddImg(null)
                setNewdata({
                    display: false,
                    data: ''
                })
            }
            if (newData.data == 'Add Restuarant') {
                if (!fileInputRef.current.value) {
                    alert('include image')
                    return
                }
                if (!nameRef.current.value) {
                    alert('fill the name input')
                    return
                }
                if (!cuisine.current.value) {
                    alert('fill the cuisine input')
                    return
                }
                if (!priceDelivery.current.value) {
                    alert('fill the Delivery price input')
                    return
                }
                if (!priceMin.current.value) {
                    alert('fill the Delivery Min input')
                    return
                }
                if (!address.current.value) {
                    alert('fill the Adress input')
                    return
                }
                await axios.post('/api/restuarants', {
                    name: nameRef.current.value,
                    category_id:selectedValue,
                    cuisine: cuisine.current.value,
                    img_url: addImg,
                    address:address.current.value,
                    delivery_min:priceMin.current.value,
                    delivery_price:priceDelivery.current.value
                })
                dispatch(addRestuarant())
                nameRef.current.value = ''
                setSelectedValue('')
                cuisine.current.value = ''
                fileInputRef.current.value = ''
                address.current.value=''
                priceDelivery.current.value=''
                priceMin.current.value=''
                setAddImg(null)
                setNewdata({
                    display: false,
                    data: ''
                })


            }
            if(newData.data==='Add Offer'){
                if (!fileInputRef.current.value) {
                    alert('include image')
                    return
                }
                if (!nameRef.current.value) {
                    alert('fill the name input')
                    return
                }
                if (!description.current.value) {
                    alert('fill the cuisine input')
                    return
                }
                await axios.post('/api/offer', {
                    name: nameRef.current.value,
                    description: description.current.value,
                    img_url: addImg,
                })
                dispatch(addOfferData())
                nameRef.current.value = ''
                description.current.value = ''
                fileInputRef.current.value = ''
                setAddImg(null)
                setNewdata({
                    display: false,
                    data: ''
                })

            }
            if(newData.data=='Edit Category'){
                await axios.put(`/api/category/${newData.editData.id}`, {
                    name: nameRef.current.value,
                    slug: slugRef.current.value,
                    img_url: addImg
                })
                setNewdata({
                    display:false,
                    data:'',
                    editData:''
                })
                dispatch(addCategory())
            }
            if(newData.data=='Edit Product'){
                await axios.put(`/api/products/${newData.editData.id}`,{
                        name: nameRef.current.value,
                        description: description.current.value,
                        img_url: addImg,
                        rest_id: resId,
                        price: price.current.value
                    })
                    dispatch(addProductData())
                    setNewdata({
                        display:false,
                        data:'',
                        editData:''
                    })
            }
            if(newData.data=='Edit Restuarant'){
                await axios.put(`/api/restuarants/${newData.editData.id}`, {
                    name: nameRef.current.value,
                    category_id:selectedValue,
                    cuisine: cuisine.current.value,
                    img_url: addImg,
                    address:address.current.value,
                    delivery_min:priceMin.current.value,
                    delivery_price:priceDelivery.current.value
                })
                setNewdata({
                    display:false,
                    data:'',
                    editData:''
                })
                dispatch(addRestuarant())
            }
            if(newData.data=='Edit Offer'){
                if (!addImg) {
                    alert('include image')
                    return
                }
                if (!nameRef.current.value) {
                    alert('fill the name input')
                    return
                }
                if (!description.current.value) {
                    alert('fill the cuisine input')
                    return
                }
                await axios.put(`/api/offer/${newData.editData.id}`, {
                    name: nameRef.current.value,
                    description: description.current.value,
                    img_url: addImg,
                })
                dispatch(addOfferData())
                nameRef.current.value = ''
                description.current.value = ''
                fileInputRef.current.value = ''
                setAddImg(null)
                setNewdata({
                    display: false,
                    data: '',
                    editData:''
                })
            }

        } catch (err) {
            return (err)
        }
    })

    return (
        <>
            <div style={{ display: newData.display ? 'block' : 'none' }} className={`${style.addContainer} ${newData ? style['sağdan-sola'] : ''}`}>
                <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <h2>{newData.data}</h2>
                    <Image alt='exit' className={style.exit} onClick={exitFunction} style={{ display: isSmallScreen ? 'flex' : 'none' }} src={exit} />
                </div>
                {(newData?.data === 'Create Product' || newData?.data === 'Edit Product') && (
                    <div>
                        <div className={style.addImg} >
                            <div>
                                <h2>Upload your product image</h2>
                                <img className={style.additionalImg} style={{ display: addImg ? 'block' : 'none', marginTop: '10px' }} src={addImg} />
                            </div>
                            <div className={style.addDiv} onClick={handleImageClick}>
                                <input ref={fileInputRef}
                                    style={{ display: 'none' }} type='file' onChange={handleImageChange}></input>
                                <Image className={style.uploadImg} src={upload} alt='upload' />
                            </div>
                        </div>
                        <div className={style.addInfoDiv}>
                            <h2>
                                Add your Product description and necessary information
                            </h2>
                            <div className={style.addInp}>
                                <div>
                                    <label for='name'>Name</label>
                                    <input ref={nameRef} id='name' placeholder='name' type='text' />
                                </div>
                                <div>
                                    <label>Description</label>
                                    <textarea ref={description} placeholder='description' />
                                </div>
                                <div>
                                    <label for='price'>Price</label>
                                    <input ref={price} id='price' type='number' placeholder='00.00' />
                                </div>
                                <div>
                                    <label>Restuarants</label>
                                    <select value={newData.data==='Edit Product'?resId:null} onClick={handleChangeRes}>
                                        {restuarants.map(restuarant=>(
                                            <option key={restuarant.id} value={restuarant.id}>{restuarant.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className={style.addButtonDiv}>
                            <button className={style.cancelBtn} onClick={exitFunction}>Cancel</button>
                            <button className={style.addBtn} onClick={addProduct}>{newData.data}</button>
                        </div>
                    </div>
                )}
                {(newData?.data === 'Add Restuarant' || newData?.data === 'Edit Restuarant') && (
                    <div>
                        <div className={style.addImg} >
                            <div>
                                <h2>Upload image</h2>
                                <img className={style.additionalImg} style={{ display: addImg ? 'block' : 'none', marginTop: '10px' }} src={addImg || upload} />
                            </div>
                            <div className={style.addDiv} onClick={handleImageClick}>
                                <input ref={fileInputRef}
                                    style={{ display: 'none' }} type='file' onChange={handleImageChange}></input>
                                <Image className={style.uploadImg} src={upload} alt='upload' />
                            </div>
                        </div>
                        <div className={style.addInfoDiv}>
                            <h2>
                                Add your Restuarant information
                            </h2>
                            <div className={style.addInp}>
                                <div>
                                    <label for='name'>Name</label>
                                    <input ref={nameRef} id='name' placeholder='name' type='text' />
                                </div>
                                <div>
                                    <label>Cuisine</label>
                                    <textarea ref={cuisine} placeholder='cuisine' />
                                </div>
                                <div>
                                    <label for='price'>Delivery Price $</label>
                                    <input ref={priceDelivery} id='price' type='number' placeholder='00' />
                                </div>
                                <div>
                                    <label for='priceMin'>Delivery Min</label>
                                    <input ref={priceMin} id='priceMin' type='number' placeholder='00' />
                                </div>
                                <div>
                                    <label for='address'>Address</label>
                                    <input ref={address} id='address' type='text' placeholder='Address' />
                                </div>
                                <div>
                                    <label>Category</label>
                                    <select onChange={handleChange}>
                                        {category.map(item => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className={style.addButtonDiv}>
                            <button className={style.cancelBtn} onClick={exitFunction}>Cancel</button>
                            <button className={style.addBtn} onClick={addProduct}>{newData.data}</button>
                        </div>
                    </div>
                )}
                {(newData?.data === 'Add Category' || newData?.data === 'Edit Category') && (
                    <div>
                        <div className={style.addImg} >
                            <div>
                                <h2>Upload image</h2>
                                <img className={style.additionalImg} style={{ display: addImg ? 'block' : 'none', marginTop: '10px' }} src={addImg || upload} />
                            </div>
                            <div className={style.addDiv} onClick={handleImageClick}>
                                <input ref={fileInputRef}
                                    style={{ display: 'none' }} type='file' onChange={handleImageChange}></input>
                                <Image className={style.uploadImg} src={upload} alt='upload' />
                            </div>
                        </div>
                        <div className={style.addInfoDiv}>
                            <h2>
                                Add your Category information
                            </h2>
                            <div className={style.addInp}>
                                <div>
                                    <label for='name'>Name</label>
                                    <input ref={nameRef} id='name' placeholder='name' type='text'/>
                                </div>
                                <div>
                                    <label for='slug'>Slug</label>
                                    <input ref={slugRef} id='slug' placeholder='slug' type='text'/>
                                </div>
                            </div>

                        </div>
                        <div className={style.addButtonDiv} style={{ bottom: '20px', right: '0', left: '0', position: 'absolute' }}>
                            <button className={style.cancelBtn} onClick={exitFunction}>Cancel</button>
                            <button className={style.addBtn} onClick={addProduct}>{newData.data}</button>
                        </div>
                    </div>
                )}
                {(newData?.data === 'Add Offer' || newData?.data === 'Edit Offer') && (
                    <div>
                        <div className={style.addImg} >
                            <div>
                                <h2>Upload image</h2>
                                <img className={style.additionalImg} style={{ display: addImg ? 'block' : 'none', marginTop: '10px' }} src={addImg || upload} />
                            </div>
                            <div className={style.addDiv} onClick={handleImageClick}>
                                <input ref={fileInputRef}
                                    style={{ display: 'none' }} type='file' onChange={handleImageChange}></input>
                                <Image className={style.uploadImg} src={upload} alt='upload' />
                            </div>
                        </div>
                        <div className={style.addInfoDiv}>
                            <h2>
                                Add your Category information
                            </h2>
                            <div className={style.addInp}>
                                <div>
                                    <label for='name'>Title</label>
                                    <input ref={nameRef} id='name' placeholder='title' type='text' />
                                </div>
                                <div>
                                    <label for='slug'>Description</label>
                                    <input id='slug' ref={description} placeholder='description' type='text' />
                                </div>
                            </div>
                        </div>
                        <div className={style.addButtonDiv} style={{ bottom: '20px', right: '0', left: '0', position: 'absolute' }}>
                            <button className={style.cancelBtn} onClick={exitFunction}>Cancel</button>
                            <button className={style.addBtn} onClick={addProduct}>{newData.data}</button>
                        </div>
                    </div>
                )}

            </div>

            <div className={style.blackFont} style={{ display: newData.display ? 'block' : 'none' }}></div>
            <div style={{ display: greyFont ? 'block' : 'none' }} className={style.backGrey}></div>
        </>
    )
}