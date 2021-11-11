# webcomic_autoslicer
An automatic slicer for vertical scroll webcomics made in Photoshop.

## Set-up
1. Load the Webtoon action set into Photoshop.
2. Create a Photoshop file using webcomicEpisodeTemplateImage.jpg as the template for the artwork. (20000px by 3600px, 25 columns of 3 slices) Draw on the white, black is useful for gutters / buffers.
3. Make sure the active open Photoshop document is the one you want to slice.
4. Run the webcomicAutoSlicer.jsx script from File>Scripts>Browse

## Output
The output of the slicing will appear in the file location of the original file you sliced, in a folder called "finalSlices"
