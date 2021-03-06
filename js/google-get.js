var spreadsheetURL = "https://docs.google.com/spreadsheets/d/1mJ3ccpWe6SR6FJNw1uRyAp_tcUEuRaDoxVwVyqIKiTI/edit?usp=sharing";

var fullSheet = [];

var posts = [];

var dates = [];

var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

var currentPost = 0;

var numPostsToLoad = 3;

var targetPost = currentPost + numPostsToLoad;

var totalPosts = 0;

function setup(){
    init();
}

function init (){
    Tabletop.init( { key: spreadsheetURL,
                   callback: function(data, tabletop) { 
                    // when we get the data, call our function 
                    // to fill the site :)
                    populateContent(data);
                   },
                   simpleSheet: true } );

}

// this function grabs the data that we pulled from google, 
// creates useable date objects, sorts the array chronologically,
// and then creates & posts the archive blocks.

function populateContent(sheet){

    fullSheet = sheet;

    for (l=0;l<sheet.length;l++){
        if (sheet[l].DATE != ""){

        } else {
            sheet[l].DATE = sheet[l].TIMESTAMP;
        }
    }

    
    sheet.sort(function(a, b){
        var c = new Date(a.DATE);
        var d = new Date(b.DATE);
        return c-d;
    });

    // this sorts the array from the most recent post down to the oldest
    sheet.reverse();

    for (j=0;j<sheet.length;j++){
        var d;
        if (sheet[j].DATE != ""){
            d = new Date(sheet[j].DATE);
        } else {
            d = new Date(sheet[j].TIMESTAMP);
        }
        dates[j] = d;
    }

    totalPosts = sheet.length;
    
    var archive = document.getElementById("archive");


    for (k=0;k<posts.length;k++){
        posts[k].createBlock();
        // posts[k].postBlock();
    }

    loadMorePosts();
}

function loadMorePosts(){
    if (currentPost + numPostsToLoad < totalPosts){
        targetPost = currentPost + numPostsToLoad;
    } else {
        targetPost = totalPosts;
        document.getElementById("buttons").style = "display: none;";
    }
    
    for (i=currentPost;i<targetPost;i++){
        initializeNewArchiveBlock(i);
        posts[i].createBlock();
        posts[i].postBlock();
    }
    currentPost = targetPost;
    
}

function loadAllPosts(){
    for (i=currentPost;i<totalPosts;i++){
        initializeNewArchiveBlock(i);
        posts[i].createBlock();
        posts[i].postBlock();
    }
    currentPost = totalPosts;
    document.getElementById("buttons").style = "display: none;";
}

function openArchive(){
    //SHOW ARCHIVE, HIDE GARDEN, CHANGE COLOR
    
    document.getElementById("archive").style = "display: block;";
    if (currentPost < totalPosts){
        document.getElementById("buttons").style = "display: block;";
    }
    document.getElementById("garden").style = "display: none;";
    document.getElementById("column").style = "background-color: var(--color-three);";
}

function openGarden(){
    //HIDE ARCHIVE, SHOW GARDEN, CHANGE COLOR
    document.getElementById("archive").style = "display: none;";
    document.getElementById("buttons").style = "display: none;";
    document.getElementById("garden").style = "display: block;";
    document.getElementById("column").style = "background-color: var(--color-six);";
}

function initializeNewArchiveBlock(currentIndex) {
        // three random numbers for date rotations
        var r1 = random(-30, 30);
        var r2 = random(-30, 30);
        var r3 = random(-30, 30);

        var thisDate = createDiv().addClass('bg' + int(random(1,4))).addClass('blockDate');
        var thisMonth = createElement("h4", months[(dates[currentIndex].getMonth())]).addClass('month');
        var thisDay = createElement("h4", (dates[currentIndex].getDate())).addClass('day');
        var thisYear = createElement("h4", ("" + dates[currentIndex].getFullYear()).slice(-2)).addClass('year');

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

        var newBlock = new ArchiveBlock(fullSheet[currentIndex].TYPE, thisDate, fullSheet[currentIndex].TITLE, fullSheet[currentIndex].MEDIA, fullSheet[currentIndex].TEXT, fullSheet[currentIndex].EMBED, fullSheet[currentIndex].CAPTION, fullSheet[currentIndex].LINK);
        posts.push(newBlock);
}

