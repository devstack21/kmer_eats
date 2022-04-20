
export default class CaddieOwn  {

    protected tabFood : Array<String>

    constructor(){
        this.tabFood = []
    }

    // Add element in caddie

    public addFoodCaddie (foodId : String) : void {
        this.tabFood.push(foodId)
    }

    // remove element in caddie

    public removeFoodCaddie(foodId : String) : void {
        let index = this.tabFood.indexOf(foodId)
        delete this.tabFood[index]
    }
}