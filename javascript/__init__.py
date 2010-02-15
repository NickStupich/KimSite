from google.appengine.ext.webapp import template
import os

def GetJavascriptText(name, template_values = {}, toOneLine = False):
    path = os.path.join(os.path.dirname(__file__), name)
    result = template.render(path, template_values)
    
    if toOneLine:
        result = result.replace('\n', ' ')
        
    return result