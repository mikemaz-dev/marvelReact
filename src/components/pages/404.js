import { Link } from 'react-router-dom'
import decoration from '../../resources/img/vision.png'

const Page404 = () => {
	return (
		<div
			style={{
				'margin-top': '150px',
				display: 'flex',
				justifyContent: 'space-between',
				alignContent: 'center',
			}}
		>
			<div>
				<h1 style={{ 'font-size': '80px', color: '#000' }}>
					404{' '}
					<span
						style={{
							fontSize: '30px',
							fontWeight: 'normal',
							color: '#4e4e4e',
						}}
					>
						error
					</span>
				</h1>
				<p
					style={{
						'font-size': '45px',
						color: '#4e4e4e',
						margin: '25px 0px 25px 0px',
					}}
				>
					Page doesn't exist
				</p>
				<Link
					style={{
						border: 'none',
						'font-size': '18px',
						color: '#fff',
						'border-radius': '3px',
						'background-color': '#9F0013',
						padding: '20px 40px',
					}}
					to='/'
				>
					Back to homepage
				</Link>
			</div>
			<div>
				<img className='bg-decoration' src={decoration} alt='vision' />
			</div>
		</div>
	)
}

export default Page404
