import { useState, useEffect } from 'react'
import useMarvelService from '../../services/MarvelService'
import { Link } from 'react-router-dom'

import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/spinner'
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss'

const CharInfo = props => {
	const [char, setChar] = useState(null)

	const { loading, error, getCharacter } = useMarvelService()

	useEffect(() => {
		updateChar()
	}, [props.charId])

	const updateChar = () => {
		const { charId } = props
		if (!charId) {
			return
		}

		getCharacter(charId).then(onCharLoaded)
	}

	const onCharLoaded = char => {
		setChar(char)
	}

	const skeleton = char || loading || error ? null : <Skeleton />

	const errorMessage = error ? <ErrorMessage /> : null
	const spinner = loading ? <Spinner /> : null
	const content = !(loading || error || !char) ? <View char={char} /> : null
	return (
		<div className='char__info'>
			{skeleton}
			{spinner}
			{errorMessage}
			{content}
		</div>
	)
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char

	let imgStyle = { 'object-fit': 'cover' }
	if (
		thumbnail ===
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
	) {
		imgStyle = { 'object-fit': 'contain' }
	}

	return (
		<>
			<div className='char__basics'>
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className='char__info-name'>{name}</div>
					<div className='char__btns'>
						<a href={homepage} className='button button__main'>
							<div className='inner'>homepage</div>
						</a>
						<a href={wiki} className='button button__secondary'>
							<div className='inner'>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div classNam className='char__descr'>
				{description === ''
					? '📌 no description for this character'
					: description}
			</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>
				{comics.length > 0 ? null : 'There is no comics for this character'}
				{comics.map((item, i) => {
					if (i >= 9) return null
					return (
						<Link to={`/comics/${i}`} key={i} className='char__comics-item'>
							{item.name}
						</Link>
					)
				})}
			</ul>
		</>
	)
}

export default CharInfo
