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
    ],

    showAdminArea: false
};


/* Octopus */
var octopus = {
    init: function() {
        model.currentCat = model.cats[0];
        catView.init();
        catListView.init();
        adminAreaView.init();
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
    },

    setIfAdminAreaShow: function(showAdminArea) {
        model.showAdminArea = showAdminArea;
    },

    getIfAdminAreaShow: function() {
        return model.showAdminArea;
    },

    updateData: function(newName, newImgSrc, newClickCount) {
        var cat = model.currentCat;
        var currentCatPosition = model.cats.indexOf(cat);
        cat.name = newName;
        cat.imgSrc = newImgSrc;
        cat.clickCount = newClickCount;
        model.cats[currentCatPosition] = cat;
        model.setIfAdminAreaShow = false;
        adminAreaView.render();
        catListView.render();
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
                    adminAreaView.render();
                }
            }(cat));

            this.catListElem.appendChild(elem);
        }
    }
};

var adminAreaView = {
    init: function() {
        this.adminButtonElem = document.getElementById('admin-button');
        this.adminButtonElem.addEventListener('click', function() {
            octopus.setIfAdminAreaShow(true);
            adminAreaView.render();
        });

        this.adminAreaElem = document.getElementById('admin-area');

        // this.saveFormElem = document.getElementById('save-form');
        this.saveButton = document.getElementById('save-button');
        this.saveButton.addEventListener('click', function() {
            octopus.updateData(document.getElementById('cat-name-input').value,
                                document.getElementById('cat-img-url-input').value,
                                document.getElementById('click-count-input').value);
        });

        // this.saveFormElem.addEventListener('submit', function() {
        //     octopus.updateData(document.getElementById('cat-name-input').value,
        //                         document.getElementById('cat-img-url-input').value,
        //                         document.getElementById('click-count-input').value);
        // });

        this.catNameInputElem = document.getElementById('cat-name-input');
        this.catImgUrlInputElem = document.getElementById('cat-img-url-input');
        this.catClickCountInputElem = document.getElementById('click-count-input');

        this.cancelButtonElem = document.getElementById('cancel-button');
        this.cancelButtonElem.addEventListener('click', function() {
            octopus.setIfAdminAreaShow(false);
            adminAreaView.render();
        })

        this.render();
    },

    render: function() {
        var currentCat = octopus.getCurrentCat();
        this.catNameInputElem.value = currentCat.name;
        this.catImgUrlInputElem.value = currentCat.imgSrc;
        this.catClickCountInputElem.value = currentCat.clickCount;

        if (octopus.getIfAdminAreaShow())
        {
            this.adminAreaElem.style.display = "block";
        }
        else {
            this.adminAreaElem.style.display = "none";
        }
    }
};

octopus.init();
