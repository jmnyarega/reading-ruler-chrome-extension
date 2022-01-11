chrome.extension.onRequest.addListener(function (
  request,
  sender,
  sendResponse
) {
  console.log(request.method);
  if (request.method == "getSelection")
    sendResponse({ data: window.getSelection().toString() });
  else sendResponse({}); // snub them.
});
