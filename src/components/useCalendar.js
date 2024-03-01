import { useEffect, useState } from 'react'
import {
  addMonths,
  subMonths,
  getDaysInMonth,
  getDay,
  endOfMonth,
  setDate,
  startOfMonth,
} from 'date-fns'

export const MONTHS = [
  'JANuary',
  'FEBruary',
  'MARch',
  'APRil',
  'MAY',
  'JUNe',
  'JULy',
  'AUGust',
  'SEPtember',
  'OCTober',
  'NOVember',
  'DECember',
]
export const WEEKS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const useCalendar = () => {
  const [today, setToday] = useState(new Date())

  const setNextMonth = () => {
    setToday(addMonths(today, 1))
  }

  const setPreMonth = () => {
    setToday(subMonths(today, 1))
  }

  const daysInMonth = () => {
    let month = []
    let currentDate = 1
    // 預設迴圈的開頭都為1，代表日期
    let firstDay = getDay(startOfMonth(today))
    let allDays = getDaysInMonth(today)
    let weekNums = Math.ceil((allDays + firstDay) / 7)
    // 算有幾周，取本月總日數+上個月餘日數 / 7
    // Math.ceil() 函式會回傳大於等於所給數字的最小整數。
    let preMonth = subMonths(today, 1)
    let preDate = endOfMonth(preMonth).getDate() - firstDay + 1
    let nextDate = 1
    let nextMonth = addMonths(today, 1)

    for (let weekNum = 0; weekNum < weekNums; weekNum++) {
      let week = []
      for (let day = 0; day < 7; day++) {
        let dateInfo = {
          otherMonth: false,
          date: null,
          calenderImgIcon: [1, 2, 3, 4],
        }
        // 上個月空白日
        if (weekNum === 0 && day < firstDay) {
          week.push({
            ...dateInfo,
            date: setDate(preMonth, preDate),
            otherMonth: true,
            calenderImgIcon: [],
          })
          preDate++
        } else if (currentDate > allDays) {
          //下個月的空白
          week.push({
            ...dateInfo,
            date: setDate(nextMonth, nextDate),
            otherMonth: true,
            calenderImgIcon: [],
          })
          nextDate++
        } else {
          //這個月
          week.push({
            ...dateInfo,
            date: setDate(today, currentDate),
            otherMonth: false,
            calenderImgIcon: [],
          })
          currentDate++
        }
      }
      month.push(week)
    }
    return month
  }

  const days = daysInMonth()
  const selectDate = (date) => {
    setToday(date)
  }
  return {
    today,
    days,
    setNextMonth,
    setPreMonth,
    selectDate,
  }
}

// const eventSelect = (category) => {
//   category = parseInt(category, 10)
//   switch (category) {
//     case 1:
//       return enentIcon1
//     case 2:
//       return enentIcon2
//     case 3:
//       return enentIcon3
//     case 4:
//       return enentIcon4
//     default:
//       return ''
//   }
// }

export { useCalendar }