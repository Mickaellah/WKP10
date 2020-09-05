import faker from 'faker';

const tbody = document.querySelector('tbody');

let persons = Array.from({ length: 10 }, () => {
	return {
		id: faker.random.uuid(),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		jobTitle: faker.name.jobTitle(),
		jobArea: faker.name.jobArea(),
		phone: faker.phone.phoneNumber(),
		picture: faker.image.avatar(100, 100),
	};
});

const displayList = data => {
	tbody.innerHTML = data
		.map(
			(person, index) => `
    <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''}">
        <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td>${person.lastName}</td>
        <td>${person.firstName}</td>
        <td>${person.jobTitle}</td>
        <td>${person.jobArea}</td>
        <td>${person.phone}</td>
        <td>
            <button class="edit">
                <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            <button class="delete">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            </td>
    </tr>
`
		)
		.join('');
};

function wait(ms = 0) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
	popup.classList.remove('open');
	await wait(1000);
	popup.remove();
	popup = null;
}


const editPartner = (id) => {
	// code edit function here
		editPartnerPopup(id);
};

const editPartnerPopup = (e) => {
	// create edit popup here
	return new Promise (async function(
		resolve) {
		const form = document.createElement('form');
		form.classList.add('popup');
		const html = `
			<div class="container">
				<fieldset>
					<label for="last-name">Last name</labe>
					<input type="text" name="last-name" id="last-name" value="${faker.name.lastName()}"></input>
				</fieldset>
				<fieldset>
					<label for="first-name">First name</labe>
					<input type="text" name="first-name" id="first-name" value="${faker.name.firstName()}"></input>
				</fieldset>
				<fieldset>
					<label for="job-title">Job title</labe>
					<input type="text" name="job-title" id="job-title" value="${faker.name.jobTitle()}"></input>
				</fieldset>
				<fieldset>
					<label for="job-area">Job area</labe>
					<input type="text" name="job-area" id="job-area" value="${faker.name.jobArea()}"></input>
				</fieldset>
				<fieldset>
					<label for="phone-number">Phone number</labe>
					<input type="phone" name="phone-number" id="phone-number" value="${faker.phone.phoneNumber()}"></input>
				</fieldset>

				<button class="save">Save</buton>
			</div>
		`;
		form.innerHTML = html;
		// console.log(form);

		if (e) {
			const cancelButton = document.createElement('button');
			cancelButton.classList.add('cancel');
			cancelButton.type = "button";
			cancelButton.textContent = "Cancel";
			form.appendChild(cancelButton);

			cancelButton.addEventListener('click', () => {
				resolve(null);
				destroyPopup(form);

			}, { once: true });
		}
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			resolve(e.target.input);
			destroyPopup(form);
		}, { once: true });

		document.body.appendChild(form);
		await wait(100);
		form.classList.add('open');

	});

};



const deletePartner = (id) => {
	// code delete function here
	deleteDeletePopup(id);
};

const deleteDeletePopup = (e) => {
	// create confirmation popup here
	return new Promise(async function(resolve){
		const div = document.createElement("div");
		div.classList.add('deletion');
		const html = `
			<p>Are you sure you want to delete ${faker.name.lastName()}?</p>
			<div>
				<button class="yes">Yes</button>
				<button class="no">No</button>
			</div>
		`;
		div.innerHTML = html;
		document.body.appendChild(div);
	});

};

deletePartner();

displayList(persons);


// const editButton = document.querySelector('button.edit');
// editButton.addEventListener('click', editPartner);
tbody.addEventListener('click', editPartner);

const deleteButton = document.querySelector('button.delete');
deleteButton.addEventListener('click', deletePartner);