import axios from 'axios';

export default class Search {
    constructor (query) {
        this.query = query;
    }

    async getResults() {
        const url = "https://www.food2fork.com/api/search";
        const key = '090889bd6c48f394d47f12858fab964c';

        try {
            const res = await axios(`${url}?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}