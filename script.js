function init(){
    renderCategory();
}


function renderCategory() {
    let categoryContent = document.getElementById("category_container");
    categoryContent.innerHTML = "";

    for (let indexCategory = 0; indexCategory < categoryDetails.length; indexCategory++) {
        const category = categoryDetails[indexCategory];
        showCategory(indexCategory,categoryContent);
        };


function showCategory(indexCategory,categoryContent){
    categoryContent.innerHTML +=
    `<div class="main_dishes_category_container category_orange_bg">
                    <div class="category_img_container"><img src="${categoryDetails[indexCategory].source}" alt="${categoryDetails[indexCategory].title}" id="category_img"></div>
                    <div id="main_dishes_category"><h2>${categoryDetails[indexCategory].title}</h2></div>  
                </div>
    <div class="main_dishes" id="main_dish_${indexCategory}">
    </div>`         

    renderMealComponents(indexCategory);
}
}

function renderMealComponents(indexCategory){
    let mainDish = document.getElementById(`main_dish_${indexCategory}`);
    mainDish.innerHTML = "";
    let meals =  categoryDetails[indexCategory].meals;

        for (let indexMealComponent = 0; indexMealComponent < meals.length; indexMealComponent++) {
        mainDish.innerHTML += showMealComponents(indexMealComponent,indexCategory);
        }
}

function showMealComponents(indexMealComponent,indexCategory){
    let meal = categoryDetails[indexCategory].meals[indexMealComponent];
   return `<div class="menu_card">
                <div class="meal_component">
                    <div class="meal_img_container">
                        <img src="${meal.source}" alt="${meal.dish}" id="meal_img">
                    </div>
                    <div class="meal_details">
                        <div class="meal_name_and_description">
                            <div><h3>${meal.dish}</h3></div>
                            <div><p class="meal_description">${meal.description}</p></div>
                        </div>
                        <div class="price_and_order_btn">
                            <div id="meal_price"><h3>${meal.price}€</h3></div>
                            <button type="submit" onclick="addToBasket()"class="order_btn">Add to basket</button>
                        </div>
                    </div>       
                </div>
            </div>`
}

function addToBasket(){
    const myBasket = document.getElementById("my_basket")
    myBasket.showModal();
    myBasket.classList.add("open_basket");
    document.body.classList.add("no-scroll");

    //open dialogue classlist add 
    //style: btn clicked verändert sich zu added 1


}

       