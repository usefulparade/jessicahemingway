var spreadsheetURL = "https://docs.google.com/spreadsheets/d/1mJ3ccpWe6SR6FJNw1uRyAp_tcUEuRaDoxVwVyqIKiTI/edit?usp=sharing";

var posts = [];

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

    var dates = [];
    for (j=0;j<sheet.length;j++){
        var d = new Date(sheet[j].DATE);
        dates[j] = d;
    }

    
    
    var archive = document.getElementById("archive");

    for (i=0;i<sheet.length;i++){
        var r1 = random(-30, 30);
        var r2 = random(-30, 30);
        var r3 = random(-30, 30);

        var thisDate = createDiv().addClass('blockDate');
        // var thisMonth = createElement("h4", ("0" + dates[i].getMonth()).slice(-2)).addClass('month');
        // var thisDay = createElement("h4", ("0" + dates[i].getDate()).slice(-2)).addClass('day');
        var thisMonth = createElement("h4", (dates[i].getMonth())).addClass('month');
        var thisDay = createElement("h4", (dates[i].getDate())).addClass('day');
        var thisYear = createElement("h4", ("" + dates[i].getFullYear()).slice(-2)).addClass('year');

        thisMonth.style('transform', 'rotate(' + r1 + 'deg)');
        thisDay.style('transform', 'rotate(' + r2 + 'deg)');
        thisYear.style('transform', 'rotate(' + r3 + 'deg)');
        thisMonth.parent(thisDate);
        thisDay.parent(thisDate);
        thisYear.parent(thisDate);

        var newBlock = new ArchiveBlock(sheet[i].TYPE, thisDate, sheet[i].TITLE, sheet[i].CONTENT, sheet[i].CAPTION);
        posts.push(newBlock);
    }

    for (k=0;k<posts.length;k++){
        posts[k].createBlock();
        posts[k].postBlock();
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

function ArchiveBlock(type, date, title, content, caption){
    this.type = type;
    this.date = date;
    this.title = title;
    this.blockContent = createDiv().addClass('blockContent');
    this.innerContent = content;
    this.caption = caption;
    this.innerContentID = this.innerContent.split('=');

    this.createBlock = function(){

        if (this.title != ""){
            this.titleBlock = createElement('h3', this.title).addClass('titleBlock');
        } else {
            this.titleBlock = createDiv().style('display', 'none').addClass('titleBlock');
        }

        if (this.type == 'video'){
            this.block = createDiv().addClass('archiveBlock videoBlock');
            // this.link = createA(this.innerContent, this.caption, "_blank");
            this.vid = createDiv("<iframe src='https://drive.google.com/file/d/" + this.innerContentID[1] + "/preview'></iframe>");
            this.vid.parent(this.blockContent);
        } else if (this.type == 'audio'){
            this.block = createDiv().addClass('archiveBlock audioBlock');
            // this.link = createA(this.innerContent, this.caption, "_blank");
            this.audio = createDiv("<iframe src='https://drive.google.com/file/d/" + this.innerContentID[1] + "/preview'></iframe>");
            this.audio.parent(this.blockContent);
        } else if (this.type == 'image'){
            this.block = createDiv().addClass('archiveBlock imgBlock');
            this.imgBlock = createImg('https://drive.google.com/uc?id=' + this.innerContentID[1]);
            this.imgBlock.parent(this.blockContent);
            this.link = createA(this.innerContent, this.caption, "_blank");
            this.link.parent(this.blockContent);
        } else if (this.type == 'text'){
            this.block = createDiv().addClass('archiveBlock textBlock');
            this.text = createP(this.innerContent);
            this.text.parent(this.blockContent);
        } else {

        }
    };

    this.postBlock = function(){
        this.titleBlock.parent(this.block);
        this.date.parent(this.block);
        this.blockContent.parent(this.block);
        this.block.parent(archive);
    };
}

