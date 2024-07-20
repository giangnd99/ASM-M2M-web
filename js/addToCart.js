let notifications = document.getElementById("notifications");

function createToast(type, icon, title, text) {
  let newToast = document.createElement("div");
  newToast.classList.add("toast", type);
  newToast.innerHTML = `
    <i class="${icon}"></i>
    <div class="content">
      <div class="title">${title}</div>
      <span>${text}</span>
      <i class="fa-solid fa-xmark close-icon-toast"></i>
    </div>`;

  // Adding event listener for close icon
  newToast
    .querySelector(".close-icon-toast")
    .addEventListener("click", function () {
      notifications.removeChild(newToast);
    });
  notifications.appendChild(newToast);

  // Optionally, remove the toast after a certain time
  setTimeout(() => {
    if (notifications.contains(newToast)) {
      notifications.removeChild(newToast);
    }
  }, 5000); // Adjust the timeout duration as needed
}

let iconCart = document.querySelector(".icons #iconCart");
let cart = document.querySelector(".cart");
let container = document.querySelector(".container");
let close = document.querySelector(".close");

iconCart.addEventListener("click", function () {
  if (cart.style.right == "-100%") {
    cart.style.right = "0";
    container.style.transform = "translateX(-400px)";
  } else {
    cart.style.right = "-100%";
    container.style.transform = "translateX(0)";
  }
});
close.addEventListener("click", function () {
  cart.style.right = "-100%";
  container.style.transform = "translateX(0)";
});

let products = null;
// get data from file json
fetch("json/product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addDataToHTML();
  });

//show datas product in list
function addDataToHTML() {
  // remove datas default from HTML
  let listProductHTML = document.querySelector(".swiper-wrapper");
  listProductHTML.innerHTML = "";

  // add new datas
  if (products != null) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("swiper-slide", "box", "item");
      newProduct.innerHTML = `
      <div class="icons">
        <a href="#" class="fas fa-search"></a>
        <a href="#" class="fas fa-heart"></a>
        <a href="#" class="fas fa-eye"></a>
      </div>
      <div class="image">
        <img src="${product.image}" alt="">
      </div>
      <div class="content">
        <h3>${product.name}</h3>
          <div class="price">$${product.price}</div>
          <button onclick="addCart(${product.id})">Thêm vào giỏ hàng</button>  
        </div>`;

      listProductHTML.appendChild(newProduct);
    });
  }
}
//use cookie so the cart doesn't get lost on refresh page

let listCart = [];
function checkCart() {
  var cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("listCart="));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split("=")[1]);
  } else {
    listCart = [];
  }
}
checkCart();
function addCart($idProduct) {
  let productsCopy = JSON.parse(JSON.stringify(products));
  //// If this product is not in the cart
  if (!listCart[$idProduct]) {
    listCart[$idProduct] = productsCopy.filter(
      (product) => product.id == $idProduct
    )[0];
    listCart[$idProduct].quantity = 1;
  } else {
    //If this product is already in the cart.
    //I just increased the quantity
    listCart[$idProduct].quantity++;
  }
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

  addCartToHTML();
  createToast(
    "success",
    "fa-solid fa-circle-check",
    "Thành công",
    "Sản phẩm đã được thêm vào giỏ hàng."
  );
  // Thêm thông báo khi thêm sản phẩm vào giỏ hàng thành công
}
addCartToHTML();
function addCartToHTML() {
  let listCartHTML = document.querySelector(".listCart");
  listCartHTML.innerHTML = "";
  let totalHTML = document.querySelector(".totalQuantity");

  // Xử lý hiển thị giỏ hàng
  let totalQuantity = 0;

  listCart.forEach((product) => {
    if (product) {
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.innerHTML = `<img src="${product.image}">
          <div class="content">
            <div class="name">${product.name}</div>
            <div class="price">$${product.price} / 1 product</div>
          </div>
          <div class="quantity">
            <button onclick="changeQuantity(${product.id}, '-')">-</button>
            <span class="value">${product.quantity}</span>
            <button onclick="changeQuantity(${product.id}, '+')">+</button>
          </div>`;
      listCartHTML.appendChild(newCart);
      totalQuantity += product.quantity;
    }
  });

  totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type) {
  switch ($type) {
    case "+":
      listCart[$idProduct].quantity++;
      break;
    case "-":
      listCart[$idProduct].quantity--;

      // if quantity <= 0 then remove product in cart
      if (listCart[$idProduct].quantity <= 0) {
        delete listCart[$idProduct];
      }
      break;

    default:
      break;
  }
  // save new data in cookie
  document.cookie =
    "listCart=" +
    JSON.stringify(listCart) +
    "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  // reload html view cart
  addCartToHTML();
}
const swiper = new Swiper(".product-slider", {
  loop: true,
  autoplay: {
    delay: 1500, // 1.5 giây
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
