import { useState } from 'react'
import { Helmet } from 'react-helmet'

import decoration from '../../resources/img/vision.png'
import CharInfo from '../charInfo/CharInfo'
import CharList from '../charList/CharList'
import CharSearchForm from '../charSearchForm/CharSearchForm'
import RandomChar from '../randomChar/RandomChar'

import ErrorBoundary from '../errorBoundary/ErrorBoundary'

const MainPage = () => {
	const [selectedChar, setChar] = useState(null)

	const onCharSelected = id => {
		setChar(id)
	}
	return (
		<>
			<Helmet>
				<meta name='description' content='Marvel information portal' />
				<title>Marvel info</title>
			</Helmet>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className='char__content'>
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected} />
				</ErrorBoundary>
				<div>
					<ErrorBoundary>
						<CharInfo charId={selectedChar} />
					</ErrorBoundary>
					<ErrorBoundary>
						<CharSearchForm />
					</ErrorBoundary>
				</div>
			</div>
			<img className='bg-decoration' src={decoration} alt='vision' />
		</>
	)
}

export default MainPage
