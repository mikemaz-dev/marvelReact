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

	getAllCharacters = () => {
		return this.getResources(
			`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
		)
	}

	getCharacter = id => {
		return this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`)
	}
}

export default MarvelService
