# Footprint

When you shop online there are a number of things you think about before purchasing an item: price, quality, the time it will take to
arrive, etc. But very few people consider the impact this purchase has on the environment -- the product's carbon footprint. 
Footprint is a browser application that allows you to compare products based on their carbon footprint while shopping online and gives
you an opportunity to offset the carbon cost of your purchase with a carbon offset.

See our presentation [here](https://docs.google.com/presentation/d/1-N0vEQaEX5OGSLSOVxM7-UzhX81H_mAaASMp_EDDry4/edit?usp=sharing)

## Footprint Server
**Requirements**: 
* Install [Pyhton 3](https://www.python.org/download/releases/3.0/)
* Install django (`pip intall django`)
* Install requests (`pip install requests`)
* Install lxml (`pip install lxml`)
* Install numpy (`pip install numpy`)
* Install scipy (`pip install scipy`)
* Install nltk (`pip install nltk`)

**Start Server**:
1. From the commandline, navigate to the \"footprint_server\" folder
2. Start the server with `python manage.py`


## Chrome Extension
1. Open Google Chrome
2. Go to your Extensions
3. Click "Load Unpacked"
4. In the opened file explorer, navigate to Footprint/plugin and open the "plugin 2" folder
5. Verify that Footprint now shows up as an extension
