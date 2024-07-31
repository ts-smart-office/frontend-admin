import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'

interface ISelectProps {
	values: {
		key: string
		value: string
	}[]
	filterStatus: string[]
	setFilterStatus: any
}
const SelectStatus = ({
	values,
	filterStatus,
	setFilterStatus,
}: ISelectProps) => {
	const handleSelectChange = (value: string) => {
		if (!filterStatus.includes(value)) {
			setFilterStatus((prev: string[]) => [...prev, value])
		} else {
			const referencedArray = [...filterStatus]
			const indexOfItemToBeRemoved = referencedArray.indexOf(value)
			referencedArray.splice(indexOfItemToBeRemoved, 1)
			setFilterStatus(referencedArray)
		}
	}

	const isOptionSelected = (value: string): boolean => {
		return filterStatus.includes(value) ? true : false
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' className='flex gap-2'>
						<span>Select Status</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className='w-fit'
					onCloseAutoFocus={e => e.preventDefault()}
				>
					<DropdownMenuLabel>Reservation status</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{values.map((value: ISelectProps['values'][0], index: number) => {
						return (
							<DropdownMenuCheckboxItem
								onSelect={e => e.preventDefault()}
								key={index}
								checked={isOptionSelected(value.value)}
								onCheckedChange={() => handleSelectChange(value.value)}
							>
								{value.key}
							</DropdownMenuCheckboxItem>
						)
					})}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}

export default SelectStatus
