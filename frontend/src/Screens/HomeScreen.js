import React, { useState } from 'react'
import axios from 'axios'

const HomeScreen = () => {
	const [url, setUrl] = useState('')
	const [result, setResult] = useState('')
	const [showInput, setShowInput] = useState(true)
	const [loading, setLoading] = useState(false)

	const convert = async (e) => {
		e.preventDefault()
		setLoading(true)
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post('/geturl', { userUrl: url }, config)
		setUrl('')
		setResult(data)
		setShowInput(false)
		setLoading(false)
	}

	const copyText = () => {
		var copy = document.getElementById('copy')
		copy.select()
		copy.setSelectionRange(0, 99999)
		navigator.clipboard.writeText(copy.value)
	}
	return (
		<>
			<div className='container'>
				<h1 style={{ fontSize: '3rem' }} className='text-center'>
					Shortyyy
				</h1>

				<div className='form-data'>
					{showInput && (
						<>
							<p className='text-center mb-0'>
								Shorten your URl with one easy click
							</p>
							<p
								style={{ fontSize: '0.8em' }}
								className=' text-center text-light'>
								Free • Fast • Personalized
							</p>
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
								{loading ? (
									<div
										className='spinner-border d-block mx-auto  '
										style={{ color: '#1DA1F2' }}
										role='status'>
										<span className='visually-hidden'>Loading...</span>
									</div>
								) : (
									<button
										style={{ backgroundColor: '#003459' }}
										className='btn d-block text-light w-50 mx-auto'
										disabled={!url}
										type='submit'
										id='button-addon2'>
										Submit
									</button>
								)}
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

							<p
								onClick={() => {
									setResult('')
									setShowInput(true)
								}}
								className=' mt-3 text-center'>
								Create More
							</p>
						</div>
					</>
				)}
			</div>
		</>
	)
}

export default HomeScreen
