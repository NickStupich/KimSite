<script type="text/javascript">
window.onresize = function(event) {
    SetWidthAndLeft();
}
pages = new Array();
currentOffset = -1;
timeRemaining = -1;
desiredOffset = -1;
lastOffset = -1;
oldScreenWidth = -1;
screenWidth = GetInnerWidth();

linearMove = false;
timeBetweenFrames = 3;
maxDist = 20;
minWidth = 1000;

function LoadPages() {
    {% for horizontalPage in HPageEntities %}
        pages[{{horizontalPage.pageNumber}}] = document.getElementById('{{horizontalPage.pageId}}');
    {% endfor %}
    
    currentOffset = -screenWidth;
    desiredOffset = 0;

    oldScreenWidth = screenWidth;
}

function GetInnerWidth()
{
    if(typeof self.innerWidth != 'undefined')
    {
        return self.innerWidth;
    }
    else if(typeof window.innerWidth != 'undefined')
    {
        return window.innerWidth;
    }
    else if(typeof window.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined')
    {
        return document.documentElement.clientWidth;
    }
    else
    {
        return document.getElementsByTagName('body')[0].clientWidth;
    }
}

function SetWidthAndLeft() {

    screenWidth = GetInnerWidth();
    
    if (screenWidth < minWidth) {
        screenWidth = minWidth;
    }
    
    hScrollContent = document.getElementById('HScrollContent');
    hScrollContent.style.width = screenWidth + 'px';
    
    currentOffset = currentOffset * screenWidth / oldScreenWidth;
    oldScreenWidth = screenWidth;

    for (i = 0; i < pages.length; i++) {
        pages[i].style.left = ((screenWidth * i) - currentOffset) + 'px';
        pages[i].style.width = screenWidth + 'px';
    }
}

function MoveToDesiredOffset() {
    distanceToMove = 0;
    if (linearMove) {

        distanceToMove = desiredOffset - currentOffset;
        if (distanceToMove > maxDist || distanceToMove < -maxDist) {
            if (distanceToMove > maxDist) {
                distanceToMove = maxDist;
            }
            else {
                distanceToMove = -maxDist;
            }
        }
    }
    else {
        //move non-linearly
        maxDist = 3;
        acceleratingPortion = 0.5;

        distanceToMove = desiredOffset - currentOffset;
        if (distanceToMove > maxDist || distanceToMove < -maxDist) {
            if (distanceToMove > maxDist) {
                distanceToMove = maxDist;
            }
            else {
                distanceToMove = -maxDist;
            }

            distanceToSide = Math.abs(desiredOffset - currentOffset);
            if (Math.abs(lastOffset - currentOffset) < distanceToSide) {
                distanceToSide = Math.abs(lastOffset - currentOffset);
            }
            ratio = distanceToSide / screenWidth;
            if (ratio > acceleratingPortion) {
                ratio = acceleratingPortion;
            }

            ratio += 0.05;

            distanceToMove *= ratio * 20;

        }
    }

    currentOffset += distanceToMove;

    for (i = 0; i < pages.length; i++) {
        leftOffset = (screenWidth * i) - currentOffset;
        if (leftOffset <= -screenWidth || leftOffset >= screenWidth) {
            pages[i].style.display = "none";
        }
        else {
            pages[i].style.display = "inline";
        }
        pages[i].style.left = leftOffset + 'px';
    }

    if (currentOffset != desiredOffset) {
        setTimeout(MoveToDesiredOffset, timeBetweenFrames);
    }
    else {
        //done moving

        document.body.style.overflow = "hidden";
    }
}

function MoveToPage(pageNumber) {
    desiredOffset = screenWidth * pageNumber;
    lastOffset = currentOffset;
    //hide the scroll bar while moving
    document.body.style.overflow = "hidden";
    MoveToDesiredOffset();
}  

</script>