// Disable the context menu
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

[].forEach.call(document.querySelectorAll(".icon"), function(icon) {
  icon.addEventListener("click", function(e) {

    // Create JSON object with the action we want to trigger and the current UNIX date
    var data = {
      "action": icon.getAttribute("data-action"),
      "date": new Date().getTime()
    }

    // Put the JSON as a string in the hash
    window.location.hash = JSON.stringify(data);
  });
});