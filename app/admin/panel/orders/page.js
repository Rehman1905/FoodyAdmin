'use client'
import '../../admin.css'
import style from './orders.module.css'
import eye from './image/eye.png'
import bin from './image/bin.png'
import Image from 'next/image'
import Show from './product'
import styleDelet from '../products/products.module.css'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import spinGif from '../image/spin.gif'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrderData } from '../../../features/orderSlice'
export default function Orders() {
    const [orders, setOrders] = useState([])
    const [deletId, setDeletId] = useState('')
    const [spin, setSpin] = useState(true)
    const [product, setProduct] = useState({
        display: false,
        data: []
    })
    const dispatch = useDispatch()
    const dataOrders = useSelector(state => state.orders.data)
    useEffect(() => {
        const fetchOrder = async () => {
            await dataOrders.then(result => setOrders(result))
            setSpin(false)
        }
        fetchOrder()

    }, [dataOrders])
    const [delet, setDelet] = useState(false)
    const deleteBtn = useCallback((id) => {
        setDeletId(id)
        setDelet(true)
        document.body.style.overflow = 'hidden'
    }, [])
    const cancelBtn = useCallback(() => {
        setDelet(false)
        document.body.style.overflow = 'auto'
    }, [])
    const showOrder = useCallback((products) => {
        setProduct({
            display: true,
            data: products
        }
        )
    })
    const deleteOrder = useCallback(async () => {
        setSpin(true)
        setDelet(false)
        await axios.delete(`/api/order`, {
            headers: {
                Authorization: `Bearer ${authorization}`
            },
            data: {
                order_id: deletId
            }
        });
        dispatch(deleteOrderData())
    }, [deletId]);
    return (
        <>
            <section className={style.sec} style={{ display: spin ? 'none' : 'flex' }} >
                <h2>Your Orders</h2>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Customer Id</th>
                            <th>Time</th>
                            <th>Delivery Address</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) => {
                            const date = new Date(order.created * 1000); 
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const year = '2024';

                            const formattedDate = `${day}/${month}/${year}`;
                            return(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.customer_id}</td>
                                <td>{formattedDate}</td>
                                <td style={{ maxWidth: '200px' }}>{order.delivery_address}</td>
                                <td>{order.amount}</td>
                                <td>{order.payment_method == 0 ? 'Cash On Delivery' : 'Pay at the door by credit card'}</td>
                                <td>{order.contact}</td>
                                <td><Image onClick={() => showOrder(order.products)} src={eye} alt="Eye Icon" width={20} height={20} /></td>
                                <td>
                                    <Image onClick={() => deleteBtn(order.id)} className={style.bin} src={bin} alt="Bin Icon" width={20} height={20} />
                                </td>
                            </tr>
                            )}
                        )}
                    </tbody>
                </table>
            </section>
            <div>
                <div style={{ width: '100%', height: '100vh', display: delet ? 'flex' : 'none' }}>
                    <div className={styleDelet.delete}>
                        <h2>Are you sure it’s deleted ?</h2>
                        <p>Attention! If you delete this product, it will not come back...</p>
                        <div>
                            <button className={styleDelet.cancelDelete} onClick={cancelBtn}>Cancel</button>
                            <button onClick={deleteOrder} className={styleDelet.deletBtn}>Delete</button>
                        </div>
                    </div>
                </div>
                <div style={{ display: delet ? 'flex' : 'none' }} className={styleDelet.backFont}></div>
            </div>
            <Show setProduct={setProduct} product={product} />
            <div className={style.spinDiv} style={{ display: spin ? 'flex' : 'none' }} >
                <Image src={spinGif} alt='spin' className={style.spin} width={800} height={700} />
            </div>
        </>
    )
}