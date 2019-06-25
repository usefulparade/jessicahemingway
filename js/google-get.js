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
    
    var archive = document.getElementById("archive");
    var audioBlock = document.getElementById("audio");

    for (i=0;i<sheet.length;i++){
        var thisDate = createP(sheet[i].DATE);
        var thisBlock;
        var thisContent;

        if (sheet[i].TYPE == 'video'){
            thisBlock = createDiv().addClass('videoBlock-sm');
            thisContent = createA(sheet[i].CONTENT, sheet[i].CAPTION, "_blank");
        } else if (sheet[i].TYPE == 'audio'){
            thisBlock = createDiv().addClass('audioBlock-sm');
            thisContent = createA(sheet[i].CONTENT, sheet[i].CAPTION, "_blank");
        } else if (sheet[i].TYPE == 'image'){
            thisBlock = createDiv().addClass('imgBlock-sm');
            thisContent = createA(sheet[i].CONTENT, sheet[i].CAPTION, "_blank");
        } else if (sheet[i].TYPE == 'text'){
            thisBlock = createDiv().addClass('textBlock-sm');
            thisContent = createP(sheet[i].CONTENT);
        } else {

        }
        thisDate.parent(thisBlock);
        thisContent.parent(thisBlock);
        thisBlock.parent(archive);
    }

    // var imgTest = createImg("https://drive.google.com/uc?id=" + sheet[2].CONTENT);
    // var imgLink = createA("www.google.com", "hi");
    // var imgAspect = createDiv().addClass('imageAspect');
    // var imgBlock = createDiv().addClass('imageBlock');
    
    // imgTest.parent(imgAspect);
    // imgAspect.parent(imgBlock);
    // imgBlock.parent(archive);

    // var vidTest = createDiv("<iframe src='" + sheet[0].CONTENT + "/preview' width='640' height='480'></iframe>");

    // var vidAspect = createDiv().addClass("four-by-three");
    // var vidBlock = createDiv().addClass("videoBlock");
    // vidTest.parent(vidAspect);
    // vidAspect.parent(vidBlock);
    // vidBlock.parent(archive);

    // var audioTest = createDiv("<iframe src='" + sheet[1].CONTENT + "/preview'></iframe>");
    // audioTest.addClass("audioBlock");
    // audioTest.parent(archive);
}

function openArchive(){
    document.getElementById("archive").style = "display: block;";
    document.getElementById("about").style = "display: none;";
}

function openAbout(){
    document.getElementById("archive").style = "display: none;";
    document.getElementById("about").style = "display: block;";
}

