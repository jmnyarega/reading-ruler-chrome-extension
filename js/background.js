function createBlock() {
  chrome.storage.sync.get(
    "options",
    ({
      options: {
        height,
        width,
        borderWidth,
        borderColor,
        backgroundColor,
        opacity,
      },
    }) => {
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
      position: fixed;
      z-index: 1000;
      background-color: ${backgroundColor};
      border: ${borderWidth}px solid ${borderColor};
      text-align: center;
      height: ${height}px;
      width: ${width}px;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
      cursor: move;
    }

    #extension-close-button {
      position: absolute;
      right: 10px;
      top: 10px;

      border: 1px solid transparent;
      outline: none;

      color: #fff;
      cursor: pointer;
      font-weight: bold;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: red;
    }
  `;

      const closeButton = document.createElement("button");
      closeButton.innerHTML = "x";
      closeButton.setAttribute("id", "extension-close-button");
      blockContainer.appendChild(closeButton);

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

      closeButton.addEventListener("click", function () {
        document.body.removeChild(blockContainer);
      });
    }
  );
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: createBlock,
  });
});
