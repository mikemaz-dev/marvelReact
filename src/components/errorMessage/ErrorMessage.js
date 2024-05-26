import img from './error.gif'

const ErrorMessage = () => {
	return (
		<img
			style={{
				display: 'block',
				width: '250px',
				objectFit: 'contain',
				margin: '0 auto',
			}}
			src={img}
			alt='error message'
		/>
	)
}

export default ErrorMessage
