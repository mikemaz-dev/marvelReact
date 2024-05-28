import { createRoot } from 'react-dom/client'
import App from './components/app/App'
import './style/style.scss'
import { StrictMode } from 'react'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
	<StrictMode>
		<App />
	</StrictMode>
)
