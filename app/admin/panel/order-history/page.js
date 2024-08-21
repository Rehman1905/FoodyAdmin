'use client'
import '../../admin.css'
import style from '../orders/orders.module.css'
import eye from '../orders/image/eye.png'
import bin from '../orders/image/bin.png'
import spinGif from '../image/spin.gif'
import Image from 'next/image'
import styleDelet from '../products/products.module.css'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
export default function OrderHistory() {
    const [orders, setOrders] = useState([])
    const [spin, setSpin] = useState(true)
    const dispatch = useDispatch()
    const dataHistory = useSelector(state => state.history.data)
    useEffect(() => {

        const fetchOrders = async () => {
            await dataHistory.then(result => setOrders(result))
            setSpin(false)
        }
        fetchOrders()
    })
    const [delet, setDelet] = useState(false)
    const deleteBtn = useCallback(() => {
        setDelet(true)
        document.body.style.overflow = 'hidden'
    }, [])
    const cancelBtn = useCallback(() => {
        setDelet(false)
        document.body.style.overflow = 'auto'
    }, [])
    orders.forEach(order => {
        const date = new Date(order.created * 1000); // Timestamp-i tarixi obyektə çeviririk
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        console.log(`Order ID: ${order.id}, Date: ${formattedDate}`);
    });

    return (
        <>
            <section className={style.sec} style={{ display: spin ? 'none' : 'flex' }}>
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
                        {orders.map((order, index) => {
                            const date = new Date(order.created * 1000); // Timestamp-i tarixi obyektə çeviririk
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const year = '2024';

                            const formattedDate = `${day}/${month}/${year}`;

                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{order.customer_id}</td>
                                    <td>{formattedDate}</td>
                                    <td style={{ maxWidth: '200px' }}>{order.delivery_address}</td>
                                    <td>{order.amount}</td>
                                    <td>{order.payment_method == 0 ? 'Cash On Delivery' : 'Pay at the door by credit card'}</td>
                                    <td>{order.contact}</td>
                                </tr>
                            )
                        })}
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
                            <button className={styleDelet.deletBtn}>Delete</button>
                        </div>
                    </div>
                </div>
                <div style={{ display: delet ? 'flex' : 'none' }} className={styleDelet.backFont}></div>
            </div>
            <div className={style.spinDiv} style={{ display: spin ? 'flex' : 'none' }} >
                <Image src={spinGif} alt='spin' className={style.spin} width={800} height={700} />
            </div>
        </>
    )
}