function showMealComponents(indexMealComponent,indexCategory, priceInEuro){
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
                            <div id="meal_price"><h3>${priceInEuro}</h3></div>
                            <button type="submit" onclick="addToBasket(${indexMealComponent},${indexCategory})" class="order_btn">Add to basket</button>
                        </div>
                    </div>       
                </div>
            </div>`
}

