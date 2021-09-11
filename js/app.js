const regionFilter = document.querySelector('#region-filter');
const optionOne = document.querySelector('.option-one');
const main = document.querySelector('main');

function fetchRegionCountries(region) {
	url = fetch(`https://restcountries.eu/rest/v2/region/${region}`)
		.then((response) => response.json())
		.then((data) => regionFilterCountries(data))
		.catch((e) => console.log(e));
}

function regionFilterCountries(countries) {
	console.log(countries);
	const cards = document.createElement('section');
	cards.classList.add('cards');
	main.append(cards);
	countries.map((country) => {
		const card = document.createElement('div');
		card.classList.add('card');
		cards.append(card);
		const imageContainer = document.createElement('div');
		imageContainer.classList.add('card-image');
		card.append(imageContainer);
		const countryFlag = document.createElement('img');
		countryFlag.src = country.flag;
		imageContainer.append(countryFlag);
		const cardData = document.createElement('div');
		cardData.classList.add('card-data');
		card.append(cardData);
		const cardTitle = document.createElement('p');
		cardTitle.classList.add('card-title');
		cardTitle.innerText = country.name;
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
		capital.innerHTML = `Region: <span>${country.capital}</span>`;
		cardData.append(capital);
	});
}

function regionFilterDropdownHandler(e) {
	const cards = document.querySelector('.cards');
	cards.remove();
	const regionName = e.target.value;
	optionOne.remove();
	fetchRegionCountries(regionName);
}

regionFilter.addEventListener('change', regionFilterDropdownHandler);
