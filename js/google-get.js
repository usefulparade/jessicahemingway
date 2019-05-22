var spreadsheetURL = "https://docs.google.com/spreadsheets/d/1mJ3ccpWe6SR6FJNw1uRyAp_tcUEuRaDoxVwVyqIKiTI/edit?usp=sharing";

function setup(){
    init();
}

function init (){
    Tabletop.init( { key: spreadsheetURL,
                   callback: function(data, tabletop) { 
                       
                    //    console.log(dataGlobal);
                    // console.log(data);
                    populateContent(data);
                    //    archive = loadJSON(data);
                   },
                   simpleSheet: true } )

}


function populateContent(sheet){
    console.log(sheet);
}

