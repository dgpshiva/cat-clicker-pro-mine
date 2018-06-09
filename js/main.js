/* Model */

var model = {
    currentCat: null,

    cats: [
        {
            name: "Cat 1",
            imgSrc: "img/1.jpg",
            clickCount: 0
        },
        {
            name: "Cat 2",
            imgSrc: "img/2.jpg",
            clickCount: 0
        },
        {
            name: "Cat 3",
            imgSrc: "img/3.jpg",
            clickCount: 0
        }
    ]
};


/* Octopus */
var octopus = {
    init: function() {
        model.currentCat = model.cats[0];
        catView.init();
        catListView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    getCats: function() {
        return model.cats;
    },

    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};


/* View */
var catView = {
    init: function() {
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImgElem = document.getElementById('cat-img');

        this.catImgElem.addEventListener('click', function() {
            octopus.incrementCounter();
        });

        this.catClickCountElem = document.getElementById('click-count');
        this.render();
    },

    render: function() {
        currentCat = octopus.getCurrentCat();
        this.catNameElem.textContent = currentCat.name;
        this.catImgElem.src = currentCat.imgSrc;
        this.catClickCountElem.textContent = currentCat.clickCount;
    }
};

var catListView = {
    init: function() {
        this.catListElem = document.getElementById('cat-list');
        this.render();
    },

    render: function() {
        this.catListElem.innerHTML = '';

        var cats = octopus.getCats();

        var i, cat, elem;
        for (i=0; i<cats.length; i++)
        {
            cat = cats[i];
            elem = document.createElement('li');
            elem.textContent = cat.name;

            elem.addEventListener('click', function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                }
            }(cat));

            this.catListElem.appendChild(elem);
        }
    }
};

octopus.init();