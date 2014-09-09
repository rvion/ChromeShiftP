chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "getDOM") {
    var l = document.links;
    LINKS = []
    for (var i = 0; i < l.length; i++) {
      LINKS.push({ "title": l[i].text, "url": l[i].href });
    }
    var domInfo = {
      links: LINKS,
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