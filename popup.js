function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href
  });
  return false;
}
function buildPopupDom(divName, data) {
  var popupDiv = document.getElementById(divName);
  var ul = document.createElement('ul');
  popupDiv.appendChild(ul);
  for (var i = 0, ie = data.length; i < ie; ++i) {
    var a = document.createElement('a');
    a.href = data[i].url;
    a.appendChild(document.createTextNode(data[i].title));
    a.addEventListener('click', onAnchorClick);
    var li = document.createElement('li');
    li.appendChild(a);
    ul.appendChild(li);
  }
}
function setDOMInfo(info) {
    document.getElementById('total').textContent   = info.total;
    document.getElementById('inputs').textContent  = info.inputs;
    document.getElementById('buttons').textContent = info.buttons;
    buildPopupDom("typedUrl_div",info.links)
    console.log(info)
}
chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendMessage(tab.id, {action: "getDOM"}, function(response) {
    setDOMInfo(response)
  });
});
