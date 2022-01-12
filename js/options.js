function save_options() {
  let options = {};

  const height = document.getElementById("height").value;
  const width = document.getElementById("width").value;
  const borderWidth = document.getElementById("border-width").value;
  const borderColor = document.getElementById("border-color").value;
  const backgroundColor = document.getElementById("background-color").value;
  const opacity = document.getElementById("opacity").value;

  options = {
    height,
    width,
    borderWidth,
    borderColor,
    backgroundColor,
    opacity,
  };

  chrome.storage.sync.set({ options }, function () {
    const status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function () {
      status.textContent = "";
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get(
    {
      options: {
        height: 50,
        width: 800,
        borderWidth: 1,
        borderColor: "#FF79C6",
        backgroundColor: "#282A36",
        opacity: 8,
      },
    },
    function ({ options }) {
      document.getElementById("opacity").value = options.opacity;
      document.getElementById("height").value = options.height;
      document.getElementById("width").value = options.width;
      document.getElementById("border-width").value = options.borderWidth;
      document.getElementById("border-color").value = options.borderColor;
      document.getElementById("background-color").value =
        options.backgroundColor;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
