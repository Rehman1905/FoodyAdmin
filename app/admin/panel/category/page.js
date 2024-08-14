'use client'
import '../../admin.css'
import style from './category.module.css'
import Image from 'next/image'
import editImg from './image/edit.png'
import deleteImg from './image/delete.png'
import styleDelet from '../products/products.module.css'
import { useCallback, useContext, useEffect, useState } from 'react'
import { dataContext } from '../../../context/context'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { deleteCategory } from '../../../features/categorySlice'
import Product from '../addProduct'
export default function Category() {
    const [categories, setCategories] = useState([]);
    const [deletID, setDeletID] = useState('');
    const data = useSelector(state => state.category.data);
    const [delet, setDelet] = useState(false);
    const [newData, setNewData] = useContext(dataContext);

    useEffect(() => {
        data.then(result => setCategories(result));
    }, [data]);

    const deleteBtn = useCallback((id) => {
        setDelet(true);
        setDeletID(id);
        document.body.style.overflow = 'hidden';
    }, []);

    const cancelBtn = useCallback(() => {
        setDelet(false);
        document.body.style.overflow = 'auto';
    }, []);

    const editCategory = useCallback((id) => {
        const categoryToEdit = categories.find(category => category.id === id);
        if (categoryToEdit) {
            setNewData({
                display: true,
                data: 'Edit Category',
                editData:categoryToEdit
            });
        }
    }, [categories, setNewData]);
    const addCategory = useCallback(() => {
        setNewData({
            display: true,
            data: 'Add Category'
        });
    }, [setNewData]);
    const dispatch=useDispatch()
    
    const deletBtn = useCallback(async () => {
        await axios.delete(`/api/category/${deletID}`);
        dispatch(deleteCategory(deletID))
        cancelBtn(); 
    }, [deletID, cancelBtn]);
    return (
        
        <>
            <div className={style.container}>
                <div className={style.categoryHead}>
                    <h2>Category</h2>
                    <button onClick={addCategory}>+<span>Add Category</span></button>
                </div>
                <div className={style.categoryMain}>
                    <table className={style.table}>
                        <thead >
                            <tr >
                                <td>ID</td>
                                <td>Image</td>
                                <td>Name</td>
                                <td>Slug</td>
                                <td></td>
                            </tr>
                        </thead>
                        
                        <tbody>

                            {categories.map((category,index) => (
                                
                                <>
                                    <tr >
                                        <td className={style.data}>{index+1}</td>
                                        <td className={style.data}><Image src={category.img_url} alt='category' width={50} height={50} /></td>
                                        <td className={style.data}>{category.name}</td>
                                        <td className={style.data}>{category.slug}</td>
                                        <td className={style.button}>
                                            <Image style={{ cursor: 'pointer' }} onClick={() => deleteBtn(category.id)}  id={category.id} src={deleteImg} alt='delete' width={30} height={30} />
                                            <Image style={{ cursor: 'pointer' }} onClick={() => editCategory(category.id)} src={editImg} alt='edit' width={30} height={30} />
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>


                    </table>
                </div>
            </div>
            <div>
                <Product/>
            </div>
            <div>
                <div style={{ width: '100%', height: '100vh', display: delet ? 'flex' : 'none' }}>
                    <div className={styleDelet.delete}>
                        <h2>Are you sure it’s deleted ?</h2>
                        <p>Attention! If you delete this product, it will not come back...</p>
                        <div>
                            <button className={styleDelet.cancelDelete} onClick={cancelBtn}>Cancel</button>
                            <button className={styleDelet.deletBtn} onClick={deletBtn}>Delete</button>
                        </div>
                    </div>
                </div>
                <div style={{ display: delet ? 'flex' : 'none' }} className={styleDelet.backFont}></div>
            </div>
        </>
    )
}