from google.appengine.ext import webapp
from google.appengine.ext.webapp import util

from javascript import GetJavascriptText
from main import GetContent

class ImageEnlargeHandler(webapp.RequestHandler):
  def get(self):
    self.response.out.write("""
                            <html>
                            <head>
        <link rel="Stylesheet" href="stylesheets/StyleSheet.css" type="text/css" />
""" + GetJavascriptText('ImageEnlarge.js') + """
                            </head>
                            <body><div>
                            <img id="Img1" src="skiImageSmall.jpg" class="SkiImage" onclick="FullScreenImage(this)" title="me!" />
                </div></body></html>""")

class PortfolioHandler(webapp.RequestHandler):
    def get(self):
        portfolioContent = {
            "PortfolioContent" : GetContent('PortfolioContent.html', {}, True),
        }
        self.response.out.write("""
                                <html>
                                <head>
                                <link rel="Stylesheet" href="stylesheets/StyleSheet.css" type="text/css" />
                    """ + GetJavascriptText('Portfolio.js', portfolioContent) + GetJavascriptText('ImageEnlarge.js') + """
                                </head>
                                <body onload="ShowPortfolio()">
                                <div onclick="ShowPortfolio()" style="height:100%;width:100%">
                                <p> Some content... </p></div>
                                </body></html>""")

def main():
  application = webapp.WSGIApplication([('/testImage', ImageEnlargeHandler),
                                        ('/testPortfolio', PortfolioHandler),
                                        ],
                                       debug=True)
  util.run_wsgi_app(application)


if __name__ == '__main__':
  main()
