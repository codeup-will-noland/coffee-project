(function () {
    "use strict"

//creates a coffee object, pushes it into the coffees array of object, updates the localStorage with the new coffees array.
    function createCoffee(inputName, roastType, inputRating) {
        if (roastType !== "Roast" && inputRating !== "Rating") {
            var newCoffee = {id: coffees.length + 1, name: inputName, roast: roastType, rating: inputRating};
            coffees.push(newCoffee);
            localStorage.setItem("coffees", JSON.stringify(coffees));
        }
    }

//removes a coffee object from the coffees array of objects, updates the localStorage with the new coffees array.
    function removeCoffee(inputName) {
        coffees.forEach(coffee => {
            if (coffee.name.toLowerCase() === inputName.toLowerCase()) {
                coffees.splice(coffees.indexOf(coffee), 1);
            };
            localStorage.setItem("coffees", JSON.stringify(coffees));
        });
    }

//receives the rating information stored in the coffee object and uses that number to generate the appropriate number of font awesome stars. appends them to the coffee html
    function buildStars(inputCoffee) {
        var html = '';
        for (var i = 0; i < inputCoffee.rating; i++) {
            html += '<i class="fas fa-star fa-xs" style="color: darkgoldenrod"></i>';
        }
        return html;
    }

//takes info from the coffee object. renders the info to html by wrapping it in a div and a template of tags.
    function renderCoffee(coffee) {
        var html = '<div class="coffee">';
        html += '<h4>' + coffee.name + ' ' + buildStars(coffee) + '</h4>' + '<p>' + coffee.roast + '</p>';
        html += '</div>';
        return html;
    }

//uses renderCoffee function to store the coffee divs in one var. conditional logic sorts the coffees array prior to render.
    function renderCoffees(coffees) {
        var html = '';
        if (selectedSort === "ID") {
            coffees.sort((a, b) => {
                return parseFloat(a.id) - parseFloat(b.id);
            });
        } else if (selectedSort === "Rating") {
            coffees.sort((a, b) => {
                return parseFloat(b.rating) - parseFloat(a.rating);
            });
        } else if (selectedSort === "Alphabetical") {
            coffees.sort((a, b) => {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        }
        coffees.forEach(coffee => {
            html += renderCoffee(coffee)
        });
        return html;
    };

//used to search coffee based on roast and 'keyup' input
    function updateCoffees() {
        var filteredCoffees = [];
        coffees.forEach(function (coffee) {
            if (coffee.roast === selectedRoast || selectedRoast === "All") {
                if (coffee.name.toLowerCase().includes(selectedCoffee.toLowerCase())) {
                    filteredCoffees.push(coffee);
                }
            }
        });
        coffeeContainer.innerHTML = renderCoffees(filteredCoffees);
    }

//original coffees array of objs. after first run use 'localStorage.clear()' in terminal to reset to this.
    var coffees = [
        {id: 1, name: 'Light City', roast: 'Light', rating: 2},
        {id: 2, name: 'Half City', roast: 'Light', rating: 4},
        {id: 3, name: 'Cinnamon', roast: 'Light', rating: 4},
        {id: 4, name: 'City', roast: 'Medium', rating: 1},
        {id: 5, name: 'American', roast: 'Medium', rating: 1},
        {id: 6, name: 'Breakfast', roast: 'Medium', rating: 3},
        {id: 7, name: 'High', roast: 'Dark', rating: 1},
        {id: 8, name: 'Continental', roast: 'Dark', rating: 3},
        {id: 9, name: 'New Orleans', roast: 'Dark', rating: 5},
        {id: 10, name: 'European', roast: 'Dark', rating: 2},
        {id: 11, name: 'Espresso', roast: 'Dark', rating: 1},
        {id: 12, name: 'Viennese', roast: 'Dark', rating: 4},
        {id: 13, name: 'Italian', roast: 'Dark', rating: 4},
        {id: 14, name: 'French', roast: 'Dark', rating: 2}
    ];
//where the coffee divs are placed
    var coffeeContainer = document.getElementById('coffee-container');
//
//updates based on selecting a different value for roast
    var selectedRoast = 'All';
    var roastSelection = document.querySelector('#roast-selection');
    roastSelection.addEventListener('change', function () {
        selectedRoast = roastSelection.value;
        updateCoffees();
    });
//
//updates based on selecting a different value for sort
    var selectedSort = 'ID';
    var sortSelection = document.querySelector('#sort-selection');
    sortSelection.addEventListener('change', function () {
        selectedSort = sortSelection.value;
        updateCoffees();
    });
//
//updates based on 'keyup' in the search box.
    var selectedCoffee = '';
    var searchCoffee = document.getElementById("search-coffee");
    searchCoffee.addEventListener('keyup', function () {
        selectedCoffee = searchCoffee.value;
        updateCoffees();
    });
//when the add coffee button is clicked the text input is checked to make sure data is in the payload. if true creation of coffee functions are called
    var addCoffeeButton = document.querySelector('#add-coffee-button')
    addCoffeeButton.addEventListener('click', function () {
        var coffeeRoastSelection = document.getElementById('coffee-roast-selection');
        var addCoffeeNameInput = document.getElementById('add-coffee-name-input');
        var coffeeRatingSelection = document.getElementById("coffee-rating-selection");
        if (addCoffeeNameInput.value !== '') {
            // console.log(createCoffee(addCoffeeNameInput.value, coffeeRoastSelection.value));
            createCoffee(addCoffeeNameInput.value, coffeeRoastSelection.value, coffeeRatingSelection.value);
            updateCoffees();
        }
        addCoffeeNameInput.value = '';
    });
//when the add coffee button is clicked the text input is checked to make sure data is in the payload. if true creation of coffee functions are called
    var removeCoffeeButton = document.querySelector('#remove-coffee-button')
    removeCoffeeButton.addEventListener('click', function () {
        // var coffeeRoastSelection = document.getElementById('coffee-roast-selection');
        var removeCoffeeNameInput = document.getElementById('remove-coffee-name-input');
        if (removeCoffeeNameInput.value !== '') {
            // console.log(createCoffee(addCoffeeNameInput.value, coffeeRoastSelection.value));
            removeCoffee(removeCoffeeNameInput.value)
            updateCoffees();
        }
        removeCoffeeNameInput.value = '';
    });
//checks to see if data is in localStorage. if true loads the appropriate array and renders to html. if false loads 'base' array.
    if (localStorage.getItem("coffees") !== null) {
        coffees = localStorage.getItem("coffees");
        coffees = JSON.parse(coffees);
        coffeeContainer.innerHTML = renderCoffees(coffees);
    } else {
        coffeeContainer.innerHTML = renderCoffees(coffees);
    }

})();