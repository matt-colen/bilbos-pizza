import menuArray from "./menuArray.js";

const getMenuHTML = () => {
  let menuHTML = "";

  menuArray.forEach((itemObj) => {
    const menuToppingsHTML = itemObj.toppings
      .map((topping) => topping)
      .join(", ");

    menuHTML += `
    <div id="${itemObj.id}" class="menu-item-container flex">
      <div class="menu-item-left flex">
        <img class="menu-item-img" src="${itemObj.img}" alt="${itemObj.name} pizza" />
        <div class="menu-item-details flex">
          <h3>${itemObj.name}</h3>
          <p class="menu-item-toppings">${menuToppingsHTML}</p>
          <p class="menu-item-price">$${itemObj.price}</p>
        </div>
      </div>
      <button class="btn-plus" data-add=${itemObj.id}><i class="fa-solid fa-plus"></i></button>
    </div>
    `;
  });

  return menuHTML;
};

const renderMenuHTML = () =>
  (document.querySelector("#menuItemContainer").innerHTML += getMenuHTML());

renderMenuHTML();

const updateCart = (e) => {
  const productID = e.target.dataset.remove || e.target.dataset.add;

  menuArray.forEach((item) => {
    if (item.id === +productID) {
      e.target.dataset.add ? (item.inCart = true) : (item.inCart = false);
    }
  });

  renderCart(e);
};

const getCartTotal = (cartItems) =>
  cartItems.reduce((total, currentItem) => total + currentItem.price, 0);

const getCartTotalHTML = (cartItems) => {
  let cartTotalHTML = "";
  cartTotalHTML += `
    <p>Total price:</p>
    <p>$${getCartTotal(cartItems)}</p>
  `;
  return cartTotalHTML;
};

const getCartHTML = (cartItems) => {
  let cartHTML = "";

  cartItems.forEach((item) => {
    cartHTML += `
    <div class="checkout-item flex">
      <div class="checkout-item-details flex">
      <button class="btn-secondary" data-remove=${item.id}>
        <i class="fa-solid fa-xmark"></i>
      </button>
        <p>${item.name}</p>
      </div>
      <div class="checkout-item-price">
        <p>$${item.price}</p>
      </div>
    </div>
    `;
  });

  cartHTML += `
    <div id="checkoutTotal" class="checkout-total flex">${getCartTotalHTML(
      cartItems
    )}</div>
  `;

  return cartHTML;
};

const renderCart = () => {
  const itemsInCart = menuArray.filter((item) => item.inCart);
  if (itemsInCart.length > 0) {
    document.querySelector("#checkout").classList.remove("hidden");
  } else {
    document.querySelector("#checkout").classList.add("hidden");
  }
  document.querySelector("#checkoutContainer").innerHTML =
    getCartHTML(itemsInCart);
};

document.addEventListener("click", (e) => {
  if (e.target.dataset.add || e.target.dataset.remove) {
    updateCart(e);
  }
});
