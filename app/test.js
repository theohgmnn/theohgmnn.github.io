function TestOnMarkerClick() {
    SECTION_MAP_STYLE_DISPLAY = "none"
    SECTION_VIDEO_STYLE_DISPLAY = "block"

    onMarkerClick()
    if (sectionMap.style.display == SECTION_MAP_STYLE_DISPLAY && sectionVideo.style.display == SECTION_VIDEO_STYLE_DISPLAY) {
        console.log("test: ok")
    }
}