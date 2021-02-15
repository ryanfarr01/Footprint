from footprint_server.data import data
from footprint_server.logic import categorization
import requests
from lxml import html

calc_url = 'http://www.foodemissions.com/foodemissions/Calculator.aspx'

def get_item(item):
    r = requests.get(url=calc_url)
    return _get_carbon_score_from_html(html.fromstring(r.content))

def get_carbon_scores(items):
    ret = {'items':[]}
    for i in range(len(items)):
        item = items[i]
        # get score for item
        categs = categorization.find_category(item['name'])
        if categs == None:
            continue

        tag, cs = data.get_carbon_score(categs[0], categs[1])
        ret['items'].append({'index': i,
                             'raw_score': cs,
                             'score': tag,
                             'name': item['name'],
                             'category': categs[0],
                             'sub_category': categs[1]})
    return ret

def _get_carbon_score_from_html(tree):
    prod_emissions = tree.xpath('//span[@id="ctl00_MainContent_prodEmissions"]')
    trans_emissions = tree.xpath('//span[@id="ctl00_MainContent_transEmissions"]')
    if prod_emissions is None or len(prod_emissions) == 0:
        return -1.0
    return float(prod_emissions[0].text) + float(trans_emissions[0].text)
