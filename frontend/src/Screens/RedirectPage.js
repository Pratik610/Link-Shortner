import React, { useEffect, useState } from 'react'
import axios from 'axios'
const RedirectPage = ({ history, match }) => {
	const [error, setError] = useState(false)

	useEffect(() => {
		const fetch = async () => {
			const { data } = await axios.get(`/${match.params.id}`)
			if (data) {
				window.location.href = `${data.result.items[0].url}`
			} else {
				setError(true)
			}
		}
		fetch()
	})

	return (
		<div>
			{error && (
				<div>
					<h1>404 Not Found</h1>
				</div>
			)}
		</div>
	)
}

export default RedirectPage
