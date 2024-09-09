'use client'
import { FC, useEffect, useState } from 'react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import ReviewOverview from '@/components/reviews/ReviewOverview'
import TableReview from '@/components/reviews/TableReview'
import { apiReviewOverview } from '@/api/reservationApi'

const ReviewPage: FC = () => {
	const [reviewOverview, setReviewOverview] = useState<any | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [minDate, setMinDate] = useState<string>('')
	const [maxDate, setMaxDate] = useState<string>('')

	const fetchReviewOverview = async () => {
		await apiReviewOverview({ minDate, maxDate })
			.then(res => {
				setReviewOverview(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchReviewOverview()
	}, [minDate, maxDate])

	console.log(minDate, maxDate)

	return (
		<div className='px-4 font-urbanist flex flex-col gap-6'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Reviews</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			{loading ? (
				<p>Getting data...</p>
			) : (
				<>
					<ReviewOverview
						averageRating={reviewOverview?.average_rating}
						totalReview={reviewOverview?.total_reviews}
						totalReviewComment={reviewOverview?.total_reviews_with_comments}
						goodReviews={reviewOverview?.tag_statistics.puas}
						midReviews={reviewOverview?.tag_statistics.perlu_ditingkatkan}
						lowReviews={reviewOverview?.tag_statistics.kecewa}
						setMinDate={setMinDate}
						setMaxDate={setMaxDate}
					/>
					<TableReview />
				</>
			)}
		</div>
	)
}

export default ReviewPage
