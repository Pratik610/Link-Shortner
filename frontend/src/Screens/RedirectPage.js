import { useEffect } from 'react'
import axios from 'axios'
const RedirectPage = ({ history, match }) => {
	useEffect(() => {
		const fetch = async () => {
			const { data } = await axios.get(`/geturl/${match.params.id}`)
			if (data) {
				window.location.href = `${data.result.items[0].url}`
			}
		}
		fetch()
	})

	return null
}

export default RedirectPage
