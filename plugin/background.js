

const backend_url = "http://127.0.0.1:8000";



// Receiving messages from content script
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extenstion");
    if (request.message == "found_products") {
      // Found products on page, send list to API
      var product_list = request.product_names;
      sendProductListToAPI(product_list, sendResponse, request.offset);
    }

    if (request.message == "check_user") {
      chrome.identity.getProfileUserInfo(function(userInfo) {
        console.log(userInfo.email);
        console.log(userInfo.id);
        chrome.browserAction.setPopup({popup: "loggedIn.html"})
        
        sendResponse({userInfo: userInfo});
      });     
    }
  return true;  
});

// Query API with list of products
// product_list: [{"name": "Juice"}, ...]
// sendResponse: callback fxn for data
function sendProductListToAPI(product_list, sendResponse, offset) {
  console.log("Sending to API");
  var xhr = new XMLHttpRequest();
  xhr.open("POST", backend_url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function(e) {
    console.log("Loaded");
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("Response received");
        sendResponse({data: JSON.parse(xhr.responseText), offset: offset});
        // console.log(xhr.responseText);
        // console.log(JSON.parse(xhr.responseText));
        // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //   // console.log(tabs);
        //   var activeTab = tabs[0];
        //   var m = "received_scores";
        //   if (product_list.length == 1) {
        //     m = "received_score"
        //   }
        //   chrome.tabs.sendMessage(activeTab.id, {message: m, data: JSON.parse(xhr.responseText)});
        // });
      }
      else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function(e) {
    console.error(xhr.statusText);
  }
  xhr.send(JSON.stringify({
    "items": product_list 
  }));

  // xhr.onreadystatechange = (e) => {}

}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
  console.log('Browser action click');
  // chrome.tabs.create({url: 'index.html'});
  console.log("CLICKED!");
});
// chrome.browserAction.onClicked.addListener(function (tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
//   });
// });