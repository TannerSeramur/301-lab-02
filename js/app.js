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
const allHorns = [];

// prototype.render (renders 1 items)
Horn.prototype.render = function() {
    $('main').append('<div class = "clone" ></div>');
    let $hornContainer = $('div.clone');
    // console.log($hornContainer);

    // grabs inner html of section
    let $clonedHorn = $('#photo-template').html();

    $hornContainer.html($clonedHorn);

    $hornContainer.find('h2').text(this.title);
    // console.log("this" + this);
    $hornContainer.find('img').attr('src', this.image_url);
    $hornContainer.find('p').text(this.description);
    $hornContainer.attr('class', this.keyword);


    // gets rid of class
    // $hornContainer.removeClass("clone");
};

// function that reads json files and calls render function
let readJson = ()=>{
    $.getJSON('./data/page-1.json', data => { 
        // console.log(data);
        data.forEach(element => {
            new Horn(element);
            // console.log(`here ${data[0].title}`);
        })
    }) .then(renderAllHorns);
    
}

// function that renders all
const renderAllHorns = () => {
    allHorns.forEach(element => {
        element.render();
        console.log('element' + element);
    })
    addKeyword(allHorns);
    
}

readJson();

// addes keywords to dropdown makes sure no repeat
function addKeyword(arr){
    const keywords = [];

    arr.forEach(e =>{

        if(keywords.includes(e.keyword)){
            console.log('IN ARRAY!!!');           
        }else{
            console.log('adding to keywords arr');
            
            keywords.push(e.keyword);
            $('select').append('<option value ='+e.keyword+ '>'+e.keyword+'</option>');
            console.log('hii' + keywords);
        }
    })
}


$('.select').on('change', handleFilter);

function handleFilter (event){
    event.preventDefault();
    $('div').hide();
    var selectedValue = $('option:selected').val();

//add a loop to check each element
    allHorns.forEach(element => {
         if(selectedValue === element.keyword){
            $(`div.${selectedValue}`).show();
         }
    })
}


