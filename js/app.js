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
	url = fetch(`https://restcountries.com/v3/region/${region}`)
		.then((response) => response.json())
		.then((data) => dropdownCountriesList(data))
		.catch((e) => console.log(e));
}

function newRenderedList(cards, country, countryName, flag) {
	const card = document.createElement('div');
	card.classList.add('card', 'dark-mode__secondary');
	card.setAttribute('id', country.alpha3Code);
	cards.append(card);
	const imageContainer = document.createElement('div');
	imageContainer.classList.add('card-image');
	card.append(imageContainer);
	const countryFlag = document.createElement('img');
	countryFlag.src = flag;
	countryFlag.alt = `${country.name} flag`;
	imageContainer.append(countryFlag);
	const cardData = document.createElement('div');
	cardData.classList.add('card-data');
	card.append(cardData);
	const cardTitle = document.createElement('p');
	cardTitle.classList.add('card-title');
	cardTitle.innerText = countryName;
	cardTitle.addEventListener('click', cardTitleClickHandler);
	cardData.append(cardTitle);
	const region = document.createElement('p');
	region.classList.add('card-info');
	region.innerHTML = `Region: <span>${country.region}</span>`;
	cardData.append(region);
	const capital = document.createElement('p');
	capital.classList.add('card-info');
	capital.innerHTML = `Capital: <span>${country.capital}</span>`;
	cardData.append(capital);
	toggleColor(card);
}

function toggleColor(card) {
	if (toggleDarkMode.innerText === 'Light Mode') {
		card.classList.remove('light-mode__secondary');
		card.classList.add('dark-mode__secondary');
	} else {
		card.classList.remove('dark-mode__secondary');
		card.classList.add('light-mode__secondary');
	}
}

function dropdownCountriesList(countries) {
	const cards = document.createElement('section');
	cards.classList.add('cards');
	main.append(cards);
	countries.map((country) => {
		const countryName = country.name.official;
		const flag = country.flags[1];
		newRenderedList(cards, country, countryName, flag);
	});
}

function regionFilterDropdownHandler(e) {
	const error = document.querySelector('.error-msg__container');
	error ? error.remove() : null;
	inputSearch.value = '';
	const cards = document.querySelector('.cards');
	cards ? cards.remove() : null;
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
	url = fetch(`https://restcountries.com/v2/name/${name}?fullText=true`)
		.then((response) => response.json())
		.then((data) => {
			countryInfo(data[0]);
		})
		.catch((e) => console.log(e));
}

function countryInfo(data) {
	const container = document.createElement('div');
	container.classList.add('country-info__container');
	main.append(container);
	const countryFlag = document.createElement('img');
	countryFlag.src = data.flags.svg;
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
	const countryCapital = document.createElement('p');
	countryCapital.classList.add('card-info');
	countryCapital.innerHTML = `Capital: <span>${data.capital}</span>`;
	infoDiv.append(countryCapital);
	data.borders.length !== 0 ? borderCountries(data, infoDiv) : '';
}

function borderCountries(data, infoDiv) {
	const border = document.createElement('p');
	border.innerText = 'Border Countries : ';
	infoDiv.append(border);
	border.classList.add('card-info');
	const borderCountriesBtnContainer = document.createElement('div');
	borderCountriesBtnContainer.classList.add('border-countries__btn-container');
	border.insertAdjacentElement('beforeend', borderCountriesBtnContainer);
	data.borders.map((border) => {
		const borderCountriesBtn = document.createElement('button');
		borderCountriesBtn.classList.add('border-countries__btn', 'dark-mode__secondary');
		if (toggleDarkMode.innerText === 'Light Mode') {
			borderCountriesBtn.classList.add('dark-mode__secondary');
			borderCountriesBtn.classList.remove('light-mode__secondary');
		} else if (toggleDarkMode.innerText === 'Dark Mode') {
			borderCountriesBtn.classList.remove('dark-mode__secondary');
			borderCountriesBtn.classList.add('light-mode__secondary');
		}
		url = fetch(`https://restcountries.com/v2/alpha/${border}`)
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

function inputSearchError(input) {
	const errorMsgContainer = document.createElement('div');
	errorMsgContainer.classList.add('error-msg__container');
	main.append(errorMsgContainer);
	const errorMsg = document.createElement('h2');
	errorMsg.innerHTML = `Error! '${input}' does not exist! <i class="far fa-frown"></i>`;
	errorMsgContainer.append(errorMsg);

	inputSearch.value = '';
}

function fetchSearchQuery(searchQuery) {
	url = fetch(`https://restcountries.com/v2/name/${searchQuery}`)
		.then((response) => response.json())
		.then((data) => searchQueryData(data))
		.catch((e) => {
			console.log(e);
			inputSearchError(searchQuery);
		});
}

function searchQueryData(countries) {
	const cards = document.createElement('section');
	main.append(cards);
	cards.classList.add('cards');
	countries.map((country) => {
		const countryName = country.name;
		const flag = country.flags.svg;
		newRenderedList(cards, country, countryName, flag);
	});
}

function inputSearchHandler(e) {
	const cards = document.querySelector('.cards');
	cards ? cards.remove() : null;
	const error = document.querySelector('.error-msg__container');
	error ? error.remove() : null;
	const searchQuery = e.target.value;
	fetchSearchQuery(searchQuery);
	regionFilter.appendChild(optionOne);
	regionFilter.value = 'Filter by Region';
}

inputSearch.addEventListener('change', inputSearchHandler);

toggleDarkMode.addEventListener('click', toggleDarkModeHandler);

function toggleDarkModeHandler() {
	const cards = Array.from(document.querySelectorAll('.card'));
	const borderBtns = Array.from(document.querySelectorAll('.border-countries__btn'));
	if (toggleDarkMode.innerText === 'Light Mode') {
		toggleDarkMode.innerText = 'Dark Mode';
		toggleIcon.classList.remove('fas', 'fa-moon');
		toggleIcon.classList.add('far', 'fa-sun');
		inputSearch.id = 'search-light__mode';
		primaryElements.classList.remove('dark-mode__primary');
		primaryElements.classList.add('light-mode__primary');
		for (secondaryElement of secondaryElements) {
			secondaryElement.classList.remove('dark-mode__secondary');
			secondaryElement.classList.add('light-mode__secondary');
		}
		for (card of cards) {
			card.classList.remove('dark-mode__secondary');
			card.classList.add('light-mode__secondary');
		}
		for (borderBtn of borderBtns) {
			borderBtn.classList.remove('dark-mode__secondary');
			borderBtn.classList.add('light-mode__secondary');
		}
	} else {
		toggleDarkMode.innerText = 'Light Mode';
		toggleIcon.classList.remove('far', 'fa-sun');
		toggleIcon.classList.add('fas', 'fa-moon');
		inputSearch.id = 'search';
		primaryElements.classList.remove('light-mode__primary');
		primaryElements.classList.add('dark-mode__primary');
		for (secondaryElement of secondaryElements) {
			secondaryElement.classList.remove('light-mode__secondary');
			secondaryElement.classList.add('dark-mode__secondary');
		}
		for (card of cards) {
			card.classList.remove('light-mode__secondary');
			card.classList.add('dark-mode__secondary');
		}
		for (borderBtn of borderBtns) {
			borderBtn.classList.remove('light-mode__secondary');
			borderBtn.classList.add('dark-mode__secondary');
		}
	}
}
