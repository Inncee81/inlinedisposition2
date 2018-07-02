re = /^\s*attachment/i

// Force content-disposition to inline
function fixDisposition(e) {

  e.responseHeaders.forEach(function(header) {
    if(header.name == "Content-Disposition") {
      header.value = header.value.replace(re, "inline");
    }
  });

  return {responseHeaders: e.responseHeaders};
}

// Listen to all responses to look at their headers
browser.webRequest.onHeadersReceived.addListener(
  fixDisposition,
  {urls: ["<all_urls>"]},
  ["blocking", "responseHeaders"]
);