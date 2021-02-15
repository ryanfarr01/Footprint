// We're on an amazon fresh page
console.log("Hello from Footprint!")
console.log(window.location.pathname);

var product_divs_names = null;
var loadedScores = false;
var userInfo = null;

// Check login
chrome.runtime.sendMessage(
  { message: "check_user"}, function(response) {
    console.log(response.userInfo);  
    userInfo = response.userInfo;
  });


// Scan page for products, find their names and the divs containing them
var pageType = null;
// console.log(document.getElementById("productTitle") != null);
if (window.location.pathname.startsWith("/b") || 
  window.location.pathname.startsWith("/l") ||
  window.location.pathname.startsWith("/alm/") ||
  window.location.pathname.startsWith("/s") ||
  window.location.pathname.startsWith("/AmazonFresh/b/") ||
  window.location.pathname.startsWith("/gp/buy/fresh-byg/")) {
  console.log("Browsing page");
  pageType = "browsing_page";
} else if (window.location.pathname.startsWith("/gp/product/") || document.getElementById("productTitle") != null) {
  console.log("Product Page");
  pageType = "product_page";
} else if (window.location.pathname.startsWith("/gp/cart/")) {
  console.log("Shopping cart page");
  pageType = "shopping_cart";
} else if (window.location.pathname.startsWith("/gp/buy/spc")) {
  console.log("Checkout page");
  pageType = "checkout_page";
} else {
  console.log("Page not recognized");
}

// document.getElementsByClassName("a-link-normal sc-product-link") != null

if (pageType == "browsing_page") {
  browsingPage();
} else if (pageType == "product_page") {
  productPage();
} else if (pageType == "shopping_cart") {
  shoppingCart();
} else if (pageType == "checkout_page") {
  checkoutPage();
}

function browsingPage() {
  var res = scanBrowsingPage();
  var product_names = res['data'];
  product_divs_names = res['dict'];
  console.log(product_names);

  var offset = 0;
  let batch_size = 10
  while (offset < product_names.length) {
    var endpoint = Math.min(offset+batch_size, product_names.length);
    var product_batch = product_names.slice(offset,endpoint);
    
    // Send a message to the background script in order to ping the API
    // product_names is a list of names ["15oz Apple Juice Box",""...]
    chrome.runtime.sendMessage(
      { message: "found_products", product_names: product_batch, offset: offset}, function(res) {
        console.log("Received scores from API");
        console.log(res);
        var response = res.data;
        var indoffset = res.offset;
    
        // console.log(response);
        for (r in response.items) {
          product_index = response.items[r]['index'] + indoffset;
          product_raw_score = response.items[r]['raw_score'];
          product_score = response.items[r]['score'];
          product_name = response.items[r]['name'];
          category = response.items[r]['category'];
          sub_category = response.items[r]['sub_category'];

          console.log(product_name, product_score);
          if (product_divs_names[product_name] != null) {
            console.log("Labelling product " + product_name + " with response " + response.items[r]);
            labelItem(product_divs_names[product_name]["div"], response.items[r]);
          loadedScores = true;
          }
        }   
      });
      offset += batch_size;
      wait(50);
    }

  // Testing the labelling
  // labelItem(product_divs[0]);
}

