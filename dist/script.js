let cartContainer = document.querySelector(".cart-container");
const productsEl = document.querySelector(".products");


cartContainer.innerHTML = localStorage.getItem("value");

function showProducts() {
  perfumes.forEach((prod) => {
    productsEl.innerHTML += `<div class="perfume_list uppercase grid grid-flow-row place-items-center p-3">
        <div class="shadow-sm rounded-lg sm:w-36 sm:h-36 md:w-48 md:h-48  ">
            <img id="perfume-photo-src" class="rounded w-full h-full object-cover" src="${prod.imgSrc}" alt="">
        </div>
        <p class="prefume_brand text-sm lg:text-base">${prod.brand}</p>
        <p class="perfume_name text-sm lg:text-base">${prod.name}</p>
        <div class="flex flex-row align-middle justify-center ">
            <span class="text-[#2E765E] text-lg inline-block ">$</span>
            <p class="perfume_price text-center pt-1 text-[#2E765E]">${prod.price}</p>
        </div>

        <button class="add-to-cart bg-[#EEEDED] w-24 shadow-lg font-bold text-[#27e1c1]
    hover:bg-[#83CEB5] rounded-2xl text-[.6rem] p-[1em] md:text-xs" data-item-number="${prod.itemNum}">ADD TO CART</button>
    </div>`;
  });
}
showProducts();

let btn = document.querySelectorAll(".add-to-cart");
let cart = [];

btn.forEach((button) => {
  button.addEventListener("click", (event) => {
    let itemNumber = parseInt(event.target.dataset.itemNumber, 10);
    let product = perfumes.find((product) => product.itemNum === itemNumber);

    if (!cart.includes(product)) {
      cart.push(product);
      addCart();
    }
    displayMovements();
  });
});

function addCart() {
  localStorage.setItem("cartData", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", () => {
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  cart = cartData; // Populate the cart array

  // Populate the cart container with cart items
  displayMovements();
});

const displayMovements = function () {
  cartContainer.innerHTML = " ";
  cart.forEach((c) => {
    cartContainer.innerHTML += `
             <div class="item_list z-10 h-[35%] flex flex-row justify-center align-middle border-2 shadow-md">
                                <div class="border p-2 justify-between ">
                                    <div class="w-[35%] flex gap-1">
                                        <input type="checkbox">
                                        <img class="object-cover" src="${c.imgSrc}" alt="">
                                    </div>
                                    <div class="flex justify-between">
                                        <p class="text-[1rem] white">${c.name}</p>
                                        <div class="flex">
                                        <p class="text-lg">$</p>
                                        <p class="text-xl">${c.price}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="items-center relative flex flex-col py-3 px-2 gap-2">
                                    <div class="flex pt-4 gap-1">
                                        <button class=" bg-white rounded w-7"><i class="plus-btn fa-solid fa-plus" data-item-number="${c.itemNum}"></i></button>
                                        <button class="decrement-btn bg-white rounded w-7"><i class="decrement-btn fa-solid fa-minus" data-item-number="${c.itemNum}"></i></button>
                                        <p class="order-unit w-10 flex justify-center bg-gray-200">${c.unit}</p>
                                    </div>

                                    <div class="top-20 flex flex-row gap-2 ">
                                        <button class="buy-btn text-white shadow-md bg-green-400 w-10 rounded-lg text-[.7rem]
                p-1">Buy</button>
                                        <button class="remove-btn text-white shadow-md bg-red-600 rounded-lg text-[.7rem]
                p-1" data-item-number="${c.itemNum}">Remove</button>
                                    </div>
                                </div>
                            </div>
        `;
  });
    
};

let buyBtn = document.querySelectorAll(".buy-btn");

document.addEventListener("DOMContentLoaded", () => {
  cartContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("buy-btn")) {
      console.log("Buy button clicked");
    }
  });

  cartContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("plus-btn")) {
      let itemNumber = parseInt(e.target.dataset.itemNumber, 10);
      let product = perfumes.find((product) => product.itemNum === itemNumber);
      if (product) {
        product.unit++;
        addCart(); // Update localStorage when the unit is incremented
      }
      displayMovements();
    }
  });

  cartContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("decrement-btn")) {
      let itemNumber = parseInt(e.target.dataset.itemNumber, 10);
      let product = perfumes.find((product) => product.itemNum === itemNumber);
      if (product) {
        product.unit--;
        addCart(); // Update localStorage when the unit is decremented
      }  if (product.unit === 0) {
        removeFromCart(product)
        
      }
      displayMovements();
    }
  });

  cartContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      let itemNumber = parseInt(e.target.dataset.itemNumber, 10);
      let product = cart.find((product) => product.itemNum === itemNumber);
      if (product) {
        removeFromCart(product);
      }
    }
  });
});

function removeFromCart(product) {
    
  const productIndex = cart.findIndex((p) => p.itemNum === product.itemNum);
  if (productIndex !== -1) { 
    cart.splice(productIndex, 1);
    localStorage.setItem("cartData", JSON.stringify(cart));
    displayMovements();
  }
};





