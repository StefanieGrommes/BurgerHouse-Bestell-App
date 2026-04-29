function showFilledBasket(basketDish,dishSumInEuro){
    return `<div class="menu_card menu_width_basketdish">
                <div class="first_line_menu_card_basket">
                    <div class="dish_name_plus_amount">
                        <div id="amount">${basketDish.amount}</div>
                        <p>x</p>
                        <p class="full_basket_dish_name">${basketDish.dish}</p>
                    </div>
                    <button onclick="deleteItem(${basketDish.id})" class="upper_delete_btn_hidden" id="upper_delete_btn_basket_${basketDish.id}">
                    <img src="./assets/buttons/btn_delete_element.svg" alt="delete_btn">
                    </button>
                </div>
                <div class="second_line_menu_card_basket">
                    <div class="delete_plus_quantity">
                        <button id="lower_delete_btn_basket_${basketDish.id}" onclick="decreaseItem(${basketDish.id})" class="delete_btn_basket">
                            <img src="./assets/buttons/btn_delete_element.svg" alt="delete_btn">
                        </button>
                        <div><span class="basket_amount">${basketDish.amount}</span></div>
                        <button onclick="increase_amount(${basketDish.id})" id="increase_btn" class="increase_btn">+</button>
                    </div>
                    <div id="dish_price"><p>${dishSumInEuro}</p>
                    </div>
                </div>           
            </div>`
                    
}

function showCosts(subtotalInEur,finalSumInEur,deliveryFeeInEur){
    return `<div class="costs_and_order_btn">
                        <div class="calculate_costs">
                            <div class="subtotal"><p>Subtotal</p><p>${subtotalInEur}</p></div>
                            <div class="delivery"><p>Delivery fee</p><p id="delivery_fee">${deliveryFeeInEur}</p></div>
                            <p class="white_line"></p>
                            <div class="total_amount"><p>Total</p><p>${finalSumInEur}</p></div>
                        </div>
                        <button class="font_basket" id="buy_now_btn" onclick="buyNow()">Buy now(${finalSumInEur})</button>
                    </div>`
}
