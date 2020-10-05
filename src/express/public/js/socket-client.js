'use strict';

var socket = io('http://localhost:8081');

var createSocket = function(eventList, selectorList, parentList) {
  for (var i = 0; i < selectorList.length; i++) {
    var parent = document.querySelector(parentList[i]);
    var handler = (function(parent, selectors){
      return function(data) {
        for (var k = 0; k < selectors.length; k++) {
          var element = document.querySelector(selectors[k]);
          if (element) {element.outerHTML = '###'};
        };
        parent.innerHTML = parent.innerHTML.replace(/(###)+/, data);
      }
    })(parent, selectorList[i]);

    socket.addEventListener(eventList[i], handler)
  };
}

var customEventNames = function (eventList) {
  var pathSegments = document.location.pathname.split('/');
  if (pathSegments[pathSegments.length-2] !== 'articles') {
    return eventList;
  }

  var postId = pathSegments[pathSegments.length-1];
  if (!/^\d+$/.test(postId)) {
    return eventList
  }

  var customEventList = [];
  for (var i = 0; i < eventList.length; i++) {
    customEventList.push(eventList[i]+'-'+postId);
  };

  return customEventList;
}
