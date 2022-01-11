function createBlock() {
  // looke for the #div element

  if (document.getElementById("blockContainer")) {
    const element = document.getElementById("blockContainer");
    document.body.removeChild(element);
  }

  if (document.getElementById("block-styles")) {
    const element = document.getElementById("block-styles");
    document.head.removeChild(element);
  }

  const blockContainer = document.createElement("div");
  blockContainer.setAttribute("id", "blockContainer");

  const blockStyles = document.createElement("style");
  blockStyles.setAttribute("id", "block-styles");

  blockStyles.innerHTML = `
    #blockContainer {
      position: absolute;
      z-index: 1000;
      background-color: #282A36;
      border: 1px solid #FF79C6;
      text-align: center;
      height: 50px;
      width: 40%;
      top: 0;
      cursor: move;
    }
  `;

  document.head.appendChild(blockStyles);
  document.body.appendChild(blockContainer);

  dragElement(blockContainer);

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: createBlock,
  });
});
