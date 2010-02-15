from google.appengine.ext.webapp import template
import os

def GetHorizontalPage(name, template_values = {}):
    path = os.path.join(os.path.dirname(__file__), name)
    result = template.render(path, template_values)
    return result