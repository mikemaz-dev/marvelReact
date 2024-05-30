import { useState, useEffect } from 'react'
import useMarvelService from '../../services/MarvelService'

import Spinner from '../spinner/spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './randomChar.scss'

const RandomChar = () => {
	const [char, setChar] = useState([])
	const { loading, error, getCharacter, clearError } = useMarvelService()

	useEffect(() => {
		updateChar()
		const timerId = setInterval(updateChar, 60000)

		return () => {
			clearInterval(timerId)
		}
	}, [])

	const onCharLoaded = char => {
		setChar(char)
	}

	const updateChar = () => {
		clearError()
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
		getCharacter(id).then(onCharLoaded)
	}

	const errorMessage = error ? <ErrorMessage /> : null
	const spinner = loading ? <Spinner /> : null
	const content = !(loading || error) ? <View char={char} /> : null

	return (
		<div className='randomchar'>
			{errorMessage}
			{spinner}
			{content}
			<div className='randomchar__static'>
				<p className='randomchar__title'>
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className='randomchar__title'>Or choose another one</p>
				<button onClick={updateChar} className='button button__main'>
					<div className='inner'>try it</div>
				</button>
			</div>
		</div>
	)
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char
	let thumbnailClass = 'randomchar__img'
	if (
		thumbnail ===
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
	) {
		thumbnailClass += '-notfound'
	}
	return (
		<div className='randomchar__block'>
			<img src={thumbnail} alt='Random character' className={thumbnailClass} />
			<div className='randomchar__info'>
				<p className='randomchar__name'>{name}</p>
				<p className='randomchar__descr'>
					{description === ''
						? '📌 no description for this character'
						: description}
				</p>
				<div className='randomchar__btns'>
					<a href={homepage} className='button button__main'>
						<div className='inner'>homepage</div>
					</a>
					<a href={wiki} className='button button__secondary'>
						<div className='inner'>Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar
