import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import RedirectPage from './Screens/RedirectPage'
function App() {
	return (
		<Router>
			<Route path='/' exact component={HomeScreen} />
			<Route path='/:id' exact component={RedirectPage} />
		</Router>
	)
}

export default App
