$(document).on("click", ".product-quantity button", function () {
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
});