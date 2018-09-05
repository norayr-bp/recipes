import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const result =  await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = result.data.recipes;
        } catch(error) {
            alert(error);
        }
    }
}