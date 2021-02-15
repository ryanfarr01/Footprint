  window.onload = function() {
    document.querySelector('button').addEventListener('click', function() {
      chrome.identity.getAuthToken({interactive: true}, function(token) {
        if (chrome.runtime.lastError) {
          alert(chrome.runtime.lastError.message);
          return;
        }
        console.log("Getting user information");
        let init = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          'contentType': 'json'
        };
        fetch(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            init)
            .then((response) => response.json())
            .then(function(data) {
              console.log(data);
              username = data.username;
              chrome.browserAction.setPopup({popup: "loggedIn.html"});
            });
      });
    });
  };