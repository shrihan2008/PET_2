class Food{

    foodStock;
    lastFed;

    constructor(foodStock, lastFed, bottleimage){
        var abc, refval;
        this.image=bottleimage;

        this.foodStock=foodStock;
        this.lastFed=lastFed;
        
    }

    getFoodStock(){ 
        return this.foodStock;
    }

    getLastFed(){
        return this.lastFed;
    }


    updateFoodStock(newStock){
        this.foodStock = newStock;

    }

    deductFood(){

    }

    display(){
        var x=50,y=400;
        push();
        imageMode(CENTER);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%5==0){
                    x=50
                    y+=50
                }
                image(this.image,x,y,50,50)
                x=x+30
            }
        }
        pop();

    }
}

