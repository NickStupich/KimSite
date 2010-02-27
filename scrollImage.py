from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
import os
from google.appengine.ext.webapp import template

class ImageScroll(webapp.RequestHandler):
  def get(self):
    
    imageName = "ScrollImageSmall.jpg"
    startHeight = '100'
    if self.request.get('zoom'):
        startHeight = self.request.get('zoom')
    if self.request.get('size').lower() == 'med':
        imageName = "ScrollImageMed.jpg"
    template_values = {"imageName": imageName,
                       "startHeight" : startHeight}
    path = os.path.join(os.path.dirname(__file__), "scrollImage.html")
    self.response.out.write(template.render(path, template_values))

def main():
  application = webapp.WSGIApplication([('/ScrollImage', ImageScroll),
                                        ],
                                       debug=True)
  util.run_wsgi_app(application)


if __name__ == '__main__':
  main()