function ArchiveBlock(type, date, title, content, text, embed, caption, link){
    this.type = type;
    this.date = date;
    this.title = title;
    this.blockContent = createDiv().addClass('blockContent');
    this.blockCaption = createDiv().addClass('blockCaption');
    this.innerMedia = content;
    this.innerText = text;
    this.embed = embed;
    this.caption = caption;
    this.hasCaption = false;
    this.link = link;
    this.hasLink = false;

    this.createBlock = function(){

        if (this.innerMedia != ""){
            this.innerMediaID = this.innerMedia.split('=');
        }

        if (this.link != ""){
            this.hasLink = true;
        } else {
            this.hasLink = false;
        }

        if (this.caption != ""){
            this.hasCaption = true;
        } else {
            this.hasCaption = false;
        }

        //MAKE TITLE, RANDOMIZE ANIMATION
        if (this.title != ""){
            this.titleBlock = createElement('h3', this.title).addClass('titleBlock');
            this.titleBlock.style('animation-delay', random(0,3) + 's');
            this.titleBlock.style('animation-duration', random(2,5) + 's');
        } else {
            this.titleBlock = createDiv().style('display', 'none').addClass('titleBlock');
        }


        //MAKE CONTENT BLOCKS!

        if (this.type == 'video'){
            this.block = createDiv().addClass('archiveBlock videoBlock');
            this.vid = createDiv("<iframe src='https://drive.google.com/file/d/" + this.innerMediaID[1] + "/preview'></iframe>");
            this.vid.parent(this.blockContent);

            // ADD CAPTION
            if (!this.hasCaption){

            } else {
                if (!this.hasLink) {
                    this.captionH5 = createElement('h5', this.caption);
                } else {
                    this.captionH5 = createElement('h5');
                    this.captionA = createA(this.link, this.caption, '_blank');
                    this.captionA.parent(this.captionH5);
                }
                this.captionH5.parent(this.blockCaption);
            }
            
        } else if (this.type == 'audio'){
            //random number for audio block rotation
            var r4 = random(70, 88);

            this.block = createDiv().addClass('archiveBlock audioBlock');
            this.audio = createDiv("<iframe src='https://drive.google.com/file/d/" + this.innerMediaID[1] + "/preview'></iframe>");
            this.audioWrapper = createDiv().addClass('audioWrapper');

            this.audioWrapper.style('transform', 'rotate(' + r4 + 'deg)');
            this.audioWrapper.parent(this.blockContent);
            this.audio.parent(this.audioWrapper);

            // ADD CAPTION
            if (!this.hasCaption){

            } else {
                if (!this.hasLink) {
                    this.captionH5 = createElement('h5', this.caption);
                } else {
                    this.captionH5 = createElement('h5');
                    this.captionA = createA(this.link, this.caption, '_blank');
                    this.captionA.parent(this.captionH5);
                }
                this.captionH5.parent(this.blockCaption);
            }

        } else if (this.type == 'image'){
            this.block = createDiv().addClass('archiveBlock imgBlock');
            
            this.imgBlock = createImg('https://drive.google.com/uc?export=view&id=' + this.innerMediaID[1]);
            this.imgBlock.parent(this.blockContent);

            // ADD CAPTION
            if (!this.hasCaption){

            } else {
                if (!this.hasLink) {
                    this.captionH5 = createElement('h5', this.caption);
                } else {
                    this.captionH5 = createElement('h5');
                    this.captionA = createA(this.link, this.caption, '_blank');
                    this.captionA.parent(this.captionH5);
                }
                this.captionH5.parent(this.blockCaption);
            }
        } else if (this.type == 'text'){
            var r5 = random(0, -10);
            this.block = createDiv().addClass('archiveBlock textBlock');
            
            if (!this.hasLink){
                this.text = createP(this.innerText);
            } else {
                this.text = createP();
                this.A = createA(this.link, this.innerText, '_blank');
                this.A.parent(this.text);
            }
            this.text.parent(this.blockContent);
        } else if (this.type == 'embed'){
            this.block = createDiv().addClass('archiveBlock videoBlock');
            this.vid = createDiv(this.embed);
            this.vid.parent(this.blockContent);

            // ADD CAPTION
            if (!this.hasCaption){

            } else {
                if (!this.hasLink) {
                    this.captionH5 = createElement('h5', this.caption);
                } else {
                    this.captionH5 = createElement('h5');
                    this.captionA = createA(this.link, this.caption, '_blank');
                    this.captionA.parent(this.captionH5);
                }
                this.captionH5.parent(this.blockCaption);
            }
        }
    };

    this.postBlock = function(){
        this.titleBlock.parent(this.block);
        this.date.parent(this.block);
        this.blockContent.parent(this.block);
        if (this.hasCaption){
            this.blockCaption.parent(this.block);
        }
        this.block.parent(archive);
    };
}

