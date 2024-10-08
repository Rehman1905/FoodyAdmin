'use client'
import '../../admin.css'
import style from './offers.module.css'
import pizza from '../image/pizza.png'
import Image from 'next/image'
import editImg from './image/edit.png'
import deleteImg from './image/delete.png'
import styleDelet from '../products/products.module.css'
import { useCallback, useContext, useEffect, useState } from 'react'
import { dataContext } from '../../../context/context'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../addProduct'
import axios from 'axios'
import { deleteOfferData } from '../../../features/offerSlice'
import spinGif from '../image/spin.gif'

export default function Offers() {
    const [offers, setOffers] = useState([])
    const [spin, setSpin] = useState(true)
    const [deleteOfferId, setDeleteOfferId] = useState('')
    const dispatch = useDispatch()
    const dataOffer = useSelector(state => state.offer.data)
    useEffect(() => {
        const fetchOffer=async()=>{
            await dataOffer.then(result => setOffers(result))
            setSpin(false)
        }
        fetchOffer()

    }, [dataOffer])
    const [delet, setDelet] = useState(false)
    const deleteBtn = useCallback((id) => {
        setDeleteOfferId(id)
        setDelet(true)
        document.body.style.overflow = 'hidden'
    }, [])
    const cancelBtn = useCallback(() => {
        setDelet(false)
        document.body.style.overflow = 'auto'
    }, [])
    const [newData, setNewData] = useContext(dataContext);
    const editOffer = useCallback((id) => {
        const editToOffer = offers.find(offer => offer.id === id)
        setNewData({
            display: true,
            data: 'Edit Offer',
            editData: editToOffer
        })
    }, [newData])
    const addOffer = useCallback(() => {
        setNewData({
            display: true,
            data: 'Add Offer'
        })
    }, [newData])
    const deleteOffer = useCallback(async () => {
        await axios.delete(`/api/offer/${deleteOfferId}`)
        cancelBtn()
        dispatch(deleteOfferData())
    }, [deleteOfferId])
    return (
        <>
            <div className={style.container}  >
                <div className={style.offerHead}>
                    <h2>Offers</h2>
                    <button onClick={addOffer}>+<span>Add Offer</span></button>
                </div>
                <div style={{ display: spin ? 'none' : 'block' }} className={style.offerMain}>
                    <table className={style.table}>
                        <thead >
                            <tr >
                                <th>ID</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Descriptiions</th>
                                <th style={{ width: '60px' }}></th>
                            </tr>
                        </thead>

                        <tbody>

                            {offers.map((offer, index) => (
                                    <tr className={style.tr}>
                                        <td className={style.data}>{index + 1}</td>
                                        <td className={style.data}><Image src={offer.img_url} alt='category' width={50} height={50} /></td>
                                        <td className={style.data}>{offer.name}</td>
                                        <td className={style.data}>{offer.description}</td>
                                        <td className={style.button}>
                                            <Image style={{ cursor: 'pointer' }} onClick={() => editOffer(offer.id)} src={editImg} alt='edit' width={30} height={30} />
                                            <Image style={{ cursor: 'pointer' }} onClick={() => deleteBtn(offer.id)} src={deleteImg} alt='delete' width={30} height={30} />
                                        </td>
                                    </tr>
                            ))}
                        </tbody>


                    </table>
                </div>
            </div>
            <div>
                <Product />
            </div>
            <div>
                <div style={{ width: '100%', height: '100vh', display: delet ? 'flex' : 'none' }}>
                    <div className={styleDelet.delete}>
                        <h2>Are you sure it’s deleted ?</h2>
                        <p>Attention! If you delete this product, it will not come back...</p>
                        <div>
                            <button className={styleDelet.cancelDelete} onClick={cancelBtn}>Cancel</button>
                            <button className={styleDelet.deletBtn} onClick={deleteOffer}>Delete</button>
                        </div>
                    </div>
                </div>
                <div style={{ display: delet ? 'flex' : 'none' }} className={styleDelet.backFont}></div>
            </div>
            <div className={style.spinDiv} style={{ display: spin ? 'flex' : 'none' }} >
                <Image src={spinGif} alt='spin' className={style.spin} width={600} height={500} />
            </div>
        </>
    )
}