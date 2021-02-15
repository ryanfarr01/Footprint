import json
from django.http import JsonResponse, Http404
from footprint_server.logic import business_logic

def get_item(request):
    if request.method != 'POST':
        print('ERROR: Expected POST request but got {0}'.format(request.method))
        raise Http404("Bad Request")

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    items = body['items']
    return JsonResponse(business_logic.get_carbon_scores(items))
