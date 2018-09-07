document.getElementById("input-keywords").value =
  decodeURI(window.location.search.replace("?keywords=", "")) || "";