function wait(ms) {
  var start = Date.now(),
      now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

// Look at html on page for products
// names: ["GoGo SqueeZ Organic Applesauce...", ""...]
// divs: [html_containing_product1, html...]
function scanBrowsingPage() {
  var product_divs = document.getElementsByClassName("a-box-group standard-kepler-widget-product p13n-asin");
  console.log(product_divs);
  var product_names = [];
  product_divs_names = {}
  for (i in product_divs) {
    if (product_divs[i] instanceof HTMLElement) {
      if (product_divs[i].querySelector("a.a-link-normal[title][href]") != null) {
        console.log({"name": product_divs[i].querySelector("a.a-link-normal[title][href]")});
        var name = product_divs[i].querySelector("a.a-link-normal[title][href]").title;
        product_names.push({"name": product_divs[i].querySelector("a.a-link-normal[title][href]").title});
        product_divs_names[name] = {"div": product_divs[i]};
      }
    }
  } 
  return {"dict": product_divs_names, "data": product_names};  
}


function labelItem(item_div, data) {
  score = data['score'];
  raw_score = data['raw_score'];
  category = data['category'];
  sub_category = data['sub_category'];
  name = data['name'];

  var img = document.createElement("img");
  if (score == 1) {
    img.src = chrome.extension.getURL('labels/plantG.svg');
    img.alt = "Green Footprint Score :)";
  } else if (score == 2) {
    img.src = chrome.extension.getURL('labels/plantY.svg');
    img.alt = "Yellow Footprint Score :|";
  } else if (score == 3) {
    img.src = chrome.extension.getURL('labels/plantR.svg');
    img.alt = "Green Footprint Score :(";
  } else {
    img.src = chrome.extension.getURL('labels/question.png');
    img.alt = "Unkown Footprint Score :?";
  }

  img.height = 50;
  img.width = 50;
  img.align = "Right"
  img.class = "tooltip";
  
  var imdiv = document.createElement("div");
  imdiv.classList.add("tooltip");
  imdiv.appendChild(img);
  var s = document.createElement("span");
  s.classList.add("tooltiptext");
  s.innerHTML = name.substring(0, 8) + "...<br>RAW emissions score of " + raw_score + " kgCO2/kg";
  // s.innerHTML = "RAW emissions score of " + raw_score + " kgCO2/kg";
  imdiv.appendChild(s);
  
  //grab the div with the fresh logo in it
  fresh_div = item_div.querySelector("div.a-box-group.a-spacing-none i.a-icon.a-icon-fresh.kepler-freshIcon");
  // console.log(item_div.childNodes);
  item_div.insertBefore(imdiv, item_div.childNodes[5]);

}


function productPage() {
  var scan = scanProductPage();
  var product_name = scan["name"];
  product_divs = scan["div"];
  
  chrome.runtime.sendMessage(
    { message: "found_products", product_names: product_name}, function(res) {
      console.log("Received scores from API");
      console.log(res);
      response = res.data;
  
      console.log(response);
      for (r in response.items) {
        product_index = response.items[r]['index'];
        product_score = response.items[r]['score'];
        raw_score = response.items[r]['raw_score'];
        category = response.items[r]['category'];
        sub_category = response.items[r]['sub_category'];


        console.log(product_index)
        if (product_divs[product_index] != null) {
          labelItem(product_divs[product_index], response.items[r]);
        loadedScores = true;
        }
      }   
    });
}

function scanProductPage() {
  var product_divs = [document.getElementById("centerCol")];
  console.log(product_divs);
  product_name = []
  product_name.push({"name": document.getElementById("productTitle").innerText});
  console.log(product_name);

  return {"name": product_name, "div": product_divs};  
}

function shoppingCart() {
  var scan = scanShoppingCart();
  var product_names = scan["names"];
  product_divs = scan["divs"];
  chrome.runtime.sendMessage(
    { message: "found_products", product_names: product_names}, function(res) {
      console.log("Received scores from API");
      response = res.data;
      // console.log(response.items);
      for (r in response.items) {
        product_index = response.items[r]['index'];
        product_score = response.items[r]['score'];
        raw_score = response.items[r]['raw_score'];
        category = response.items[r]['category'];
        sub_category = response.items[r]['sub_category'];

        if (product_divs[product_index] != null) {
          labelItem(product_divs[product_index], response.items[r]);
        }
      }
    });
}

function scanShoppingCart() {
  var product_divs = document.getElementsByClassName("a-fixed-left-grid");
  console.log(product_divs)
  var product_names = [];
  for (i in product_divs) {
    if (product_divs[i] instanceof HTMLElement) {
      if (product_divs[i].getElementsByClassName("a-size-medium sc-product-title a-text-bold").length > 0) {
        console.log(product_divs[i].getElementsByClassName("a-size-medium sc-product-title a-text-bold"));
          
        product_names.push({"name": product_divs[i].getElementsByClassName("a-size-medium sc-product-title a-text-bold")[0].innerText});
      }
      // console.log({"name": product_divs[i].querySelector("a.a-link-normal[title][href]").title});
      console.log(product_names);
    }
  } 
  return {"names": product_names, "divs": product_divs};  
}

function checkoutPage() {
  scanCheckoutPage();
}

function scanCheckoutPage() {
  var column_div = document.getElementById("right-grid");
  console.log(column_div);
  console.log(document.getElementsByClassName("asin-title"));

  var your_order = [];
  var items = document.getElementsByClassName("asin-title");
  console.log(items);
  for (i in items) {
    if (items[i] instanceof HTMLElement) {
      console.log(items[i]);
      your_order.push({"name": items[i].innerText});
    }
  };
  console.log(your_order);
  chrome.runtime.sendMessage(
    { message: "found_products", product_names: your_order}, function(res) {
      console.log("Received scores from API");
      response = res.data;
      // console.log(response.items);
      product_scores = []
      for (r in response.items) {
        product_index = response.items[r]['index'];
        product_score = response.items[r]['score'];
        product_raw_score = response.items[r]['raw_score']
        product_scores.push(product_raw_score);
      }
      var product_score_sum = 0;
      var dollarsPerKg = .011;
      var offset_cost = 0;
      let weights = [5.44, .76, .36, 0.59]
      for (p in product_scores) {
        var w = 1;
        if (p < weights.length) {
          w = weights[p]
        }
        offset_cost += product_scores[p] * dollarsPerKg * w;  
        product_score_sum += product_scores[p];
      }
      console.log(product_score_sum);
      var raw_avg_score = parseFloat(product_score_sum) / product_scores.length;
      var avg_score = rawScoreToScore(raw_avg_score);
      console.log("Raw_avg_score", raw_avg_score);
      var rating = "Green";
      var imgURL = chrome.extension.getURL('labels/plantG.svg')
      var breakdown_txt = "The products in your shopping cart are associated with low rates of greenhouse gas emissions";
      if (avg_score == 2) {
        rating = "Yellow";
        imgURL = chrome.extension.getURL('labels/plantY.svg');
        breakdown_txt = "The products in your shopping cart are associated with moderate rates of greenhouse gas emissions";
      } else if (avg_score == 3) {
        rating = "Red";
        imgURL = chrome.extension.getURL('labels/plantR.svg');
        breakdown_txt = "The products in your shopping cart are associated with high rates of greenhouse gas emissions";
      }

      var carbon_offset_box = document.createElement("div");

      carbon_offset_box.id = "carbonOffsetBox";
      var carbon_offset_style = "<style> " +
      "#carbonOffsetBox {background-color: white; width: 100%; border: 5px solid #60cb8f; padding: 5px; margin: 0px; align: Left;}" +
      " #carbonOffsetBtn {background-color: #60cb8f; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;}"
      "</style>";
      carbon_offset_box.innerHTML = carbon_offset_style;

      var logo = document.createElement("img");
      logo.src = chrome.extension.getURL('labels/logo.png');
      logo.alt = "Footprint logo";

      var carbon_offset_txt = document.createElement("p");
      var label_img = "<img src="+imgURL+" width=30 heigh=30></img>"
      carbon_offset_txt.innerHTML = "<br><font size='3'>Your order gets a " + label_img + " footprint rating<br><br></font>";
      
      var carbon_offset_breakdown = document.createElement("p");
      carbon_offset_breakdown.innerHTML = breakdown_txt; 


      var carbon_offset_price = document.createElement("p");
      carbon_offset_price.innerHTML = "<br><br>We've calculated the cost of offsetting your order: <b>$" + Math.round(offset_cost*100)/100 + "</b>";
      
      var modal_el = document.createElement("div")
      modal_el.id="myModal";
      modal_el.classList.add("modal");
      var modal_content = document.createElement("div");
      modal_content.classList.add("modal-content");
      var modSpan = document.createElement("span");
      modSpan.classList.add("thecloser");
      modSpan.innerHTML = "&times;";
      var modal_form= document.createElement("form");
      modal_form.action="";
      modal_form.method="POST";
      var script = document.createElement("script");
      script.src = "https://checkout.stripe.com/checkout.js";
      script.classList.add("stripe-button");
      script.setAttribute('data-amount', offset_cost);
      script.setAttribute('data-key', "pk_test_4GVPCVLSMaocODo4YZ3MdFtD");
      script.setAttribute('data-name', "Stripe.com");
      script.setAttribute('data-description', "Pay your "+Math.round(100*offset_cost)/100 +" carbon offset");
      script.setAttribute('data-image', "https://stripe.com/img/documentation/checkout/marketplace.png");
      script.setAttribute('data-locale', "auto");
      script.setAttribute('data-zip-code', "true");
      script.width = "500px";
      script.height = "200px";
      

      modal_form.appendChild(script);
      modSpan.appendChild(modal_form);
      modal_content.appendChild(modSpan);
      modal_el.appendChild(modal_content);

      // modal_el.innerHTML = '<body><div id="myModal" class="modal"> <!-- Modal content --> <div class="modal-content"> <span class="close" id="thecloser">&times;</span> <form action="your-server-side-code" method="POST"> <script src="https://checkout.stripe.com/checkout.js" class="stripe-button" data-key="pk_test_TYooMQauvdEDq54NiTphI7jx" data-amount="999" data-name="Stripe.com" data-description="Example charge" data-image="https://stripe.com/img/documentation/checkout/marketplace.png" data-locale="auto" data-zip-code="true"></script></form></body></div></div>';

      var carbon_offset_btn = document.createElement("button");
      carbon_offset_btn.addEventListener("click", function(e){
        event.preventDefault();
      });
      carbon_offset_btn.innerHTML = "Offset your Order";
      carbon_offset_btn.align = "Center";
      carbon_offset_btn.id = "carbonOffsetBtn";
      // When the user clicks on the button, open the modal 
      carbon_offset_btn.onclick = function() {
        modal_el.style.display = "block";
      }
      // When the user clicks on <span> (x), close the modal
      modSpan.onclick = function() {
        modal_el.style.display = "none";
      }
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal_el) {
            modal_el.style.display = "none";
        }
      }



      carbon_offset_box.appendChild(logo);
      
      carbon_offset_box.appendChild(carbon_offset_txt);
      carbon_offset_box.appendChild(carbon_offset_breakdown)
      carbon_offset_box.appendChild(carbon_offset_price);
      carbon_offset_box.appendChild(modal_el);
      carbon_offset_box.appendChild(carbon_offset_btn);
    
      column_div.appendChild(carbon_offset_box);    
    });

