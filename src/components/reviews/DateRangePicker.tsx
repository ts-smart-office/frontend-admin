'use client'

import * as React from 'react'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import moment from 'moment'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

export function DatePickerWithRange({
	setMinDate,
	setMaxDate,
}: {
	setMinDate: any
	setMaxDate: any
}) {
	const today = new Date()
	const from = startOfMonth(today)
	const to = endOfMonth(today)

	const [date, setDate] = React.useState<DateRange | undefined>({
		from: from,
		to: to,
	})

	setMinDate(moment(date?.from).format('YYYY-MM-DD'))
	setMaxDate(moment(date?.to).format('YYYY-MM-DD'))

	return (
		<div className='w-fit'>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id='date'
						variant={'outline'}
						className={cn(
							'w-[300px] justify-start text-left font-normal',
							!date && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className='mr-2 h-4 w-4' />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'LLL dd, y')} -{' '}
									{format(date.to, 'LLL dd, y')}
								</>
							) : (
								format(date.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='start'>
					<Calendar
						initialFocus
						mode='range'
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
