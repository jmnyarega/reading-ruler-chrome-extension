function createBlock() {
  const defaulOptions = {
    height: 50,
    width: 800,
    borderWidth: 1,
    borderColor: "#44475A",
    backgroundColor: "#282A36",
    opacity: 10,
    borderRadius: 0,
  };

  chrome.storage.sync.get("options", ({ options = defaulOptions }) => {
    console.log(options);

    const {
      height,
      width,
      borderWidth,
      borderColor,
      backgroundColor,
      borderRadius,
      opacity,
    } = options;

    if (document.getElementById("blockContainer")) {
      const blockElement = document.getElementById("blockContainer");
      document.body.removeChild(blockElement);
    }

    if (document.getElementById("block-styles")) {
      const styleElement = document.getElementById("block-styles");
      document.head.removeChild(styleElement);
    }

    const blockContainer = document.createElement("div");
    blockContainer.setAttribute("id", "blockContainer");

    const blockStyles = document.createElement("style");
    blockStyles.setAttribute("id", "block-styles");

    blockStyles.innerHTML = `
      #blockContainer {
        position: fixed;
        z-index: 1000000;
        background-color: ${backgroundColor};
        border: ${borderWidth}px solid ${borderColor};
        text-align: center;
        height: ${height}px;
        width: ${width}px;
        opacity: ${opacity / 10};
        border-radius: ${borderRadius}px;
        left: 50%;
        top: 5%;
        transform: translateX(-50%);
        cursor: move;

        transition: all 0.2ms ease-in-out;
    }

    #extension-close-button {
      position: absolute;
      right: 5px;
      top: 5px;

      border: 1px solid transparent;
      outline: none;

      color: #fff;
      cursor: pointer;
      font-weight: bold;

      display: grid;
      place-content: center;

      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #ff5555;
    }
  `;

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "x";
    closeButton.setAttribute("id", "extension-close-button");
    blockContainer.appendChild(closeButton);

    document.head.appendChild(blockStyles);
    document.body.appendChild(blockContainer);

    dragElement(blockContainer);

    function dragElement(barElement) {
      let xDelta = 0,
        yDelta = 0,
        x = 0,
        y = 0;

      barElement.onmousedown = dragMouseDown;

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        x = e.clientX;
        y = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = dragBarElement;
      }

      function dragBarElement(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        xDelta = x - e.clientX;
        yDelta = y - e.clientY;
        x = e.clientX;
        y = e.clientY;
        // set the element's new position:
        barElement.style.top = barElement.offsetTop - yDelta + "px";
        barElement.style.left = barElement.offsetLeft - xDelta + "px";
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
  });
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: createBlock,
  });
});
