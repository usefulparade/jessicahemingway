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

        // three random numbers for date rotations
        var r1 = random(-30, 30);
        var r2 = random(-30, 30);
        var r3 = random(-30, 30);

        var thisDate = createDiv().addClass('blockDate');
        // var thisMonth = createElement("h4", ("0" + dates[i].getMonth()).slice(-2)).addClass('month');
        // var thisDay = createElement("h4", ("0" + dates[i].getDate()).slice(-2)).addClass('day');
        var thisMonth = createElement("h4", (dates[i].getMonth()) + 1).addClass('month');
        var thisDay = createElement("h4", (dates[i].getDate())).addClass('day');
        var thisYear = createElement("h4", ("" + dates[i].getFullYear()).slice(-2)).addClass('year');

        // GIVE DATES RANDOM ROTATIONS AND ANIMATION DELAYS
        thisMonth.style('transform', 'rotate(' + r1 + 'deg)');
        thisMonth.style('animation-delay', random(0,3) + 's');
        thisDay.style('transform', 'rotate(' + r2 + 'deg)');
        thisDay.style('animation-delay', random(0,3) + 's');
        thisYear.style('transform', 'rotate(' + r3 + 'deg)');
        thisYear.style('animation-delay', random(0,3) + 's');

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
    //SHOW ARCHIVE, HIDE GARDEN, CHANGE COLOR
    document.getElementById("archive").style = "display: block;";
    document.getElementById("garden").style = "display: none;";
    document.getElementById("column").style = "background-color: var(--color-three);";
}

function openGarden(){
    //HIDE ARCHIVE, SHOW GARDEN, CHANGE COLOR
    document.getElementById("archive").style = "display: none;";
    document.getElementById("garden").style = "display: block;";
    document.getElementById("column").style = "background-color: var(--color-six);";
}

function ArchiveBlock(type, date, title, content, caption){
    this.type = type;
    this.date = date;
    this.title = title;
    this.blockContent = createDiv().addClass('blockContent');
    this.blockCaption = createDiv().addClass('blockCaption');
    this.innerContent = content;
    this.caption = caption;
    this.innerContentID = this.innerContent.split('=');

    this.createBlock = function(){

        if (this.title != ""){
            this.titleBlock = createElement('h3', this.title).addClass('titleBlock');
            this.titleBlock.style('animation-delay', random(0,3) + 's');
            this.titleBlock.style('animation-duration', random(2,5) + 's');
        } else {
            this.titleBlock = createDiv().style('display', 'none').addClass('titleBlock');
        }

        if (this.type == 'video'){
            this.block = createDiv().addClass('archiveBlock videoBlock');
            // this.link = createA(this.innerContent, this.caption, "_blank");
            this.vid = createDiv("<iframe src='https://drive.google.com/file/d/" + this.innerContentID[1] + "/preview'></iframe>");
            this.vid.parent(this.blockContent);

            // ADD CAPTION
            this.captionContent = createElement('h5', this.caption);
            this.captionContent.parent(this.blockCaption);
            
        } else if (this.type == 'audio'){
            //random number for audio block rotation
            var r4 = random(70, 88);

            this.block = createDiv().addClass('archiveBlock audioBlock');
            // this.link = createA(this.innerContent, this.caption, "_blank");
            this.audio = createDiv("<iframe src='https://drive.google.com/file/d/" + this.innerContentID[1] + "/preview'></iframe>");
            this.audioWrapper = createDiv().addClass('audioWrapper');

            this.audioWrapper.style('transform', 'rotate(' + r4 + 'deg)');
            this.audioWrapper.parent(this.blockContent);
            this.audio.parent(this.audioWrapper);

            // ADD CAPTION
            this.captionContent = createElement('h5', this.caption);
            this.captionContent.parent(this.blockCaption);

        } else if (this.type == 'image'){
            this.block = createDiv().addClass('archiveBlock imgBlock');
            this.imgBlock = createImg('https://drive.google.com/uc?export=view&id=' + this.innerContentID[1]);
            this.imgBlock.parent(this.blockContent);
            // this.link = createA(this.innerContent, this.caption, "_blank");
            // this.link.parent(this.blockContent);

            // ADD CAPTION
            this.captionContent = createElement('h5', this.caption);
            this.captionContent.parent(this.blockCaption);
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
        this.blockCaption.parent(this.block);
        this.block.parent(archive);
    };
}

