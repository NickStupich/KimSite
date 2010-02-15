<script type="text/javascript"> 

loadingReference = 0;
opacity = 1.0;
opacityDecrement = 0.05;
timeGap = 20;

function BodyLoad() {
    LoadImages();

    LoadPages();

    SetWidthAndLeft();
    MoveToDesiredOffset();

    StopLoading();
}

function StopLoading() {
    opacity -= opacityDecrement;
    if (opacity > 0) {
        var loadingDiv = document.getElementById('loadingDiv');
        loadingDiv.style.opacity = opacity;
        //loadingDiv.filters.alpha.opacity = opacity*100;
        setTimeout(StopLoading, timeGap);
    }
    else {
        loadingReference = -1;
        var loadingDiv = document.getElementById('loadingDiv');
        loadingDiv.style.display = "none";
    }
}

function StartLoadAnimation() {
    para = document.getElementById('loadingPara');
    if (para.innerHTML == "<strong>Loading.</strong>") {
        para.innerHTML = "<strong>Loading..</strong>";
    }
    else if (para.innerHTML == "<strong>Loading..</strong>") {
        para.innerHTML = "<strong>Loading...</strong>";
    }
    else {
        para.innerHTML = "<strong>Loading.</strong>";
    }

    if (loadingReference >= 0) {
        loadingReference = setTimeout(StartLoadAnimation, 300);
    }
}

</script>