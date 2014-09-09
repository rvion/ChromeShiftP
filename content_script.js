chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "getDOM") {
    var domInfo = {
      total: document.querySelectorAll('*').length,
      inputs: document.querySelectorAll('input').length,
      buttons: document.querySelectorAll('button').length
    };
    sendResponse(domInfo);
    return true;
  } else {
    sendResponse({});
  }
});