const myname = document.querySelector('.name').value;
const adult = document.querySelector('.adult').value;
const child = document.querySelector('.child').value;
const date = document.querySelector('.date').value;
const remark = document.querySelector('.remark').value;
const reset = function () {
  document.querySelector('.name').value = '';
  document.querySelector('.adult').value = 1;
  document.querySelector('.child').value = 0;
  document.querySelector('.date').value = '';
  document.querySelector('.remark').value = '';
};
document.querySelector('.reset').addEventListener(reset);
