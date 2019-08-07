import axios from 'axios';
import {key} from './../config';

export default class Search {
    constructor (query) {
        this.query = query;
    }

    async getResults() {
        const url = "https://www.food2fork.com/api/search";

        try {
            const res = await axios(`${url}?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}