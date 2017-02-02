"use strict";
var appVars = {
    title: "Das ist mein Titel",
    content: "Das ist mein Content",
    animals: [
        { text: "Hund", quantity: 1 },
        { text: "Katze", quantity: 2 },
        { text: "Maus", quantity: 3 },
    ],
    currItem: "",
    nachricht: "asdasd"
};
var appMethods = {
    addItem() {
        if (appVars.currItem != "") {
            appVars.animals.push({
                text: appVars.currItem,
                quantity: 1
            });
            appVars.currItem = "";
        }
    }
};
var appComputed = {
    amountAnimals() {
        var sumAnimals = 0;
        appVars.animals.forEach(element => {
            sumAnimals += element.quantity;
        });
        return sumAnimals;
    }
};
var appFilters = {
    capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    },
    undercase(value) {
        return value.toLowerCase();
    }
};
var appWatchers = {
    animals() {
        alert('animals has changed');
    }
};
document.addEventListener("DOMContentLoaded", () => {
    new Vue({
        el: "#app",
        data: appVars,
        methods: appMethods,
        computed: appComputed,
        filters: appFilters,
        watch: appWatchers
    });
});