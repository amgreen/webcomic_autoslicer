// Overview:
//
// 1. Takes a webcomic image and slices it vertically and then horizontally, using Photoshop Actions.
// 2. Saves the slices to a folder called finalSlices, where the source image is located.
// 3. Creates a preview of the sliced comic as it would appear on Webtoon (file is called WebtoonPreview.html). 
// 
// Warnings: 
// 1. finalSlices folder contents get deleted each time the script is run.
// 2. WebtoonPreview.html must be in the same directory level as the finalSlices folder. 
// 3. finalSlices cannot be renamed for the preview to work. (unless you want to change the HTML...)

// Tweakable Values
var CREATE_WEBTOON_PREVIEW = true; //Set this to false if you don't want WebtoonPreview.html to be created.



// Set up
var sourceDoc = app.activeDocument;
var targetPath = app.activeDocument.path;
var targetPathTemp = targetPath + '/' + 'temp';
var targetPathTempFolder = new Folder(targetPathTemp);
targetPathTempFolder.create();

var finalDestination = targetPath + '/' + 'finalSlices';
var finalDestinationFolder = new Folder(finalDestination);

var allSliceNames = [];
var skipOdds = prompt("Skip Odd Numbered Columns?:", "y", "Skip Odd Columns") === "y";


// Remove any pre-existing slice generations, then create a final output folder.
if(finalDestinationFolder.exists){
    removeFolder(finalDestinationFolder);
}
finalDestinationFolder.create();

// First vertical slices are created.
var verticalSlices = new Folder(targetPathTemp + '/' + 'images');

// Export of slices creates a folder called 'images' containing the slices.
sliceAndExportFile(sourceDoc.fullName, targetPathTemp, 'exportedVerticalSlice', /*sliceHorizontal*/ false);


// Then those vertical slices are further sliced horizontally, to create the final slices.
var count = verticalSlices.getFiles().length;
for(var i=0; i<count; i++){

    if(i%2 === 1 && skipOdds){
        continue;
    }

    var finalSliceName = 'vertical'+ i.toString() + '_exportedFinalSlice';
    sliceAndExportFile(verticalSlices.getFiles()[i], finalDestination, finalSliceName, /*sliceHorizontal*/ true);

    // Copy images from 'images/finalSlices' to 'finalSlices' main folder.
    var newSlicesFolder = new Folder(finalDestination + '/' + 'images');
    var subCount = newSlicesFolder.getFiles().length;
    for(var j=0; j<subCount; j++){
        var slice = newSlicesFolder.getFiles()[j];
        slice.copy(finalDestination + '/' + slice.name);
        allSliceNames.push(slice.name);
        }

    // Delete subfolder.
    // Other temporary 'images' folders will be generated, so this is important 
    // due to access via naming.
    removeFolder(newSlicesFolder);
    
    }
removeFolder(new Folder(targetPathTemp + '/' +'images'));
removeFolder(targetPathTempFolder);

// Create a preview of the webcomic using the slices and HTML.
if(CREATE_WEBTOON_PREVIEW){
    createWebtoonPreview(allSliceNames);
}
alert('Auto Slicing Complete.');







//-----------------------------------------
// Helper Functions
//-----------------------------------------


// Assumption, no folders within folder.
function removeFolder(folder){
    var files = folder.getFiles();
    var N=files.length;
    for (var n=N; n>0; n--){
        files[n-1].remove();
        }
    folder.remove();
    }


function sliceAndExportFile(inputFile, relativeOutputPath, sliceName, sliceHorizontal){
    var closeAfterExport = true;

    // If we are slicing the current active document, then we don't wan't to close it.
    if(inputFile.fullName == app.activeDocument.fullName){
        closeAfterExport = false;
    }

    app.open(inputFile); // Type File
    var active = app.activeDocument;

    // Clear all slices
    app.doAction('clearSlices','Webtoon');

    // Divide into slices
    if(sliceHorizontal){
        app.doAction('setSlicesHorz','Webtoon');
    }else{
        app.doAction('setSlicesVert','Webtoon');
    }

    // Export
    docExportOptions = new ExportOptionsSaveForWeb; 
    docExportOptions.format = SaveDocumentType.JPEG;
    docExportOptions.quality = 100;
    var outputFile = new File(relativeOutputPath + '/' + sliceName +'.jpg');
    active.exportDocument(outputFile,ExportType.SAVEFORWEB,docExportOptions);

    if(closeAfterExport){
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);  
    }
    }



//--------------------------------------------
// Below functions are for Webtoon previewing.
//--------------------------------------------


function createWebtoonPreview(fileNames){
    // Set up for Webtoon preview file
    var webtoonPreview = new File(targetPath + '/' + "WebtoonPreview.html");
    if(webtoonPreview.exists){
        webtoonPreview.remove();
    }

    createMobilePreview(webtoonPreview, fileNames);

}

function imagesToWebtoonHTML(fileNames){
    var constructedImgDivs = "";

    var fileCount = fileNames.length;
    for(var i=0; i<fileCount; i++){
            constructedImgDivs += '<img src="./finalSlices/'+ fileNames[i] + '" width="100%" alt="image">\n';
        }

    return constructedImgDivs;
}

function createMobilePreview(outputFile, fileNames){
    // Html is taken from inspecting source of Webtoon preview page.
    var htmlTemplateStart = '\
    <!DOCTYPE html>\
    <!-- saved from url=(0043)https://www.webtoons.com/challenge/preview? -->\
    <html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\
    <style type="text/css">\
    /* Common */\
    body,p,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,table,th,td,form,fieldset,legend,input,textarea,button,select{margin:0;padding:0}\
    body,input,textarea,select,button,table{font-size:12px;font-family:Helvetica,HiraKakuProN-W3}\
    img,fieldset,button{border:0}\
    img{vertical-align:top}\
    ul,ol,li{list-style:none}\
    em,address{font-style:normal}\
    input,textarea{outline:none}\
    hr{display:none}\
    a{color:#000;text-decoration:none}\
    a:hover,a:active,a:focus{text-decoration:none}\
    .wrap_preview{position:relative;width:320px;margin:0 auto}\
    .preview_header{overflow:hidden;height:40px;padding:0 73px 0 58px;line-height:38px;white-space:nowrap;text-overflow:ellipsis;font-size:16px;background:url(https://webtoons-static.pstatic.net/image/pc/publish_mobile_preview.png) no-repeat;font-family:HelveticaNeue-Medium;color:#fff}\
    </style>\
    <title>Mobile Preview :: WEBTOON</title>\
    </head>\
    <body class="">\
        <div class="wrap_preview">\
            <div class="preview_header">\
                Mobile Preview &gt; Episode Preview\
            </div>';
    var htmlTemplateEnd = '</div>\
    </body>\
    </html>';

    var htmlTemplate = htmlTemplateStart + imagesToWebtoonHTML(fileNames) + htmlTemplateEnd;


    outputFile.encoding ="UTF8";
    outputFile.open("e", "TEXT", "????");
    outputFile.writeln(htmlTemplate);
    outputFile.close();
}
