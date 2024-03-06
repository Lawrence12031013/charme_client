import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Member = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [editPage, setEditPage] = useState(false)
    const [editData, setEditData] = useState([])

    const getAllUsers = async () => {
        try {
            const res = await axios.get('/user');
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleDelete = async () => {
        await Swal.fire({
            title: '確定要刪除會員嗎？',
            icon: 'success',
            confirmButtonText: '刪除',
            denyButtonText: '取消',
            showDenyButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/user/${editData._id}`).then(() => {
                    setEditPage(false);
                    getAllUsers();
                }).catch((err) => {
                    console.log(err);
                });
            } else if (result.isDenied) {
                return;
            }
        });
    };

    const handleEdit = async (id) => {
        setEditPage(true)
        try {
            console.log(id)
            const res = await axios.get(`/user/${id}`)
            setEditData(res.data)
            console.log(res.data)
        }catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async () => {
        await Swal.fire({
            title: '確定要更新會員嗎？',
            icon: 'success',
            confirmButtonText: '確認',
            denyButtonText: '取消',
            showDenyButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`/user/${editData._id}`, editData).then(() => {
                    setEditPage(false);
                    getAllUsers();
                }).catch((err) => {
                    console.log(err);
                });
            } else if (result.isDenied) {
                return;
            }
        });
    }

    const handleInputChange = (e, field) => {
        setEditData({ ...editData, [field]: e.target.value });
    };

    // const handleUpdate = async () => {
    //     try {
    //         await axios.put(`/user/${editData._id}`, editData);
    //         setEditPage(false);
    //         getAllUsers();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredData = data.filter((item) => {
        return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {editPage === true ? 
                <div className='h-85 relative'>
                    <h1 className='text-xl'>編輯會員</h1>
                    {editData && ( // 检查editData是否存在
                        <div className='flex flex-col mt-2'>
                            <label htmlFor="name">姓名</label>
                            <input type="text" id='name' className='border mb-4 mt-2 w-full' value={editData.name || ''} readOnly/>
                            {/* <label htmlFor="password">密碼</label>
                            <input type="text" id='password'  className='border mb-4 mt-2 w-full' value={"password"} readOnly/> */}
                            <label htmlFor="phone">電話</label>
                            <input type="text" id='phone' className='border mb-4 mt-2 w-full' value={editData.phone || '' } onChange={(e) => handleInputChange(e, 'phone')} />
                            <label htmlFor="email">e-mail</label>
                            <input type="text" id='email' className='border mb-4 mt-2 w-full' value={editData.email || ''} onChange={(e) => handleInputChange(e, 'email')} />
                            <label htmlFor="comment">備註</label>
                            <input type="text" id='comment' className='border mb-4 mt-2 w-full' value={editData.comment || ''} onChange={(e) => handleInputChange(e, 'comment')}/>
                        </div>
                    )}
                    <div className='flex justify-evenly items-center mt-8 absolute bottom-0 w-full'>
                        <button className='bg-rose-600 text-white px-2 rounded' onClick={handleDelete}>刪除會員</button>
                        <button className='bcg text-white px-4 rounded' onClick={handleUpdate}>修改</button>
                        <button className='border px-4' onClick={() => setEditPage(false)}>取消</button>
                    </div>
                </div>
                :
                <div> 
                    <div className='mb-4 text-right'>
                        <input
                            type='text'
                            placeholder='輸入姓名搜尋會員'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='border px-2 py-1 rounded'
                        />
                    </div>
                    <React.Fragment> 
                    { window.innerWidth > 490 ? 
                    <>
                        <div className='grid gap-2 grid-cols-8 text-center border-b py-4'>
                            <p>姓名</p>
                            <p>電話</p>
                            <p>e-mail</p>
                            <p className='col-span-4'>備註</p>
                            <p>編輯會員</p>
                        </div>
                        {currentData && currentData.map((item, i) => (
                            <div className='grid gap-2 grid-cols-8 text-center border-b py-5' key={i}>
                                <p>{item.name}</p>
                                <p>{item.phone}</p>
                                <p>{item.email}</p>
                                <p className='col-span-4'>{item.comment}</p>
                                <button className='bcg text-white rounded' onClick={() => { handleEdit(item._id) }}>編輯會員</button>
                            </div>
                        ))}
                    </>
                    :
                    <>
                        {currentData && currentData.map((item, i) => (
                            <div className='p-2 border relative my-2 scroll' key={i}>
                                <div className='grid grid-cols-4'>
                                <p className='px-2'>姓名：</p>
                                <p className='px-2 col-span-3'>{item.name}</p>
                                <p className='px-2'>電話：</p>
                                <p className='px-2 col-span-3'>{item.phone}</p>
                                <p className='px-2'>e-mail：</p>
                                <p className='px-2 col-span-3'>{item.email}</p>
                                <p className='px-2'>備註：</p>
                                <p className='px-2 col-span-3'>{item.comment}</p>
                                </div>
                                <div className='w-full flex justify-end'>
                                <button className='bcg text-white rounded px-2 py-1' onClick={() => { handleEdit(item._id) }}>編輯會員</button>
                                </div>
                            </div>
                        ))}
                    </>
                    }


                    </React.Fragment>
                    
                    <div className='fixed bottom-4 right-10'>
                        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
                            <React.Fragment key={index}>
                                {currentPage - 1 === index ?
                                    <button className='py-1 px-3 border' onClick={() => paginate(index + 1)}>{index + 1}</button>
                                    :
                                    <button className='py-1 px-4' onClick={() => paginate(index + 1)}>{index + 1}</button>
                                }
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            }
        </>
    );
};

export default Member;
