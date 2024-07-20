let listCart = [];
function checkCart() {
  var cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("listCart="));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split("=")[1]);
  }
}
checkCart();
addCartToHTML();
function addCartToHTML() {
  // clear data default
  var listCartHTML = document.querySelector(".returnCart .list");
  listCartHTML.innerHTML = "";

  var totalQuantityHTML = document.querySelector(".totalQuantity");
  var totalPriceHTML = document.querySelector(".totalPrice");
  var totalQuantity = 0;
  var totalPrice = 0;
  // if has product in Cart
  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let newCart = document.createElement("div");
        newCart.classList.add("item");
        newCart.innerHTML = `<img src="../${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${
                      product.price * product.quantity
                    }</div>`;
        listCartHTML.appendChild(newCart);
        totalQuantity = totalQuantity + product.quantity;
        totalPrice = totalPrice + product.price * product.quantity;
      }
    });
  }
  totalQuantityHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = "$" + totalPrice;
  checkTotalQuantity(totalQuantity);
  SharedPaymentInformation();
}

let paymentForm = document.querySelector(".payment-container");

function SharedPaymentInformation() {
  document.querySelector("#buttonCheckout").onclick = () => {
    paymentForm.classList.toggle("active");
  };
  document.querySelector("#close-login-btn").onclick = () => {
    paymentForm.classList.remove("active");
  };
}

function checkTotalQuantity(totalQuantity) {
  if (totalQuantity == 0) {
    createToast(
      "Erro",
      "fa-solid fa-circle-check",
      "Cảnh báo",
      "Chưa có sản phẩm trong giỏ hàng."
    );
  }else{

  }
}
