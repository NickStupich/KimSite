<script type="text/javascript">
images = new Array();

makeBiggerIndex = -1;

smallSize = 50;
bigSize = 100;

growSpeed = 3;
shrinkSpeed = 5;
frameDelay = 30;

function LoadImages() {
    {% for horizontalPage in HPageEntities %}
        images[{{horizontalPage.pageNumber}}] = document.getElementById('{{horizontalPage.navImageId}}');
    {% endfor %}
}

function MakeSmaller() {
    makeBiggerIndex = -1;
    ChangeSizes();
}

function MakeBigger(x) {

    makeBiggerIndex = x;
    ChangeSizes();
}

function ChangeSizes() {
    sizesCorrect = true;

    for (i = 0; i < images.length; i++) {
        size = parseInt(images[i].style.height.toString().split('p')[0])
        if (i == makeBiggerIndex) {
            if (size < bigSize) {
                newSize = size + growSpeed;
                dimString = newSize.toString() + 'px';
                images[i].style.height = dimString;
                images[i].style.width = dimString;

                if (newSize < bigSize) {
                    sizesCorrect = false;
                }
            }
        }
        else {
            if (size > smallSize) {
                newSize = size - shrinkSpeed;
                dimString = newSize.toString() + 'px';
                images[i].style.height = dimString;
                images[i].style.width = dimString;

                if (newSize > smallSize) {
                    sizesCorrect = false;
                }
            }
        }
    }

    if (!sizesCorrect) {
        setTimeout(ChangeSizes, frameDelay);
    }
}   
        
</script>