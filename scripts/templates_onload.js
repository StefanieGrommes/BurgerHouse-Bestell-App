function showCategory(indexCategory,categoryContent){
    return `<div class="category_img_container"><img src="${categoryDetails[indexCategory].source}" alt="${categoryDetails[indexCategory].title}" id="category_img_${categoryDetails[indexCategory].id}">
            </div>
            <div class="category_orange_bg">
                <div class="main_dishes_category_container">
                    <div id="main_dishes_category"><h2>${categoryDetails[indexCategory].title}</h2>
                    </div>  
                </div>
            </div>
            <div class="main_dishes" id="main_dish_${indexCategory}">
            </div>`            
}



function showMealComponents(indexMealComponent,indexCategory,priceInEuro){
    let meal = categoryDetails[indexCategory].meals[indexMealComponent];
   return `<div class="menu_card menu_width_dish">
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
                            <div id="meal_price"><h3>${priceInEuro}</h3></div>
                            <button type="submit" onclick="addToBasket(${indexMealComponent},${indexCategory})" class="order_btn" id="order_btn_${meal.id}">Add to basket</button>
                        </div>
                    </div>       
                </div>
            </div>`
}

