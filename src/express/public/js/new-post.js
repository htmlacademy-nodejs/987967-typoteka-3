'use strict';

var fileInput = document.querySelector('.form__image-loader--publication input');
var fileNameInput = document.querySelector('#image-name-field');

document.querySelector('.form__field--post-image > button').addEventListener('click', function() {
  fileInput.value = '';
  fileNameInput.value = '';  
});
