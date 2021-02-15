import requests
from footprint_server.shared import food_categories
from lxml import html

def get_carbon_score(category, sub_category):
    cs = food_categories.CATEGORIES[category][sub_category]

    ret = 3
    if cs > 0.25 and cs < 1.0: ret = 2
    elif cs <= 0.25: ret = 1
    
    return ret, cs

