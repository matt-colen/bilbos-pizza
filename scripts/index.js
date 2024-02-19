import menuArray from "./menuArray.js";

const getMenuHTML = () => {
  let menuHTML = "";

  menuArray.forEach((itemObj) => {
    const menuToppingsHTML = itemObj.toppings
      .map((topping) => topping)
      .join(", ");

    menuHTML += `
    <div id="menu-item-${itemObj.id}" class="menu-item-container flex">
      <div class="menu-item-left flex">
        <img class="menu-item-img" src="${itemObj.img}" alt="${itemObj.name} pizza" />
        <div class="menu-item-details flex">
          <h2>${itemObj.name}</h2>
          <p class="menu-item-toppings">${menuToppingsHTML}</p>
          <p class="menu-item-price">$${itemObj.price}</p>
        </div>
      </div>
      <button class="btn-plus"><i class="fa-solid fa-plus"></i></button>
    </div>
    `;
  });

  return menuHTML;
};

const renderMenuHTML = () =>
  (document.querySelector("#menuItemContainer").innerHTML = getMenuHTML());

renderMenuHTML();
