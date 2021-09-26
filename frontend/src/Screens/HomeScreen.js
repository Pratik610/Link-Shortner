import React, { useState } from 'react'
import axios from 'axios'

const HomeScreen = () => {
	const [url, setUrl] = useState('')
	const [result, setResult] = useState('')
	const [showInput, setShowInput] = useState(true)

	const convert = async (e) => {
		e.preventDefault()
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post('/geturl', { userUrl: url }, config)
		setUrl('')
		setResult(data)
		setShowInput(false)
	}

	const copyText = () => {
		var copy = document.getElementById('copy')
		copy.select()
		copy.setSelectionRange(0, 99999)
		navigator.clipboard.writeText(copy.value)
	}
	return (
		<div className='container'>
			<h3 className='mt-3'>Shortyyy</h3>
			<div className='form-data'>
				{showInput && (
					<>
						<p className='text-center'>Shorten your URl with one easy click</p>
						<form onSubmit={convert}>
							<div className='input-group mb-3 w-lg-75 mx-auto'>
								<input
									type='url'
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									className='form-control'
									placeholder='Your URl'
									aria-label="Recipient's username"
									aria-describedby='button-addon2'
								/>
							</div>
							<button
								style={{ backgroundColor: '#003459' }}
								className='btn d-block text-light w-50 mx-auto'
								disabled={!url}
								type='submit'
								id='button-addon2'>
								Submit
							</button>
						</form>
					</>
				)}
			</div>
			{result && (
				<>
					<p className='text-center'>Press the Button To Copy</p>
					<div className='copy-link'>
						<div className='input-group mb-3 w-lg-75 mx-auto'>
							<input
								type='url'
								disabled
								id='copy'
								value={`${window.location.href}${result.result.code}`}
								onChange={(e) => setUrl(e.target.value)}
								className='form-control'
								aria-label="Recipient's username"
								aria-describedby='button-addon2'
							/>
						</div>
						<button
							style={{ backgroundColor: '#003459' }}
							className='btn d-block text-light w-50 mx-auto  '
							type='button'
							onClick={copyText}>
							<i className='fas fa-copy'></i>
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default HomeScreen
