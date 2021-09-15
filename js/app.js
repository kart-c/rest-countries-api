const regionFilter = document.querySelector('#region-filter');
const optionOne = document.querySelector('.option-one');
const main = document.querySelector('main');
const cardTitles = document.querySelectorAll('.card-title');
const inputSearch = document.querySelector('#search');
const searchIcon = document.querySelector('.search-icon');
const backBtn = document.querySelector('.back-btn');
const toggleDarkMode = document.querySelector('#toggle-dark-mode');
const toggleIcon = document.querySelector('#toggle-icon');
const secondaryElements = document.querySelectorAll('.dark-mode__secondary');
const primaryElements = document.querySelector('.dark-mode__primary');

function fetchDropdownCountries(region) {
	url = fetch(`https://restcountries.eu/rest/v2/region/${region}`)
		.then((response) => response.json())
		.then((data) => dropdownCountriesList(data))
		.catch((e) => console.log(e));
}

function newRenderedList(cards, country) {
	const card = document.createElement('div');
	card.classList.add('card', 'dark-mode__secondary');
	card.setAttribute('id', country.alpha3Code);
	cards.append(card);
	const imageContainer = document.createElement('div');
	imageContainer.classList.add('card-image');
	card.append(imageContainer);
	const countryFlag = document.createElement('img');
	countryFlag.src = country.flag;
	countryFlag.alt = `${country.name} flag`;
	imageContainer.append(countryFlag);
	const cardData = document.createElement('div');
	cardData.classList.add('card-data');
	card.append(cardData);
	const cardTitle = document.createElement('p');
	cardTitle.classList.add('card-title');
	cardTitle.innerText = country.name;
	cardTitle.addEventListener('click', cardTitleClickHandler);
	cardData.append(cardTitle);
	const population = document.createElement('p');
	population.classList.add('card-info');
	population.innerHTML = `Population: <span>${country.population}</span>`;
	cardData.append(population);
	const region = document.createElement('p');
	region.classList.add('card-info');
	region.innerHTML = `Region: <span>${country.region}</span>`;
	cardData.append(region);
	const capital = document.createElement('p');
	capital.classList.add('card-info');
	capital.innerHTML = `Capital: <span>${country.capital}</span>`;
	cardData.append(capital);
}

function dropdownCountriesList(countries) {
	const cards = document.createElement('section');
	cards.classList.add('cards');
	main.append(cards);
	countries.map((country) => {
		newRenderedList(cards, country);
	});
}

function regionFilterDropdownHandler(e) {
	const cards = document.querySelector('.cards');
	inputSearch.value = '';
	cards.remove();
	const regionName = e.target.value;
	optionOne.remove();
	fetchDropdownCountries(regionName);
}

regionFilter.addEventListener('change', regionFilterDropdownHandler);

function backBtnClickHandler() {
	const cards = document.querySelector('.cards');
	const container = document.querySelector('.country-info__container');
	container.remove();
	backBtn.style.display = 'none';
	cards.style.display = 'grid';
	searchIcon.style.display = 'block';
	inputSearch.style.display = 'block';
	regionFilter.style.display = 'block';
}

backBtn.addEventListener('click', backBtnClickHandler);

function fetchCountryInfo(name) {
	const container = document.querySelector('.country-info__container');
	container ? container.remove() : null;
	url = fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
		.then((response) => response.json())
		.then((data) => countryInfo(data[0]))
		.catch((e) => console.log(e));
}

function countryInfo(data) {
	const container = document.createElement('div');
	container.classList.add('country-info__container');
	main.append(container);
	const countryFlag = document.createElement('img');
	countryFlag.src = data.flag;
	countryFlag.alt = `${data.name} flag`;
	countryFlag.classList.add('country-info__flag');
	container.append(countryFlag);
	const infoContainer = document.createElement('div');
	infoContainer.classList.add('country-info__info-container');
	container.append(infoContainer);
	const outerDiv = document.createElement('div');
	outerDiv.classList.add('info-outer-div');
	infoContainer.append(outerDiv);
	const countryName = document.createElement('h2');
	countryName.innerText = data.name;
	outerDiv.append(countryName);
	const infoDiv = document.createElement('div');
	infoDiv.classList.add('info-div');
	outerDiv.append(infoDiv);
	const countryNativeName = document.createElement('p');
	countryNativeName.classList.add('card-info');
	countryNativeName.innerHTML = `Native Name: <span>${data.nativeName}</span>`;
	infoDiv.append(countryNativeName);
	const countryDomain = document.createElement('p');
	countryDomain.classList.add('card-info');
	countryDomain.innerHTML = `Top Level Domain: <span>${data.topLevelDomain[0]}</span>`;
	infoDiv.append(countryDomain);
	const countryPopulation = document.createElement('p');
	countryPopulation.classList.add('card-info');
	countryPopulation.innerHTML = `Population: <span>${data.population}</span>`;
	infoDiv.append(countryPopulation);
	const countryCurrencies = document.createElement('p');
	countryCurrencies.classList.add('card-info');
	countryCurrencies.innerHTML = `Currencies: <span>${data.currencies.map(
		(currency) => currency.name
	)}</span>`;
	infoDiv.append(countryCurrencies);
	const countryRegion = document.createElement('p');
	countryRegion.classList.add('card-info');
	countryRegion.innerHTML = `Region: <span>${data.region}</span>`;
	infoDiv.append(countryRegion);
	const countryLanguages = document.createElement('p');
	countryLanguages.classList.add('card-info');
	countryLanguages.innerHTML = `Languages: <span>${data.languages.map(
		(language) => language.name
	)}</span>`;
	infoDiv.append(countryLanguages);
	const countrySubRegion = document.createElement('p');
	countrySubRegion.classList.add('card-info');
	countrySubRegion.innerHTML = `Sub Region: <span>${data.subregion}</span>`;
	infoDiv.append(countrySubRegion);
	const countryCapital = document.createElement('p');
	countryCapital.classList.add('card-info');
	countryCapital.innerHTML = `Capital: <span>${data.capital}</span>`;
	infoDiv.append(countryCapital);
	data.borders.length !== 0 ? borderCountries(data, infoDiv) : '';
}