function rawScoreToScore(raw) {
  if (raw <= 0.25) {
    return 1;
  } else if (raw <= 1) {
    return 2;
  } else {
    return 3;
  }
}


  // var product_names = [];
  // for (i in product_divs) {
  //   if (product_divs[i] instanceof HTMLElement) {
  //     if (product_divs[i].getElementsByClassName("a-size-medium sc-product-title a-text-bold").length > 0) {
  //       console.log(product_divs[i].getElementsByClassName("a-size-medium sc-product-title a-text-bold"));
          
  //       product_names.push({"name": product_divs[i].getElementsByClassName("a-size-medium sc-product-title a-text-bold")[0].innerText});
  //     }
  //     // console.log({"name": product_divs[i].querySelector("a.a-link-normal[title][href]").title});
  //     console.log(product_names);
  //   }
  // } 
  // return {"names": product_names, "divs": product_divs};  
}

// Receive messages from background
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("Got message");
      if( request.message === "clicked_browser_action" ) {
        // var firstHref = $("a[href^='http']").eq(0).attr("href");
  
        console.log("here");
      }

      // if (request.message == "received_scores") {
      //   console.log("Received scores from API");
      //   if (!loadedScores) {
      //     response = request.data;
      //     // console.log(response.items);
      //     for (r in response.items) {
      //       product_index = response.items[r]['index'];
      //       product_score = response.items[r]['score'];
      //       console.log(product_index)
      //       if (product_divs[product_index] != null) {
      //         labelItem(product_divs[product_index], product_score);
      //       loadedScores = true;
      //       }
      //     }
      //   }
      // } else if (request.message == "received_score") {
      //   console.log("Received scores from API");
      //   if (!loadedScores) {
      //     response = request.data;
      //     product_score = response.items[0]['score'];
      //     labelItem(product_divs[0], product_score);
      //     loadedScores = true;  
      //   }
      // }
    }
  );
