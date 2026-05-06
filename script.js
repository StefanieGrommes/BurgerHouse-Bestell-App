let basket = [];
let basketDish;

function init(){
    renderCategory();
}

function renderCategory() {
    let categoryContent = document.getElementById("category_container");
    categoryContent.innerHTML = "";
    for (let indexCategory = 0; indexCategory < categoryDetails.length; indexCategory++) {
        const category = categoryDetails[indexCategory];
        categoryContent.innerHTML += showCategory(indexCategory,categoryContent);
       renderMealComponents(indexCategory);
        };
}

function renderMealComponents(indexCategory){
    let mainDish = document.getElementById(`main_dish_${indexCategory}`);
    mainDish.innerHTML = "";
    let meals =  categoryDetails[indexCategory].meals;
        for (let indexMealComponent = 0; indexMealComponent < meals.length; indexMealComponent++) {
        let meal = categoryDetails[indexCategory].meals[indexMealComponent];
        let price = meal.price;
        let priceInEuro = setCurrency(price);
        mainDish.innerHTML += showMealComponents(indexMealComponent,indexCategory,priceInEuro,meal);
        }    
}

function addToBasket(indexMealComponent,indexCategory){
    meal = categoryDetails[indexCategory].meals[indexMealComponent];
    meal.amount++;
        if (!basket.includes(meal)) {
            basket.push(meal);  
        }
        if(meal.amount > 24) {
            alert('bitte maximale Anzahl beachten');
        return 24;
        }
        renderBasketDishes();     
}

function calculateTotalDishPrice(basketdish){
    let totalDishPrice = (basketdish.price) * basketdish.amount;
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

function decreaseItem(mealId){
    let index = -1;  //index ist nicht gefunden
    for (let i = 0; i < basket.length; i++) { //gehe den warenkrob durch, bis die basket.id gleich der meal.id ist
    if (basket[i].id === mealId) {
        index = i; break;
        }
    }
        if (index === -1) return;
    let basketDish = basket[index];
    basketDish.amount--;
    if (basketDish.amount < 1) {
        basket.splice(index, 1);
    }
    changeOrderBtn(basketDish);
    renderBasketDishes();
}

function deleteItem(mealId){
    let index = -1;  //index ist nicht gefunden
    for (let i = 0; i < basket.length; i++) { //gehe den warenkrob durch, bis die basket.id gleich der meal.id ist
    if (basket[i].id === mealId) {
        index = i;
        break;
        }
    }
    if (index === -1) return;
    basketDish = basket[index];
    basket.splice(index, 1); //lösche das Gericht mit dem index
    renderBasketDishes();
    basketDish.amount = 0;
    changeOrderBtn(basketDish);
}

function renderBasketDishes(){
    let basketContent = document.getElementById("basket_content");
    let mobileBasketContent = document.getElementById("mobile_basket_content");
    let basketCosts = document.getElementById("basket_costs");
    let mobileBasketCosts = document.getElementById("mobile_basket_costs");
    basketContent.innerHTML = "";
    mobileBasketContent.innerHTML = "";
     if (basket.length === 0) {
        basketCosts.innerHTML = "";
        mobileBasketCosts.innerHTML = "";
        basketContent.innerHTML = emptyBasket();
        mobileBasketContent.innerHTML = emptyBasket();
    }
    else renderBasketCosts(basketContent,mobileBasketContent,basketCosts,mobileBasketCosts);
}

function renderBasketCosts(basketContent,mobileBasketContent,basketCosts,mobileBasketCosts){
    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
            let basketDish = basket[indexBasket]; 
            let totalDishPrice = calculateTotalDishPrice(basketDish);
            let dishSumInEuro = setCurrency(totalDishPrice);   
        basketContent.innerHTML += showFilledBasket(basketDish,dishSumInEuro);
        mobileBasketContent.innerHTML += showFilledBasket(basketDish,dishSumInEuro);
        changeOrderBtn(basketDish);
        if (basketDish.amount > 1) {
            toggleDeleteBtn(basketDish);
        }
    }     
basketCosts.innerHTML = renderCost();
mobileBasketCosts.innerHTML = renderCost();
}

function changeOrderBtn(meal){
    let orderBtn = document.getElementById(`order_btn_${meal.id}`);
    if(!orderBtn) return;
    if (meal.amount > 0){
    orderBtn.classList.add("order_btn_clicked");
    orderBtn.innerHTML = `added ${meal.amount}`;
    } else {
        orderBtn.classList.remove("order_btn_clicked");
        orderBtn.innerHTML = "Add to basket";
        }
    }
    
function increaseAmount(mealId){
    let index = -1;  //index ist nicht gefunden
    for (let i = 0; i < basket.length; i++) { //gehe den warenkrob durch, bis die basket.id gleich der meal.id ist
    if (basket[i].id === mealId) {
        index = i;
        break;
        }
    }
    if (index === -1) return;
    basketDish = basket[index];
    basketDish.amount++;
    changeOrderBtn(basketDish);
    renderBasketDishes();
}
   
function toggleDeleteBtn(basketDish) {
   const lowerBtns = document.querySelectorAll(`.lower_delete_btn[data-id="${basketDish.id}"]`
    );
    lowerBtns.forEach(btn => {
        btn.innerHTML = "-";
    });
    const upperBtns = document.querySelectorAll(`.upper_delete_btn[data-id="${basketDish.id}"]`
    );
    upperBtns.forEach(btn => {
        btn.classList.remove("upper_delete_btn_hidden");
        btn.classList.add("upper_delete_btn_shown");
        btn.classList.add("delete_btn_basket");
    });
}

function buyNow(){
    if (basket.length === 0) {
        return;}
    for (let i = 0; i < categoryDetails.length; i++)
    {let meals = categoryDetails[i].meals;
        for (let j = 0; j < meals.length; j++){
            meals[j].amount = 0;}
    }
   let myBasket = document.getElementById("my_basket")
   basket = [];
   renderBasketDishes();
   myBasket.style.display = "none";
   showOrderConfirmedDialog();
}

function showOrderConfirmedDialog(){
    let orderConfirmedDialog = document.getElementById("order_confirmed_dialog");
    orderConfirmedDialog.showModal();
    orderConfirmedDialog.classList.add("opened");
    document.body.classList.add("no-scroll");
    const myTimeout = setTimeout(closeDialog, 4000);
}

function closeDialog(){
    let myBasket = document.getElementById("my_basket")
    myBasket.style.display = "flex";
    let orderConfirmedDialog = document.getElementById("order_confirmed_dialog");
    orderConfirmedDialog.close();
    orderConfirmedDialog.classList.remove("opened");
     document.body.classList.remove("no-scroll"); 
     closeMobileBasket();
     init();
}

function showMobileBasket(){
    let mobileBasketDialog = document.getElementById("mobile_basket_container");
    mobileBasketDialog.showModal();
    document.body.classList.add("no-scroll");
    renderBasketDishes();
}

function closeMobileBasket(){
    let mobileBasketDialog = document.getElementById("mobile_basket_container");
    mobileBasketDialog.close();
    document.body.classList.remove("no-scroll");
}