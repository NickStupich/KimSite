<script type="text/javascript">

        insertedDiv = -1;
        imageDiv = -1;
        imageDivOpacity = 0.0;
        maxOpacity = 0.8;
        EnlargeImageOpacityIncrement = 0.05;
        EnlargeImageOpacityDecrement = 0.2;
        timeDelay = 20;
        fadeInReference = -1;
        
        largeFileSize = '';
        
    function FullScreenImage(image){
        largeFileSize = image.src.replace('Small', 'Large');
        CreateBlackFadeIn();
    }
    
    function CreateBlackFadeIn(){
        insertedDiv = document.createElement('div');
        insertedDiv.className = "BlackBackground"
        insertedDiv.innerHTML = '<div style="height:100%; width: 100%;" onclick="RemoveDiv()"><div class="EnlargedImageText"><p>Click Anywhere to Close</p></div></div>';
        insertedDiv.onload = DarkenDiv();
        document.body.appendChild(insertedDiv);
    }
    
    function AddImage(){
        imageDiv = document.createElement('div');
        imageDiv.className = "EnlargedImage";
        imageDiv.innerHTML = '<img id="enlargedImage" onload="ShowImage()" src="' + largeFileSize + '" onclick="RemoveDiv()" class="EnlargedImage" alt="" />';
        //need to resize here
        document.body.appendChild(imageDiv);
        
        img = document.getElementById('enlargedImage')
        h = parseInt(img.style.height.split('p'))
        w = parseInt(img.style.width.split('p'))
        
        if((h/(self.innerHeight-40)) > (w / self.innerWidth))
        {
            img.style.height = "80%";
        }
        else
        {
            img.style.height = "90%";   
        }
    }
    
    function ShowImage(){
        imageDiv.style.opacity = 1.0;
    }
    
    function DarkenDiv(){
        if(insertedDiv == -1)
        {
            return false;
        }
        
        if(insertedDiv.style.opacity > maxOpacity)
        {
            AddImage();
        }
        else
        {        
            imageDivOpacity += EnlargeImageOpacityIncrement;
            insertedDiv.style.opacity = imageDivOpacity;
            
            fadeInReference = setTimeout(DarkenDiv, timeDelay);
        }
    }
    
    function RemoveDiv(){
        if(fadeInReference > 0)
        {
            clearTimeout(fadeInReference);
            fadeInReference = -1;
        }
        if(imageDivOpacity < 0.0)
        {
            document.body.removeChild(insertedDiv);
            document.body.removeChild(imageDiv);
            insertedDiv = -1;
            return;
        }
        else
        {
            imageDivOpacity -= EnlargeImageOpacityDecrement;
            insertedDiv.style.opacity = imageDivOpacity;
            imageDiv.style.opacity = imageDivOpacity;
            
            setTimeout(RemoveDiv, timeDelay);
        }
    }

</script>