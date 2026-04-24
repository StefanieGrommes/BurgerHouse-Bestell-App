function init(){
    renderCategory();
}

let basket = [];

function renderCategory() {
    let categoryContent = document.getElementById("category_container");
    categoryContent.innerHTML = "";

    for (let indexCategory = 0; indexCategory < categoryDetails.length; indexCategory++) {
        const category = categoryDetails[indexCategory];
        showCategory(indexCategory,categoryContent);
        };


function showCategory(indexCategory,categoryContent){
    categoryContent.innerHTML +=
    `<div class="category_orange_bg">
            <div class="main_dishes_category_container "
                    <div class="category_img_container"><img src="${categoryDetails[indexCategory].source}" alt="${categoryDetails[indexCategory].title}" id="category_img"></div>
                    <div id="main_dishes_category"><h2>${categoryDetails[indexCategory].title}</h2></div>  
            </div>
    </div>
    <div class="main_dishes" id="main_dish_${indexCategory}"></div>
    `         

    renderMealComponents(indexCategory);
}
}

function renderMealComponents(indexCategory){
    let mainDish = document.getElementById(`main_dish_${indexCategory}`);
    mainDish.innerHTML = "";
    let meals =  categoryDetails[indexCategory].meals;
        for (let indexMealComponent = 0; indexMealComponent < meals.length; indexMealComponent++) {
        let meal = categoryDetails[indexCategory].meals[indexMealComponent];
        let price = meal.price;
        let priceInEuro = setCurrency(price);
        mainDish.innerHTML += showMealComponents(indexMealComponent,indexCategory,priceInEuro);
        }
    
}

function addToBasket(indexMealComponent,indexCategory){
    let meal = categoryDetails[indexCategory].meals[indexMealComponent];
    meal.amount++;
        if (!basket.includes(meal)) {
            basket.push(meal);  
        }
        renderBasket();
}


function calculateTotalDishPrice(basketdish){
 totalDishPrice = (basketdish.price) * basketdish.amount;
 return totalDishPrice;

}

function setCurrency(value){ 
 value = value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
return value
}

function calculateSubtotal(){
    let subtotal = 0;
    for (let i = 0; i < basket.length; i++) {
        let meal = basket[i];
        let sumOneDish = meal.price * meal.amount;
        subtotal = subtotal + sumOneDish;
        }
        return subtotal;
}

function getDeliveryFee(subtotal){
    let deliveryFee = 0;
    if (subtotal < 50 && subtotal!=0 ){
        deliveryFee = 4.99; 
    } 

    return deliveryFee;
}

function renderCost(){
    let subtotal = calculateSubtotal();
    let deliveryFee = getDeliveryFee(subtotal);
    let finalSum = subtotal + deliveryFee;

    let subtotalInEur = setCurrency(subtotal);
    let finalSumInEur = setCurrency(finalSum);
    let deliveryFeeInEur = setCurrency(deliveryFee);

    return showCosts(subtotalInEur,finalSumInEur,deliveryFeeInEur);
}

function delete_item(indexBasket){
    console.log("index beim click", indexBasket);
    let basketDish = basket[indexBasket];

    basketDish.amount--;

    if (basketDish.amount < 1) {
        basket.splice(indexBasket, 1);
    }

    renderBasket();
}
    
function renderBasket(){
    
    let basketContent = document.getElementById("basket_content");
    basketContent.innerHTML = "";

    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
            let basketDish = basket[indexBasket]; 

            let totalDishPrice = calculateTotalDishPrice(basketDish);
            let dishSumInEuro = setCurrency(totalDishPrice);
            basketContent.innerHTML += showFilledBasket(basketDish,dishSumInEuro,indexBasket);  
    }     

    basketContent.innerHTML += renderCost();

}
   







    //style: btn clicked verändert sich zu added 1




       