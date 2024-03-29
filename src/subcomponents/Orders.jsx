import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCalendar, eventSelect, WEEKS, TIMES } from '../components/useCalendar'
import { format, getDate, getDay, getMonth, getTime, getYear } from 'date-fns'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import './order.css'

const Orders = () => {

    const calendar = useCalendar()
    const currentDate = new Date();

    const [ noteDate, setNoteDate ] = useState('')
    const [data, setData] = useState([])
  

    useEffect(() => {
        setNoteDate(format(new Date(), "yyyy-MM-dd"));
      },[])

    useEffect(() => {
        getTime();
      }, [noteDate]);

      const getTime = async () => {
        const date = noteDate;
        try {
          const response = await axios.get(`/order/date/${date}`);
          setData(response.data)
          if(response.data.length === 0) {
              setData(null)
              return;
          }
        } catch (error) {
          return;
        }
      };

      const handleDelete = async (id, date) => {
        await Swal.fire({
            title: '確定要刪除訂單嗎？',
            icon: 'success',
            confirmButtonText: '刪除',
            denyButtonText: '取消',
            showDenyButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/order/${id}`).then(() => {
                getTime();
              }).catch((err) => {
                  console.log(err)
              })
            } else if (result.isDenied) {
              return
            }
          })
      }
   
  return (
        <div className='w-full h-full flex flex-col'>
            <table 
              border="0"
              cellPadding="0"
              cellSpacing="0"
              className="m-5 mt-2 mx-auto w-full">
              <thead>
                    <tr className="tr123">
                      <td colSpan="100%" className="abc">
                        <div className="flex justify-center items-center mx-auto">
                          <img
                            src='images/left-chevron.png'
                            className="imgIconE mx-10 h-4 cursor-pointer"
                            onClick={calendar.setPreMonth}
                            alt="上一個月"
                          />
                          {/* 可替換format: dd(加上日期) MM(數字月) MMMM(完整英文月) */}
                          <div className="inline-block text-2xl font-dance flex">
                            <p className='mx-2'>
                                {format(calendar.today, 'MMM')}
                            </p>
                            <p className='mx-2'>
                                {format(calendar.today, 'yyyy')}
                            </p>
                          </div>
                          <img
                            src='images/right-chevron.png'
                            className="mx-10 h-4 cursor-pointer"
                            onClick={calendar.setNextMonth}
                            alt="下一個月"
                          />
                        </div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 印出星期 */}
                    <tr className='tr123 px-4 mt-4'>
                      {WEEKS.map((title, i) => {
                        return (
                          <td key={i} className='td text-center pt-3 font-dance text-nomal text-black'>
                            {title} 
                          </td>
                        )
                      })}
                    </tr>
                      {/* 印出日期 */}
                        {calendar.days.map((week, i) => {
                          //map出來的值是月份
                          return (
                              <tr key={i}>
                                {week.map((date, j) => {
                                  const otherMonth = date.otherMonth //判斷當月或是前後月
                                  const selectedToday = () => {
                                    calendar.selectDate(date.date)
                                  }

                                  return (
                                <td
                                        key={j}
                                        className="dayE rounded my-2"
                                      >
                                        <> 
                                        {!otherMonth ? 
                                        <button
                                        onClick={() => {
                                            setNoteDate(format(date.date, "yyyy-MM-dd"))
                                          }}
                                          className='w-full py-2 flex justify-center'
                                        >
                                             
                                                {noteDate == format(date.date, "yyyy-MM-dd") ? 
                                                <div className='text-center font-dance today'>
                                                {!otherMonth && getDate(date.date)}
                                                </div>
                                                : 
                                                <div className='text-center font-dance'>
                                                {!otherMonth && getDate(date.date)}
                                                </div>   
                                            }
                                                
                                        </button>
                                         : <div className='text-center font-dance text-slate-300'>
                                         {getDate(date.date)}
                                         </div>
                                        }
                                        </>
                                </td>
                                  )
                                })}
                              </tr>
                          )
                        })}
                  </tbody>
            </table>
            <hr />
            <div className='flex justify-evenly'>
                { data == null ? 
                <div className='flex flex-wrap text-center justify-center items-center h-80 px-4'>
                    <h1 className='text-xl'>{noteDate}<span className='px-4 whitespace-nowrap'>今日沒有訂單</span></h1>
                </div>
                :
                <React.Fragment >
                  { window.innerWidth > 490 ?
                  <div className='grid grid-rows-5 w-full px-4'>
                    <div className='grid gap-2 grid-cols-8 pt-4 text-center'>
                        <p>時間</p>
                        <p>預約人</p>
                        <p>電話</p>
                        <p className='col-span-2'>施作項目</p>
                        <p>回除</p>
                        <p>金額</p>
                    </div>
                    {data.map((item, i) => (
                        <div className='grid gap-2 grid-cols-8 text-center border-b py-6' key={i}>
                            <p>{item.reservationTime}</p>
                            <p>{item.name}</p>
                            <p>{item.phone}</p>
                            <p className='col-span-2'>{item.service}</p>
                            <p>否</p>
                            <p>1,600</p>
                            <button  className='bg-red-700 text-white rounded' onClick={() => {handleDelete(item._id, item.reservationDate)}}>刪除訂單</button>
                        </div>
                    ))}
                </div>
                :
                <div className='w-full'>
                    {data.map((item, i) => (
                        <div className='p-2 border relative my-2 scroll' key={i}>
                          <div className='grid grid-cols-4'>
                            <p>時間：</p>
                            <p className='col-span-3'>{item.reservationTime}</p>
                            <p>預約人：</p>
                            <p className='col-span-3'>{item.name}</p>
                            <p>電話：</p>
                            <p className='col-span-3'>{item.phone}</p>
                            <p className='whitespace-nowrap'>預約服務：</p>
                            <p className='col-span-3'>{item.service}</p>
                            <p>回除：</p>
                            <p className='col-span-3'>否</p>
                            <p>價格</p>
                            <p className='col-span-3'>1,600</p>
                          </div>
                          <div className='w-full flex justify-end'>
                            <button className='bg-red-700 text-white rounded px-4 py-1 mt-3 mb-1' onClick={() => {handleDelete(item._id, item.reservationDate)}}>刪除訂單</button>
                          </div>
                        </div>
                    ))}
                </div>
                }
                
                  
                </React.Fragment>
                
            }
            </div>
        </div>
  )
}

export default Orders