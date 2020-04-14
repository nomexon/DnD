const main = document.querySelector("main");
const add = document.querySelector("#add");
const del = document.querySelector("#del");
const delRand = document.querySelector("#delrand");

let druging = false;
let dndElem;
let overItem;
let oldOreder;
let newOreder;

let itemCount = 0;

main.addEventListener("mousedown", (e) => {
  let clickItem = e.target.classList.contains("item");

  if (clickItem) {
    druging = true;
    dndElem = e.target;
    oldOreder = dndElem.style.order;
    let coords = getCoords(dndElem);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;

    dndElem.style.opacity = 0;

    let cloneElem = dndElem.cloneNode(true);
    cloneElem.style.position = "absolute";
    cloneElem.style.opacity = 1;
    cloneElem.style.zIndex = 1000;
    main.insertAdjacentElement("beforebegin", cloneElem);

    moveElem(e);
    function moveElem(e) {
      cloneElem.style.left = e.pageX - shiftX + "px";
      cloneElem.style.top = e.pageY - shiftY + "px";
    }

    document.onmousemove = function (e) {
      moveElem(e);
    };

    cloneElem.onmouseup = function (e) {
      dndElem.style.opacity = 1;
      cloneElem.remove();

      document.onmousemove = null;
      cloneElem.onmouseup = null;
    };
  }
});
main.addEventListener("mouseover", (e) => {
  newOverItem = e.target.classList.contains("item");
  if (newOverItem && druging) {
    overItem = e.target;
    newOreder = overItem.style.order;
    overItem.style.order = oldOreder;
    dndElem.style.order = newOreder;
    dndElem = null;
    druging = false;
  } else {
    overItem = null;
    druging = false;
  }
});

function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}

function addOrder(index = 0) {
  let items = document.querySelectorAll(".item");
  let newClassItem;
  if (items.length <= 4) {
    newClassItem = "item item2";
  } else if (items.length <= 9) {
    newClassItem = "item item9";
  } else {
    newClassItem = "item item12";
  }
  for (let i = index; i < items.length; i++) {
    items[i].className = newClassItem;
    items[i].style.order = i;
  }
}
addOrder();

add.addEventListener("click", () => {
  itemCount += 1;

  let item = createItem();
  main.insertAdjacentElement("beforeend", item);
  addOrder();
  if (itemCount === 12) {
    add.setAttribute("disabled", "true");
  }
});
del.addEventListener("click", () => {
  if (itemCount > 0) {
    itemCount -= 1;
    let items = document.querySelectorAll(".item");

    items[items.length - 1].remove();

    if (itemCount < 12) {
      add.removeAttribute("disabled");
    }
    addOrder();
  }
});
delRand.addEventListener("click", () => {
  if (itemCount > 0) {
    itemCount -= 1;
    let items = document.querySelectorAll(".item");
    let rand = Math.floor(0 + Math.random() * (items.length - 0));

    items[rand].remove();
    if (itemCount < 12) {
      add.removeAttribute("disabled");
    }
    addOrder();
  }
});

function createItem() {
  let item = document.createElement("div");
  item.classList.add("item");
  item.innerText = itemCount;
  return item;
}
