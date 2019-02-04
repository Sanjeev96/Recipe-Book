import { Ingredients } from './ingredients';

export class Recipe {

    // public name: string;
    // public description: string;
    // public imagePath: string;


    // shorter method created same effect
    constructor( public name: string, public desc: string, public imagePath: string, public ingredients: Ingredients[]) {

        // this.name = name;
        // this.description = desc;
        // this.imagePath = imagePath;

    }
}