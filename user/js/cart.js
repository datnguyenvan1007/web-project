function dividePrice(price, d = 3) {
    price = price.toString();
    var surplus = price.length % d;
    var dividedPrice = [];
    if (surplus == 0) 
        surplus = d;
    let count = 0;
    for (let i = price.length - 1; i >= 0; i--) {
        if (count == d) {
            dividedPrice.unshift(',');
            count = 0;
        }
        if(count != d || i < (surplus - 1)) {
            dividedPrice.unshift(price[i]);
            count++;
        }
    }
    return dividedPrice.join('');
}

function subTotalPrice (element, quantity) {
    var price = $(element).closest(".cart-item-info").find(".price").text();
    price.trim();
    price = price.replace(/,/g, "");
    price = parseInt(price);
    $(element).closest('.cart-item').find(".sub-total-price div:last-child").text(dividePrice(price * quantity));
}

function totalPrice (element) {
    var elements = $(element);
    var total = 0;
    for (let i = 0; i < elements.length; i++) {
        total += parseInt($(elements[i]).text().trim().replace(/,/g, ''));
    }
    $('.total-price').text(dividePrice(total));
}

totalPrice('.sub-total-price div:last-child');

$(".quantity button").on("click", function () {
    var math = $(this).val();
    var quantity = parseInt($(this).siblings("input").val());
    if (math == "+") {
        quantity++;
        $(this).siblings("input").val(quantity);
    }
    if (math == "-" && quantity > 1) {
        quantity--;
        $(this).siblings("input").val(quantity);
    }
    subTotalPrice(this, quantity);
    totalPrice('.sub-total-price div:last-child');
});

$('.remove-cart-item').on('click', function () {
    $(this).closest('.cart-item').remove();
    totalPrice('.sub-total-price div:last-child');
});