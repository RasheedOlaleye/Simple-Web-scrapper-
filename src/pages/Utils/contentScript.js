chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "copy_website") {
      var website_content = document.documentElement.outerHTML;
      sendResponse({content: website_content});
    }
  });
  