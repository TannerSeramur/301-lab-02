'use strict';

// constructor function that pushes to array
function Horn(hornObj){
  this.image_url = hornObj.image_url;
  this.title = hornObj.title;
  this.description = hornObj.description;
  this.keyword = hornObj.keyword;
  this.horns = hornObj.horns;

  allHorns.push(this);
}

// array for storing obj
var allHorns = [];

Horn.prototype.render = function() {
  let source = $('#horn-animal-template').html();
  let template = Handlebars.compile(source);
  var html = template(this);
  $('#photo-template').append(html);
};

// function that reads json files and calls render function
let readJson = (sourceFile)=>{
  $.getJSON(sourceFile, data => {
    data.forEach(element => {
      new Horn(element);
    })
  }) .then(renderAllHorns);

}

// function that renders all
const renderAllHorns = () => {
  $('#photo-template').html(' ');
  allHorns.forEach(element => {
    element.render();
  })
  addKeyword(allHorns);
}


readJson('./data/page-1.json');

// addes keywords to dropdown makes sure no repeat
function addKeyword(arr){
  const keywords = [];
  arr.forEach(e =>{
    if(keywords.includes(e.keyword)){
    }else{
      keywords.push(e.keyword);
      $('.select').append('<option value ='+e.keyword+ '>'+e.keyword+'</option>');
    }
  })
}


$('.select').on('change', handleFilter);

function handleFilter (event){
  event.preventDefault();
  $('div').hide();
  var selectedValue = $(this).val();

  allHorns.forEach(element => {
    if(selectedValue === element.keyword){
      $(`div.${selectedValue}`).show();
    }
    else if (selectedValue === 'default'){
      $('div').show();
    }
  })
}

function initializeSelect() {
  $('.select').html('');
  $('.select').append('<option value="default"> choose filter </option>');

  $('.sort option[value="default"]').prop('selected', true);
 
}

//add event listner to select
$('.sort').on('change', sortAnimals);

//sort the array
function sortAnimals(){
  let sorter = $(this).find(':selected').val();
  console.log(logArray('horns'));
  console.log(sorter, 'sorter');

  allHorns.sort((a,b)=>{
    if(sorter === 'names') {
      return ( a['title'] > b['title'] ) ? 1 : ( a['title'] < b['title'] ) ? -1 : 0;
    }
    if(sorter === 'horns') {
      return a['horns'] - b['horns'];
    }
  });
  renderAllHorns();
  console.log(logArray('title'));
  console.log(logArray('horns'));
}

function logArray(prop) {
  var s = '';
  allHorns.forEach(e =>{
    s += e[prop] + '\n';
  });
  return s;
}




//add event listener on the <ul>
$('li').on('click', clickPageHandler);

function clickPageHandler (event){
  event.preventDefault();
  let jsonFile = '';
  var pageNum = $(this).html();
  if (pageNum === 'Page 2'){
    allHorns =[];
    $('div').hide();
    jsonFile = 'page-2.json';
  }
  else{
    allHorns =[];
    $('div').hide();
    jsonFile = 'page-1.json';
  }
  
  readJson(`./data/${jsonFile}`);
  initializeSelect();
}

clickPageHandler();



