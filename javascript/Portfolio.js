<script type="text/javascript">
    portfolioBackground = -1;
    portfolioContent = -1;
    portfolioBackgroundOpacity = 0;
    darkeningTimeout = 0;
    
    function ShowPortfolio(){
        portfolioBackground = document.createElement('div');
        portfolioBackground.className = "BlackBackground"
        portfolioBackground.innerHTML = '{{PortfolioContent}}';
        portfolioBackground.onload = DarkenPortfolioBackground();
        document.body.appendChild(portfolioBackground);
    }
    
    function AddPortfolioContent(){
        
    }
    
    function DarkenPortfolioBackground(){
        if(portfolioBackground == -1 || darkeningTimeout < 0)
        {
            return false;
        }
        
        if(portfolioBackground.style.opacity >= 1.0)
        {
            AddPortfolioContent();
        }
        else
        {        
            portfolioBackgroundOpacity += 0.05;
            portfolioBackground.style.opacity = portfolioBackgroundOpacity;
            
            darkeningTimeout = setTimeout(DarkenPortfolioBackground, 20);
        }
    }
    
    function HidePortfolio(){
        darkeningTimeout = -1;
        LightenPortfolioBackground();        
    }
    
    function LightenPortfolioBackground(){
        if(portfolioBackground == -1)
        {
            return false;
        }
        
        if(portfolioBackground.style.opacity <= 0.0)
        {
            document.body.removeChild(portfolioBackground);
            portfolioBackground = -1;
            darkeningTimeout = 0;
        }
        else
        {        
            portfolioBackgroundOpacity -= 0.1;
            portfolioBackground.style.opacity = portfolioBackgroundOpacity;
            
            setTimeout(LightenPortfolioBackground, 20);
        }
    }
    
</script>