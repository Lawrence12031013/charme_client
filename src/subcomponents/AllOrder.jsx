import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllOrder = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const getAllOrders = async () => {
        try {
            const res = await axios.get('/order');
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    const handleDelete = async (id) => {
        await Swal.fire({
            title: '確定要刪除訂單嗎？',
            icon: 'success',
            confirmButtonText: '刪除',
            denyButtonText: '取消',
            showDenyButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/order/${id}`).then(() => {
                    getAllOrders();
                }).catch((err) => {
                    console.log(err);
                });
            } else if (result.isDenied) {
                return;
            }
        });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredData = data.filter((item) => {
        return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.service.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='mb-4 text-right'>
                <input
                    type='text'
                    placeholder='輸入姓名／服務項目搜尋訂單'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='border px-2 py-1 rounded'
                />
            </div>
            <div className='grid gap-2 grid-cols-8 text-center border-b py-4'>
                <p>預約日期</p>
                <p>預約時間</p>
                <p>預約人</p>
                <p>電話</p>
                <p className='col-span-2'>服務項目</p>
                <p>是否回除</p>
                <p>刪除會員</p>
            </div>
            {currentData && currentData.map((item, i) => (
                <div className='grid gap-2 grid-cols-8 text-center border-b py-5' key={i}>
                    <p>{item.reservationDate}</p>
                    <p>{item.reservationTime}</p>
                    <p>{item.name}</p>
                    <p>{item.phone}</p>
                    <p className='col-span-2'>{item.service}</p>
                    <p>是</p>
                    <button className='bg-red-700 text-white rounded' onClick={() => { handleDelete(item._id) }}>刪除訂單</button>
                </div>
            ))}
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
    );
};

export default AllOrder;
