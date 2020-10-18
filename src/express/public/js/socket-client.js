'use strict';

const removedValue = String(Date.now());
const removedPattern = RegExp(`(${removedValue})+`);

const createSocket = (eventList, selectorList, parentList) => {
  const socket = io();

  eventList.forEach((evt, index) => {
    const parent = document.querySelector(parentList[index]);
    const selectors = selectorList[index];
    const handler = (data) => {
      selectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          element.outerHTML = removedValue
        };
      });

      parent.innerHTML = parent.innerHTML.replace(removedPattern, data)
    };

    socket.addEventListener(evt, handler)
  });
}

const customEventNames = (eventList) => {
  const pathSegments = document.location.pathname.split('/');
  if (pathSegments[pathSegments.length-2] !== 'articles') {
    return eventList;
  }

  const postId = pathSegments[pathSegments.length-1];
  if (!/^\d+$/.test(postId)) {
    return eventList
  }

  return eventList.map(it => `${it}-${postId}`);
}
