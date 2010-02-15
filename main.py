from google.appengine.ext import webapp
from google.appengine.ext.webapp import util

from google.appengine.ext.webapp import template
import os

from javascript import GetJavascriptText
from HorizontalPages import GetHorizontalPage
from HorizontalPageEntity import HorizontalPageEntity

class MainHandler(webapp.RequestHandler):
  def get(self):
    
    horizontalPages = []
    horizontalPages.append(HorizontalPageEntity('i0', 'bioImageSmall.jpg', 'bioPage', GetHorizontalPage('bio.html'), 'bioPage', 0))
    #horizontalPages.append(HorizontalPageEntity('i1', 'img1Small.jpg', 'GreenPage', GetHorizontalPage('GreenPage.html'), 'GreenPage', 0))
    horizontalPages.append(HorizontalPageEntity('i2', 'img2Small.jpg', 'RedPage', GetHorizontalPage('RedPage.html'), 'RedPage', 1))
    horizontalPages.append(HorizontalPageEntity('i3', 'img3Small.jpg', 'BluePage', GetHorizontalPage('BluePage.html'), 'BluePage', 2))
    horizontalPages.append(HorizontalPageEntity('iProfile', 'profileImageSmall.jpg', 'ProfilePage', GetHorizontalPage('ProfilePage.html'), 'ProfilePage', 3))
    
    low_template_values = {"HPageEntities" : horizontalPages,
                           }
    
    template_values = {"loadingDivContent" : GetContent('loadingDiv.html'),
                       "HorizontalScrolling" : GetJavascriptText('HorizontalScrolling.js', low_template_values),
                       "NavigationMenu" : GetJavascriptText('NavigationMenu.js', low_template_values),
                       "Load" : GetJavascriptText('Load.js'),
                       "EnlargeImage" : GetJavascriptText('ImageEnlarge.js'),
                       "navigationDivContent": GetContent('NavigationDiv.html', low_template_values),
                       "HorizontalScrollingContent": GetContent('HorizontalScrollingDiv.html', low_template_values),
                      }
    
    path = os.path.join(os.path.dirname(__file__), 'main.html')
    self.response.out.write(template.render(path, template_values))


def GetContent(name, template_values = {}, toOneLine = False):
  path = os.path.join(os.path.dirname(__file__), name)
  result = template.render(path, template_values)
  
  if toOneLine:
    result = result.replace('\n', ' ');
  return result

def main():
  application = webapp.WSGIApplication([('/', MainHandler)],
                                       debug=True)
  util.run_wsgi_app(application)


if __name__ == '__main__':
  main()
