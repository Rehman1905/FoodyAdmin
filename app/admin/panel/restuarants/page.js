'use client';
import '../../admin.css'
import { useCallback, useContext, useState, useEffect } from 'react';
import Product from '../addProduct';
import style from './retaurants.module.css';
import deletStyle from '../products/products.module.css';
import { dataContext } from '../../../context/context';
import Image from 'next/image';
import deleteImg from './image/delete.png';
import editImg from './image/edit.png';
import restuarantImg from '../image/pizza.png';
import {v4} from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteRestuarantData } from '../../../features/restuarantSlice';
export default function Restuarants() {
    const uniqueId = v4();
    
    const [restuarants,setRestuarants]=useState([])
    const dataRestuarant=useSelector(state=>state.restuarant.data)
    useEffect(()=>{
        dataRestuarant.then(result=>setRestuarants(result))
    },[dataRestuarant])

    const [newData, setNewData] = useContext(dataContext);
    // const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [delet, setDelet] = useState(false);
    const [restuarant,setRestuarant]=useState(false)
    const [deleteRestuarant,setDeleteRestuarant]=useState('')
    const [option,setOption]=useState('all')
    const handleChange=(e)=>{
        setOption(e.target.value)
    }
    const dispatch=useDispatch()
    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsSmallScreen(window.innerWidth <= 600);
    //     };

    //     window.addEventListener('resize', handleResize);
    //     handleResize();

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    const addRestuarant = useCallback(() => {
        setNewData({
            display:true,
            data:'Add Restuarant'
        });
        setRestuarant(true)
        document.body.style.overflow = 'hidden';
    }, [setNewData]);

    const deletRestuarant = useCallback((id) => {
        setDeleteRestuarant(id)
        setDelet(true);
    }, [delet]);

    const cancelBtn = useCallback(() => {
        setDelet(false);
        document.body.style.overflow = 'auto';
    }, []);
    const editRestuarant = useCallback((id) => {
        const restuarantToEdit=restuarants?.find(restuarant=>restuarant.id===id)
        if(restuarantToEdit){
            setNewData({
                display:true,
                data:'Edit Restuarant',
                editData:restuarantToEdit
            });
        }
        
        console.log(newData.display)
    }, [restuarants,newData])
    
    
    const restuarantDelet=useCallback(async()=>{
        await axios.delete(`/api/restuarants/${deleteRestuarant}`);
        dispatch(deleteRestuarantData(deleteRestuarant))
        cancelBtn(); 
    },[deleteRestuarant])
    const [categories,setCategories]=useState([])
    const dataCategory=useSelector(state=>state.category?.data)
    useEffect(()=>{
        dataCategory?.then(result=>setCategories(result))
    },[dataCategory])
    const filteredRestuarant = option === 'all'
        ? restuarants
        : restuarants.filter(restaurant => restaurant.category_id === option);
    return (
        <>
            <div className={style.container}>
                <div className={style.restuarantHead}>
                    <div>
                        <h2>Restaurant</h2>
                    </div>
                    <div className={style.rightSide}>
                        <select onChange={handleChange}>
                            <option value={'all'}>All Category</option>
                            {categories.map(restuarant=>(
                                <option value={restuarant.id} key={restuarant.id}>{restuarant.name}</option>
                            ))}
                        </select>
                        <button onClick={addRestuarant}>+Add Restaurant</button>
                    </div>
                </div>
                <div className={style.restuarantsList}>
                    {filteredRestuarant.map(restuarant => (
                        <div key={restuarant.id} className={style.restuarantCard}>
                            <div className={style.otherDiv}>
                                <Image src={restuarant.img_url} alt={restuarant.name} width={100} height={100} />
                            </div>
                            <div className={style.otherDiv}>
                                <h3>{restuarant.name}</h3>
                                <p>{restuarant.product}</p>
                            </div>
                            <div className={style.actions}>
                                <Image src={deleteImg}  onClick={()=>deletRestuarant(restuarant.id)} alt="Delete" style={{ cursor: 'pointer' }} width={30} height={30} />
                                <Image src={editImg} onClick={()=>editRestuarant(restuarant.id)} alt="Edit" style={{ cursor: 'pointer' }} width={30} height={30} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Product button={'Create Restuarant'} />
            </div>
            
            <div>
                <div style={{ width: '100%', height: '100vh', display: delet ? 'flex' : 'none' }}>
                    <div className={deletStyle.delete}>
                        <h2>Are you sure it’s deleted ?</h2>
                        <p>Attention! If you delete this product, it will not come back...</p>
                        <div>
                            <button className={deletStyle.cancelDelete} onClick={cancelBtn}>Cancel</button>
                            <button className={deletStyle.deletBtn} onClick={restuarantDelet}>Delete</button>
                        </div>
                    </div>
                </div>
                <div style={{ display: delet ? 'flex' : 'none' }} className={deletStyle.backFont}></div>
            </div>
        </>
    );
}
