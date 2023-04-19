chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
      chrome.contextMenus.create({
        "id": "copy-whole-website-content",
        "title": "Copy Whole Website Content",
        "contexts": ["selection"]
      });
    }
  });