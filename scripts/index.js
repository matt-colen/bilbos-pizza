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
  (document.querySelector("#menuItemsContainer").innerHTML += getMenuHTML());

renderMenuHTML();

const updateCart = (e) => {
  const productID = e.target.dataset.remove || e.target.dataset.add;
  menuArray.forEach((item) => {
    if (item.id === +productID) {
      if (e.target.dataset.add) {
        item.inCart = true;
        item.amountInCart++;
      } else {
        item.inCart = false;
        item.amountInCart = 0;
      }
    }
  });
  renderCart(e);
};

const resetCart = () => {
  menuArray.forEach((item) => {
    item.inCart = false;
    item.amountInCart = 0;
  });
};

const getCartTotal = (cartItems) =>
  cartItems.reduce(
    (total, currentItem) => total + currentItem.getTotalPrice(),
    0
  );

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
        <button class="btn-secondary" aria-label="Remove item from cart" data-remove=${
          item.id
        }>
          <i class="fa-solid fa-xmark"></i>
        </button>
        <p class="small-text">${item.name}</p>
        <div class="flex item-quantity">
          <pre>• </pre>
          <input class="item-quantity-input" type="number" min="0" max="100" aria-label="Update item quantity in cart" data-update=${
            item.id
          } value="${item.amountInCart}"/>
        </div>
      </div>
      <div class="checkout-item-price">
        <p>$${item.getTotalPrice()}</p>
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

const togglePaymentModal = () => {
  document.querySelector("#modal").classList.toggle("hidden");
  document.querySelector("#modalOverlay").classList.toggle("hidden");
  document.body.classList.toggle("modal-open");
};

document.addEventListener("click", (e) => {
  if (e.target.dataset.add || e.target.dataset.remove) {
    const successMessage = document.querySelector("#successMessage");
    updateCart(e);
    if (!successMessage.classList.contains("hidden")) {
      toggleSuccessMessage(successMessage);
    }
  } else if (
    e.target.id === "complete-order-btn" ||
    e.target.id === "modalCloseBtn"
  ) {
    togglePaymentModal();
  }
});

const getSuccessMessage = (name) => {
  return `
  <p>Thanks ${name}! Your order is on its way.
  `;
};

const toggleSuccessMessage = (message) => message.classList.toggle("hidden");

const renderSuccessMessage = (message) => {
  const successMessage = document.querySelector("#successMessage");
  successMessage.innerHTML = message;
  toggleSuccessMessage(successMessage);
};

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const userName = document.querySelector("#name").value;
  const successMessage = getSuccessMessage(userName);
  const form = e.target;
  // Clears input values from the form
  Array.from(form.elements).forEach((element) => {
    if (element.tagName.toLowerCase() === "input") {
      element.value = "";
    }
  });
  renderSuccessMessage(successMessage);
  resetCart();
  renderCart();
  togglePaymentModal();
});

const updateCartWithUserVal = (e) => {
  const productID = e.target.dataset.update;
  menuArray.forEach((item) => {
    if (item.id === +productID) {
      const itemValue = +e.target.value;
      if (itemValue > 0) {
        item.amountInCart = itemValue;
      } else {
        item.amountInCart = 0;
        item.inCart = false;
      }
    }
  });
  renderCart(e);
};

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("item-quantity-input")) {
    updateCartWithUserVal(e);
  }
});