function borderCountries(data, infoDiv) {
	const border = document.createElement('p');
	border.innerText = 'Border Countries: ';
	infoDiv.append(border);
	border.classList.add('card-info');
	const borderCountriesBtnContainer = document.createElement('div');
	borderCountriesBtnContainer.classList.add('border-countries__btn-container');
	border.insertAdjacentElement('beforeend', borderCountriesBtnContainer);
	data.borders.map((border) => {
		const borderCountriesBtn = document.createElement('button');
		borderCountriesBtn.classList.add('border-countries__btn');
		if (toggleDarkMode.innerText === 'Light Mode') {
			borderCountriesBtn.classList.add('dark-mode__secondary');
			borderCountriesBtn.classList.remove('light-mode__secondary');
		} else if (toggleDarkMode.innerText === 'Dark Mode') {
			borderCountriesBtn.classList.remove('dark-mode__secondary');
			borderCountriesBtn.classList.add('light-mode__secondary');
		}
		url = fetch(`https://restcountries.eu/rest/v2/alpha/${border}`)
			.then((response) => response.json())
			.then((data) => {
				borderCountriesBtn.innerText = data.name;
				borderCountriesBtnContainer.append(borderCountriesBtn);
				borderCountriesBtn.addEventListener('click', borderBtnClickHandler);
			})
			.catch((e) => console.log(e));
	});
}

function borderBtnClickHandler(e) {
	const borderCountry = e.target.innerText;
	fetchCountryInfo(borderCountry);
}

function cardTitleClickHandler(e) {
	const cards = document.querySelector('.cards');
	cards.style.display = 'none';
	searchIcon.style.display = 'none';
	regionFilter.style.display = 'none';
	inputSearch.style.display = 'none';
	backBtn.style.display = 'block';
	const countryName = e.target.innerText;
	fetchCountryInfo(countryName);
}

cardTitle = Array.from(cardTitles);
cardTitle.map((card) => card.addEventListener('click', cardTitleClickHandler));

function fetchSearchQuery(searchQuery) {
	url = fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
		.then((response) => response.json())
		.then((data) => searchQueryData(data))
		.catch((e) => console.log(e));
}

function searchQueryData(countries) {
	console.log(countries);
	const cards = document.createElement('section');
	main.append(cards);
	cards.classList.add('cards');
	countries.map((country) => {
		newRenderedList(cards, country);
	});
}

function inputSearchHandler(e) {
	const cards = document.querySelector('.cards');
	cards ? cards.remove() : null;
	const searchQuery = e.target.value;
	fetchSearchQuery(searchQuery);
}

inputSearch.addEventListener('change', inputSearchHandler);

//
//
//
//
//

toggleDarkMode.addEventListener('click', toggleDarkModeHandler);

function toggleDarkModeHandler() {
	if (toggleDarkMode.innerText === 'Light Mode') {
		toggleDarkMode.innerText = 'Dark Mode';
		toggleIcon.classList.remove('fas', 'fa-moon');
		toggleIcon.classList.add('far', 'fa-sun');
		inputSearch.id = 'search-light__mode';
	} else {
		toggleDarkMode.innerText = 'Light Mode';
		toggleIcon.classList.remove('far', 'fa-sun');
		toggleIcon.classList.add('fas', 'fa-moon');
		inputSearch.id = 'search';
	}
	primaryElements.classList.toggle('light-mode__primary');

	for (secondaryElement of secondaryElements) {
		secondaryElement.classList.toggle('light-mode__secondary');
	}
}
