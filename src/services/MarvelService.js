import { useHttp } from '../hooks/http.hooks'

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp()

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
	const _apiKey = 'apikey=893b0425d08ebde4c13e4d6bb54c5e16'
	const _baseOffset = 210

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		)
		return res.data.results.map(_transformCharacter)
	}

	const getCharacter = async id => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
		return _transformCharacter(res.data.results[0])
	}

	const _transformCharacter = char => {
		return {
			id: char.id,
			name: char.name,
			description: char.description,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		}
	}

	return {
		loading,
		error,
		getAllCharacters,
		getCharacter,
		clearError
	}
}

export default useMarvelService
