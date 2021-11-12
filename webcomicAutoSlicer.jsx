var sourceDoc = app.activeDocument;

// Set up
var targetPath = app.activeDocument.path;
var targetPathTemp = targetPath + '/' + 'temp';
var targetPathTempFolder = new Folder(targetPathTemp);
targetPathTempFolder.create();

var finalDestination = targetPath + '/' + 'finalSlices';
var finalDestinationFolder = new Folder(finalDestination);


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
    var finalSliceName = 'vertical'+ i.toString() + '_exportedFinalSlice';
    sliceAndExportFile(verticalSlices.getFiles()[i], finalDestination, finalSliceName, /*sliceHorizontal*/ true);

    // Copy images from 'images/finalSlices' to 'finalSlices' main folder.
    var newSlicesFolder = new Folder(finalDestination + '/' + 'images');
    var subCount = newSlicesFolder.getFiles().length;
    for(var j=0; j<subCount; j++){
        var slice = newSlicesFolder.getFiles()[j];
        slice.copy(finalDestination + '/' + slice.name);
        }

    // Delete subfolder.
    // Other temporary 'images' folders will be generated, so this is important 
    // due to access via naming.
    removeFolder(newSlicesFolder);
    
    }
removeFolder(new Folder(targetPathTemp + '/' +'images'));
removeFolder(targetPathTempFolder);


alert('Auto Slicing Complete.');


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
