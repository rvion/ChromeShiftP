function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href
  });
  return false;
}
function buildPopupDom(divName, data) {
  var popupDiv = document.getElementById("query");
  for (var i = 0, ie = data.length; i < ie; ++i) {
    var a = document.createElement('option');
    a.value = data[i].url;
    a.appendChild(document.createTextNode(data[i].title));
    a.addEventListener('click', onAnchorClick);
    popupDiv.appendChild(a);
  }
}
function setDOMInfo(info) {
  //console.log(info);
  document.getElementById('total').textContent   = info.total;
  document.getElementById('inputs').textContent  = info.inputs;
  document.getElementById('buttons').textContent = info.buttons;
  buildPopupDom("typedUrl_div",info.links)
  //console.log(info)
}
chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendMessage(tab.id, {action: "getDOM"}, function(response) {
    //console.log(response);
    setDOMInfo(response)
  });
});

$(function(){
  $("select#query").select2({
    matcher: function(term, text, opt) {
      return text.toUpperCase().match(term.toUpperCase().replace(/\s+/g, '.*'));
    }
  })
})