'use client'
import Image from "next/image";
import style from './product.module.css';
import { useCallback, useEffect, useRef } from "react";

export default function Show({ product, setProduct }) {
    const dropdownRef = useRef(null);

    const handleClickOutside = useCallback((event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setProduct({
                display: false,
                data: []
            });
        }
    }, [setProduct]);

    useEffect(() => {
        if (product.display) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [product.display, handleClickOutside]);

    useEffect(() => {
        if (product.display) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [product.display]);

    return (
        <>
            <section  style={{ display: product.display ? 'flex' : 'none' }} className={style.sec}>
                <table ref={dropdownRef} className={style.table}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price $</th>
                            <th>Count</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.data?.map((productItem, index) => (
                            <tr key={index}>
                                <td><Image src={productItem.img_url} width={50} height={50} alt="img" /></td>
                                <td style={{ maxWidth: '120px' }}>{productItem.name}</td>
                                <td>{productItem.price}</td>
                                <td>{productItem.count}</td>
                                <td>{productItem.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <div className={style.backFont} style={{ display: product.display ? 'block' : 'none' }}></div>
        </>
    );
}
