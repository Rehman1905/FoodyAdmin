'use client'
import '../../admin.css'
import style from './orders.module.css'
import eye from './image/eye.png'
import bin from './image/bin.png'
import Image from 'next/image'
import styleDelet from '../products/products.module.css'
import { useCallback, useState } from 'react'
export default function Orders() {
    const orders = [
        {
            id: '9177',
            customerId: '010101',
            time: '25 Dec 2021',
            deliveryAddres: 'General Eliaqa Shiklisiki 2A men 39',
            amount: '249$',
            paymendMehtond: 'cash On Delievery',
            constact: '994-51-419-31-30',
            eye: true
        }, {
            id: '9178',
            customerId: '010101',
            time: '25 Dec 2021',
            deliveryAddres: 'General Eliaqa Shiklisiki 2A men 39',
            amount: '249$',
            paymendMehtond: 'cash On Delievery',
            constact: '994-51-419-31-30',
            eye: true
        }
        , {
            id: '9179',
            customerId: '010101',
            time: '25 Dec 2021',
            deliveryAddres: 'General Eliaqa Shiklisiki 2A men 39',
            amount: '249$',
            paymendMehtond: 'cash On Delievery',
            constact: '994-51-419-31-30',
            eye: false
        }
        , {
            id: '9180',
            customerId: '010101',
            time: '25 Dec 2021',
            deliveryAddres: 'General Eliaqa Shiklisiki 2A men 39',
            amount: '249$',
            paymendMehtond: 'cash On Delievery',
            constact: '994-51-419-31-30',
            eye: true
        }
        , {
            id: '9181',
            customerId: '010101',
            time: '25 Dec 2021',
            deliveryAddres: 'General Eliaqa Shiklisiki 2A men 39',
            amount: '249$',
            paymendMehtond: 'cash On Delievery',
            constact: '994-51-419-31-30',
            eye: false
        }
        , {
            id: '9182',
            customerId: '010101',
            time: '25 Dec 2021',
            deliveryAddres: 'General Eliaqa Shiklisiki 2A men 39',
            amount: '249$',
            paymendMehtond: 'cash On Delievery',
            constact: '994-51-419-31-30',
            eye: false
        }, {
            id: '9183',
            customerId: '010101',
            time: '25 Dec 2021',
            deliveryAddres: 'General Eliaqa Shiklisiki 2A men 39',
            amount: '249$',
            paymendMehtond: 'cash On Delievery',
            constact: '994-51-419-31-30',
            eye: false
        }
        , {
            id: '9184',
            customerId: '010101',
            time: '25 Dec 2021',
            deliveryAddres: 'General Eliaqa Shiklisiki 2A men 39',
            amount: '249$',
            paymendMehtond: 'cash On Delievery',
            constact: '994-51-419-31-30',
            eye: false
        }
        , {
            id: '9185',
            customerId: '010101',
            time: '25 Dec 2021',
            deliveryAddres: 'General Eliaqa Shiklisiki 2A men 39',
            amount: '249$',
            paymendMehtond: 'cash On Delievery',
            constact: '994-51-419-31-30',
            eye: false
        }
        , {
            id: '9186',
            customerId: '010101',
            time: '25 Dec 2021',
            deliveryAddres: 'General Eliaqa Shiklisiki 2A men 39',
            amount: '249$',
            paymendMehtond: 'cash On Delievery',
            constact: '994-51-419-31-30',
            eye: false
        }
    ]
    const [delet, setDelet] = useState(false)
    const deleteBtn = useCallback(() => {
        setDelet(true)
        document.body.style.overflow = 'hidden'
    }, [])
    const cancelBtn = useCallback(() => {
        setDelet(false)
        document.body.style.overflow = 'auto'
    }, [])
    return (
        <>
            <div className={style.container}>
                <div className={style.ordersHead}>
                    <h2>Orders</h2>
                </div>
                <div className={style.ordersMain}>
                    <tabel>
                        <thead style={{ display: "flex", alignItems: 'center' }}>
                            <tr style={{ width: '100%', display: "flex", justifyContent: 'space-around' }}>
                                <th >ID</th>
                                <th>Customer ID</th>
                                <th >Time</th>
                                <th >Delievery Address</th>
                                <th >Amount</th>
                                <th >Payment Medhtod</th>
                                <th>Contact</th>
                                <th style={{ width: '50px' }}></th>
                            </tr>
                        </thead>
                        <hr />
                        <tbody >
                            {orders.map(order => (
                                <>
                                    <tr className={style.tr}>
                                        <td>{order.id}</td>
                                        <td>{order.customerId}</td>
                                        <td>{order.time}</td>
                                        <td style={{ width: '150px' }}>{order.deliveryAddres}</td>
                                        <td>{order.amount}</td>
                                        <td style={{width:'100px'}}>{order.paymendMehtond}</td>
                                        <td>{order.constact}</td>
                                        <td style={{ display: 'flex', gap: '5px', width: '50px' }}>
                                            {order.eye === true ? (
                                                <Image src={eye} alt="Eye Icon" width={30} height={30} />
                                            ) : null}
                                            <Image onClick={deleteBtn} className={style.bin} src={bin} alt="Bin Icon" width={30} height={30} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <hr />
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </tabel>
                </div>
            </div>
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
        </>
    )
}