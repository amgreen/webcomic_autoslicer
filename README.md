# webcomic_autoslicer
An automatic slicer for vertical scroll webcomics made in Photoshop. Maybe one day PS will fix their slicer tool, but until then...

## Process
Slices the file vertically, then slices each of those verticals horizontally.
This results in a sliced webcomic from top to bottom, left to right.
Especially useful for larger webcomic files.
![webcomic slicer in action](https://user-images.githubusercontent.com/7714559/141412066-396056a3-9ca2-47e8-8d17-18010f78fe2c.mp4)

![slicingGif](https://user-images.githubusercontent.com/7714559/141412141-8d5b8149-4e8c-4b77-8c89-718313168162.gif)

## Set-up
1. Load the Webtoon action set into Photoshop.
2. Create a Photoshop file using webcomicEpisodeTemplateImage.jpg as the template for the artwork. (20000px by 3600px, 25 columns of 3 slices) Draw on the white, black is useful for gutters / buffers.
![webcomic layout template](https://github.com/amgreen/webcomic_autoslicer/blob/main/webcomicEpisodeTemplateImage.jpg)
4. Make sure the active open Photoshop document is the one you want to slice.
5. Run the webcomicAutoSlicer.jsx script from File>Scripts>Browse

## Output
1. The output of the slicing will appear in the file location of the original file you sliced, in a folder called "finalSlices".
2. A Webtoon preview will also be created in the same folder (WebtoonPreview.html), which is how the webcomic looks on the Webtoon site when you click "Preview Mobile".

### !!! 
1. Output folder "finalSlices" deletes existing folder with the same name in that location. Move previous slices if you want to keep them.
2. The preview must be on the same level directory as the "finalSlices" folder. Also "finalSlices" cannot be renamed if you want to see the preview (including the image names).

## Issue & Troubleshooting
**If some of the exported images are the wrong file type (like GIFs)**: 
This has happened for me when working on other projects and exporting those as different file types. The way I have been able to resolve the issue is going to **File>Export>SaveForWeb(Legacy)** and then changing all the settings to the correct values (JPEG, Quality 100) and pressing "Done". Then restart Photoshop for the settings to take effect !This step must be done!.

