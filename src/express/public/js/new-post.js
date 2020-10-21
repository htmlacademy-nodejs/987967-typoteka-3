'use strict';

const fileInput = document.querySelector('.form__image-loader--publication input');
const fileNameInput = document.querySelector('#image-name-field');

document.querySelector('.form__field--post-image > button').addEventListener('click', function() {
  fileInput.value = '';
  fileNameInput.value = '';  
});
