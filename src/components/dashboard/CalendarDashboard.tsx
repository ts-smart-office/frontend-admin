'use client'
import { FC, useState } from 'react'
import { Calendar } from '../ui/calendar'

const CalendarDashboard: FC = () => {
	const [date, setDate] = useState<Date | undefined>(new Date())

	return (
		<Calendar
			mode='single'
			selected={date}
			onSelect={setDate}
			className='w-full bg-white rounded-md border-none'
		/>
	)
}

export default CalendarDashboard
