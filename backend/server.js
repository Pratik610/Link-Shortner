import express from 'express'
import { Deta } from 'deta'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
const app = express()
const port = process.env.PORT

const deta = Deta(process.env.KEY)
const db = deta.Base('urls')

app.use(express.json())

const getRandomChar = () => {
	let x = ''
	const charList =
		'QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm'
	for (let index = 0; index < 6; index++) {
		x += charList[Math.floor(Math.random() * charList.length)]
	}
	return x
}

app.post('/geturl', async (req, res) => {
	const { userUrl } = req.body
	const result = await db.put({ code: getRandomChar(), url: userUrl })
	res.status(201).json({ result })
})

app.get('/:id', async (req, res) => {
	const code = req.params.id

	const result = await db.fetch({ code })
	console.log(result)
	res.redirect(`${result.items[0].url}`)

	// if (result) {
	// 	res.status(201).json({ result })
	// } else {
	// 	res.status(404)
	// 	throw new Error('Not Found')
	// }
})

const __dirname = path.resolve()
if (process.env.ENVIRONMENT === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	)
}

app.listen(port, console.log(`SERVER RUNNING ON PORT ${port}`))
