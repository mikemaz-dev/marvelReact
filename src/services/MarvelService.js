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
		return this._transformCharacter(res.data.results)
	}

	_transformCharacter = char => {
		return {
			name: char[0].name,
			description: char[0].description,
			thumbnail: char[0].thumbnail.path + '.' + char[0].thumbnail.extension,
			homepage: char[0].url,
			wiki: char[0].urls[1].url,
		}
	}
}

export default MarvelService
