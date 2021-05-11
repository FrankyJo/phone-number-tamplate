import {allCountries} from "./data";

export class Select {
    constructor(selector, options) {
        this.element = document.querySelector(selector);
        this.allCountries = allCountries;

        this.init();
    }

    init() {
        this.render();
    }


    render() {
        const wrapper = document.createElement('div');

        wrapper.setAttribute('class', `phone-number__wrap`);

        this.element.parentNode.insertBefore(wrapper, this.element);
        wrapper.appendChild(this.element);
        wrapper.appendChild(this.generateList());
    }

    generateList() {
        const ul = document.createElement('ul');
        const countries = this.allCountries;

        ul.setAttribute('class', 'phone-number__list');

        for(let idx = 0; idx < countries.length; idx++ ){
            let li = document.createElement('li');
            li.innerText = countries[idx].name;
            li.setAttribute('class', 'phone-number__item')
            li.setAttribute('data-iso-code', countries[idx].iso)
            li.setAttribute('data-number-code', countries[idx].countryCodeNum)

            ul.appendChild(li);
        }

        return ul;
    }


    open() {

    }

    close() {

    }
}