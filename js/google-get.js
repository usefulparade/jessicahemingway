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
                   simpleSheet: true } );

}


function populateContent(sheet){
    console.log(sheet);
    
    var archiveBlock = document.getElementById("archive");
    var audioBlock = document.getElementById("audio");

    var imgTest = createImg("https://drive.google.com/uc?id=" + sheet[2].CONTENT);
    imgTest.addClass("archiveImage");
    imgTest.parent(archiveBlock);

    // var vidTest = createVideo("https://drive.google.com/uc?export=download&id=" + sheet[0].CONTENT);
    var vidTest = createDiv("<iframe src='" + sheet[0].CONTENT + "/preview' width='640' height='480'></iframe>");
    vidTest.addClass("archiveVideo");
    vidTest.parent(archiveBlock);

    var audioTest = createDiv("<iframe src='" + sheet[1].CONTENT + "/preview' width='640' height='480'></iframe>");
    // var audioTest = createAudio("<iframe src='" + sheet[1].CONTENT + "/preview'></iframe>");
    // audioTest.addClass("archiveAudio");
    audioTest.parent(audioBlock);
}

