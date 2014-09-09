function setDOMInfo(info) {
    document.getElementById('total').textContent   = info.total;
    document.getElementById('inputs').textContent  = info.inputs;
    document.getElementById('buttons').textContent = info.buttons;
    console.log(info)
}
chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendMessage(tab.id, {action: "getDOM"}, function(response) {
    setDOMInfo(response)
  });
});
