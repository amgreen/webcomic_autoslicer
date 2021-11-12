# webcomic_autoslicer
An automatic slicer for vertical scroll webcomics made in Photoshop. Maybe one day PS will fix their slicer tool, but until then...

## Process
Slices the file vertically, then slices each of those verticals horizontally.
This results in a sliced webcomic from top to bottom, left to right.
![webcomic slicer in action](https://user-images.githubusercontent.com/7714559/141412066-396056a3-9ca2-47e8-8d17-18010f78fe2c.mp4)

![slicingGif](https://user-images.githubusercontent.com/7714559/141412141-8d5b8149-4e8c-4b77-8c89-718313168162.gif)

## Set-up
1. Load the Webtoon action set into Photoshop.
2. Create a Photoshop file using webcomicEpisodeTemplateImage.jpg as the template for the artwork. (20000px by 3600px, 25 columns of 3 slices) Draw on the white, black is useful for gutters / buffers.
![webcomic layout template](https://github.com/amgreen/webcomic_autoslicer/blob/main/webcomicEpisodeTemplateImage.jpg)
4. Make sure the active open Photoshop document is the one you want to slice.
5. Run the webcomicAutoSlicer.jsx script from File>Scripts>Browse

## Output
The output of the slicing will appear in the file location of the original file you sliced, in a folder called "finalSlices"





