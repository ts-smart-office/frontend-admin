import { Button } from '@/components/ui/button'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { ChangeEvent, FC, useRef, useState } from 'react'

type TUploadImagesProps = {
	name: string
	form: any
}

const UploadImages: FC<TUploadImagesProps> = ({ form, name }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [selectedFiles, setSelectedFiles] = useState<File[]>([])

	const handleUploadFile = () => {
		inputRef.current?.click()
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files)
			setSelectedFiles(prevFiles => [...prevFiles, ...files])
			form.setValue(name, [...selectedFiles, ...files])
		}
	}

	const handleRemoveFile = (file: File) => {
		const updatedFiles = selectedFiles.filter(
			selectedFile => selectedFile !== file
		)
		setSelectedFiles(updatedFiles)
	}

	return (
		<>
			<div className='h-full px-4 md:p-8 pt-8 bg-white-500 rounded-t-3xl md:rounded-lg'>
				<div className='flex flex-col gap-4'>
					<div
						role='button'
						tabIndex={0}
						className='p-4 md:p-8 border-2 cursor-pointer w-full rounded-lg border-dashed mt-8'
						onClick={handleUploadFile}
						onKeyDown={event => {
							if (event.key === 'Tab') {
								handleUploadFile()
							}
						}}
						onDragOver={e => e.preventDefault()}
					>
						<div className='flex flex-col items-center gap-8'>
							<div className='flex flex-col items-center justify-center gap-1'>
								<p className='text-base text-black-500'>
									Drag and drop files or browse files
								</p>
								<p className='text-xs text-grey-700'>
									JPG, JPEG, PNG files accepted
								</p>
							</div>
							{selectedFiles.length > 0 ? (
								<div className='w-full flex flex-col gap-4 px-10'>
									{selectedFiles.map(file => (
										<div
											key={file.name}
											className='w-full flex justify-between items-center gap-2'
										>
											<p className='text-sm text-black-500'>{file.name}</p>
											<button
												onClick={() => handleRemoveFile(file)}
												className='text-red-500 hover:text-red-700 focus:outline-none'
											>
												<XMarkIcon className='h-4 w-4' />
											</button>
										</div>
									))}
								</div>
							) : (
								<p className='text-sm text-black-500'>No item uploaded</p>
							)}
							<Button
								type='button'
								variant='outline'
								className='w-fit self-cente px-8 h-fit text-sm hover:bg-opacity-80 hover:bg-greenBrand text-darkColor hover:text-white font-normal'
							>
								Browse images
							</Button>
						</div>
						<input
							ref={inputRef}
							type='file'
							multiple
							className='hidden'
							onChange={handleFileChange}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default UploadImages
