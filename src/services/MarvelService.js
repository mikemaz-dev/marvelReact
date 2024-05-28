class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/'
	_apiKey = 'apikey=893b0425d08ebde4c13e4d6bb54c5e16'
	getResources = async url => {
		let res = await fetch(url)
		if (!res.ok) {
			throw new Error(`Could not fetch ${url} status ${res.status}`)
		}

		return await res.json()
	}

	getAllCharacters = async () => {
		const res = await this.getResources(
			`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
		)
		return res.data.results.map(this._transformCharacter)
	}

	getCharacter = async id => {
		const res = await this.getResources(
			`${this._apiBase}characters/${id}?${this._apiKey}`
		)
		return this._transformCharacter(res.data.results[0])
	}

	_transformCharacter = char => {
		return {
			id: char.id,
			name: char.name,
			description: char.description,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}
}

export default MarvelService
