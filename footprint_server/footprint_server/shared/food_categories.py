"""
All food categories and commodities
"""

CATEGORIES = {
    'Beans/Pulses': {
        'Beans, Baby Lima': 0.29,
        'Beans, Blackeye': 0.26,
        'Beans, common dry varieties': 0.43,
        'Beans, Dry Beans': 0.36,
        'Beans, Dry Beans, organic': 0.24,
        'Beans, Large Lima': 52,
        'Beans, Lima/Blackeye': 0.34,
        'Garbanzos (chick-peas)': 0.29,
        'Lentils': 0.24,
        'Soybeans': 0.25,
        'Soybeans, organic': 0.26,
        'Soybeans, Clark Variety': 0.19
    },
    'Dairy': {
        'Butter': 0.19,
        'Cheese, cottage': 0.12,
        'Cheese, natural': 0.09,
        'Cheese, processed': 4.47,
        'Cream, sour': 0.10,
        'Cream, whipped fluid': 0.07,
        'Milk, evaporated': 1.14,
        'Milk, powdered': 4.42,
        'Milk, processed, 2% MF': 0.36,
        'Milk, whole, raw': 0.46,
        'Whey, dry, natural': 0.92,
        'Yogurt': 0.41
    },
    'Fruits/Berries': {
        'Apples': 0.11,
        'Apples, organic': 0.09,
        'Apples, Fuji (premium)': 0.12,
        'Apples, Fuji (standard)': 0.08,
        'Apples, Granny Smith': 0.05,
        'Apricots': 0.10,
        'Bananas': 0.12,
        'Black Raspberry': 0.26,
        'Blackberries': 0.13,
        'Blueberries, Highbush': 0.38,
        'Blueberries, Highbush, organic': 0.33,
        'Boysenberries': 0.09,
        'Cantaloupe': 0.06,
        'Cherries': 0.11,
        'Cherries, Sweet Cherries': 0.36,
        'Dates, Deglet Noor (Grade B, "US Choice")': 0.20,
        'Dates, Deglet Noor (Grade C, "US Standard")': 0.08,
        'Figs': 0.70,
        'Figs, Black Mission': 0.31,
        'Grapes': 0.38,
        'Grapes, Cabernet Souvignon, for wine': 0.10,
        'Grapes, Chardonnay, for wine': 0.12,
        'Grapes, Chardonnay, for wine, organic': 0.11,
        'Grapes, Crimson Seedless': 0.09,
        'Grapes, Flame Seedless': 0.11,
        'Grapes, for raisins': 0.14,
        'Grapes, French Hybrids, for wine': 0.22,
        'Grapes, Redglobe': 0.08,
        'Grapes, Souvignon Blanc, for wine': 0.07,
        'Grapes, Spur Pruned Varieties': 0.03,
        'Grapes, Thompson Seedless': 0.09,
        'Grapes, Thompson Seedless/Fiesta, organic': 0.32,
        'Guava, Tropical Pink': 0.07,
        'Lemons, Lisbon Variety': 0.04,
        'Mandarin Oranges, Satsuma': 0.10,
        'Mango, organic': 0.03,
        'Melons, cantaloupe/watermelon/honeydew/specialty': 0.06,
        'Nectarines': 0.10,
        'Olives, Arbequena': 0.13,
        'Olives, Manzanillo': 0.09,
        'Oranges, Blood Oranges': 0.08,
        'Oranges, Minneola': 0.06,
        'Oranges, Minneola (Tangelo)': 0.06,
        'Oranges, Navel/Valencias': 0.06,
        'Oranges, Valencia': 0.66,
        'Palm Fruit': 0.03,
        'Peaches': 0.10,
        'Pears, Green Bartlett': 0.15,
        'Pears, Specialty Pears': 0.06,
        'Pineapple': 0.04,
        'Pineapple, organic': 0.04,
        'Plums': 0.10,
        'Pomegranates': 0.20,
        'Prunes (dried plums), French Variety': 0.23,
        'Pummelos (specialty citrus fruit)': 0.10,
        'Raspberries': 0.12,
        'Strawberries': 0.12,
        'Strawberries, organic': 0.11
    },
    'Grains': {
        'Barley, Malting Barley': 0.14,
        'Barley, winter barley, organic': 0.25,
        'Corn': 0.27,
        'Corn, organic': 0.20,
        'Corn, Sweet Corn': 0.16,
        'Oats': 0.14,
        'Rice, bran': 0.21,
        'Rice, brown': 0.21,
        'Rice, raw': 0.69,
        'Rice, white': 1.07,
        'Rice, wild, brown': 5.06,
        'Rice, wild, bran': 1.08,
        'Rice, wild, raw': 3.96,
        'Rice, wild, white': 5.51,
        'Rye': 0.11,
        'Rye, organic': 0.20,
        'Sorghum': 0.13,
        'Wheat, Hard Red Spring Wheat': 0.16,
        'What, Hard White Spring Wheat': 0.15,
        'Wheat, Soft White Spring Wheat': 0.14,
        'Wheat, Spring Wheat': 0.12,
        'Wheat, winter Wheat': 0.14,
        'Yellow Mustard': 0.45
    },
    'Herbs': {
        'Cilantro': 0.09,
        'peppermint, Black Mitchum Variety': 20.42
    },
    'Meat/Poultry': {
        'Beef Meat, ration-fed': 8.0,
        'Beef Meat, pasture-fed': 7.48,
        'Chicken Meat (broiler), large-scale, confinement': 1.70,
        'Chicken Meat (broiler), small-scale, free-range': 2.54,
        'Eggs (Grade A, X Large, Jumbo, and Medium), large-scale, free-range': 0.92,
        'Eggs (Grade A, X Large, Jumbo, and Medium), large-scale, confinement, commercial ration': 1.08,
        'Eggs (Jumbo, X-Large, Large, Medium, Small), large-scale, confinement, commercial ration': 0.84,
        'Eggs (X-Large, Large, and Medium), small-scale, free-range': 0.86,
        'Lamb Meat, ration-fed': 11.31,
        'Pork Meat, full confinement': 2.48,
        'Pork Meat, pasture access': 2.77,
        'Turkey Meat (Hens), small-scale, confinement': 2.12,
        'Turkey meat (Toms), small-scale, confinement': 2.05
    },
    'Miscellaneous Food Crops': {
        'Cocoa Beans': 0.45,
        'Coffee Beans, green': 0.75,
        'Sugarcane': 0.02
    },
    'Nuts/Seeds': {
        'Almonds': 0.45,
        'Almonds, organic': 1.62,
        'Canola, Spring Canola': 0.39,
        'Palm Kernels': 0.15,
        'Pecans': 0.73,
        'Pistachios': 0.51,
        'Rape Seed, summer rape': 0.40,
        'Rape Seed, winter rape': 0.26,
        'Sunflower Seed': 0.40,
        'Walnuts, conventional (micro-sprinkler irrig.)': 0.35,
        'Walnuts, Chandler Variety': 0.22,
        'Walnuts, English Variety': 0.41
    },
    'Oils': {
        'Palm Kernel Oil': 0.41,
        'Palm Oil': 0.20,
        'Peanut Oil': 1.77,
        'Rapeseed/Canola Oil': 0.77,
        'Soybean Oil': 0.67,
        'Sunflower Oil': 0.67
    },
    'Processed Foods': {
        'Cocoa Butter': 0.45,
        'Cocoa Cake': 0.06,
        'Cocoa Liquor (unsweetened chocolate liquid': 0.37,
        'Cocoa Powder': 0.09,
        'All Purpose Flour': 0.29,
        'Beer': 0.17,
        'Bread Flour': 0.25,
        'Coffee': 1.14,
        'Cooking/Salad Oil': 0.79,
        'Corn Feed': 0.07,
        'Corn Oil': 0.12,
        'Corn Syrup': 0.15,
        'Frozen Orange Juice': 3.62,
        'Hams': 4.23,
        'Hash Brown/Fried Potatoes': 1.80,
        'Ice Cream': 0.83,
        'Liquid Eggs': 0.98,
        'Macaroni/Spaghetti/Pasta': 0.56,
        'Malt Whisky': 1.24,
        'Malted Barley': 0.39,
        'Margarine': 0.80,
        'Marinara Sauce': 0.38,
        'Mashed Potato Flakes': 2.05,
        'Mashed Potato Granules': 1.96,
        'Medium White Wine': 0.20,
        'New Red Wine': 0.20,
        'Oat Bran': 0.22,
        'Oatmeal (rolled oat flakes)': 0.22,
        'Orange Juice': 0.97,
        'Partially Hydrogenated Vegetable Oil': 0.81,
        'Pastry Flour': 0.24,
        'Peanut Butter': 0.69,
        'Pepperoni': 5.93,
        'Pita Bread': 0.38,
        'Pizza Dough': 0.33,
        'Potato Chips': 1.56,
        'Premium Red Wine': 0.19,
        'Premium White Wine': 0.20,
        'Sausages': 4.25,
        'Salt': 0.10,
        'Soft Drinks': 0.78,
        'Solid Shortening': 0.82,
        'Soybean Meal': 0.30,
        'Soymilk': 0.31,
        'Soymilk, organic': 0.31,
        'Sponge Cake': 0.47,
        'Sugar Cookies': 0.59,
        'Sugar, raw cane': 1.37,
        'Sugar, refined cane': 1.79,
        'Toasted Breakfast Cereal': 0.98,
        'Toasted Whole Wheat Breakfast Cereal': 0.94,
        'Tofu, firm': 0.32,
        'Tofu, firm, organic': 0.31,
        'Tomato Ketchup': 1.02,
        'Tomato Paste': 0.83,
        'Untoasted Breakfast Cereal': 0.70,
        'Untoasted Whole Wheat Breakfast Cereal': 0.66,
        'Wheat Bran': 0.25,
        'Wheat Bread': 0.38,
        'Wheat Bread Rolls': 0.38,
        'Wheat Germ': 0.25,
        'Whole Wheat Bread': 0.38,
        'Whole Wheat Bread Rolls': 0.38,
        'Whole Wheat Flour': 0.25,
        'Whole Wheat Macaroni/Spaghetti/Pasta': 0.48,
        'Wine': 0.29
    },
    'Root Crops': {
        'Beets, Sugarbeets': 0.02,
        'Carrots': 0.05,
        'Daikon Radish': 0.07,
        'Onions': 0.13,
        'Onions, Red (Early Red Burger Variety)': 0.12,
        'Peanuts': 0.26
    },
    'Seafood': {
        'Arctic Char, farmed, filleted': 8.36,
        'Atlantic Cod': 2.39,
        'Atlantic Salmon, farmed': 1.31,
        'Atlantic Salmon, farmed, filleted': 2.30,
        'Catfish, farmed, farmed, filleted': 4.25,
        'Catfish, farmed, farmed': 2.14,
        'Common Carp, farmed, filleted': 4.35,
        'Common Carp, farmed': 2.41,
        'Flatfish, filleted': 1.39,
        'Flatfish': 2.72,
        'Herring, filleted': 0.56,
        'Herring': 0.95,
        'Industrial Fish': 0.51,
        'Mackerel': 0.52,
        'Mackerel, filleted': 0.87,
        'Malaysian Shrimp/Prawn, farmed': 1.94,
        'Mullet, , farmed': 2.41,
        'Mussels, farmed': 0.24,
        'Norway Lobster': 2.44,
        'Oyster, farmed': 5.19,
        'Sea Bass, farmed, filleted': 4.73,
        'Sea Bass, farmed': 2.38,
        'Shrimp, farmed': 3.20,
        'Shrimp/Prawn': 2.08,
        'Silver Carp, farmed, filleted': 4.34,
        'Silver Carp': 2.41,
        'Tilapia, farmed, filleted': 4.79,
        'Tilapia, farmed': 2.41,
        'Trout, farmed': 1.14,
        'Trout, freshwater, farmed, filleted': 2.01,
        'Tuna, cooked, for canning': 2.01,
        'Tuna, filleted': 1.56,
        'Tuna (skipjack and Yellofin)': 0.90
    },
    'Tubers':{
        'Potatoes': 0.45,
        'Potatoes, Russet Burbank': 0.15,
        'Sweet Potatoes': 0.19
    },
    'Vegetables': {
        'Artichokes': 0.45,
        'Asparagus': 0.40,
        'Beans, Chinese Long Bean': 0.12,
        'Beans, Green, Blue Lake Variety': 0.20,
        'Beans, Snap Beans': 0.11,
        'Bittermelon': 0.05,
        'Broccoli': 0.16,
        'Broccoli, organic': 0.19,
        'Brussels Sprouts': 0.12,
        'Cabbage': 0.06,
        'Cabbage, chinese': 0.04,
        'Cauliflower': 0.14,
        'Celery': 0.05,
        'Cucumbers': 0.06,
        'Cucurbits, Moqua/Opo': 0.03,
        'Cucurbits, Sinqua': 0.04,
        'Eggplants, Asian Style': 0.04,
        'Eggplants, American Style': 0.23,
        'Garlic': 0.43,
        'Lemongrass': 0.03,
        'Lettuce, crisp-head': 0.06,
        'Lettuce, greenhouse': 4.46,
        'Lettuce, Iceberg': 0.09,
        'Lettuce, Leaf, organic': 0.12,
        'Lettuce, loose-leaf': 0.04,
        'Lettuce, Romaine Hearts': 0.42,
        'Mushrooms, Partabella/Button': 0.00,
        'Okra': 0.11,
        'Onions': 0.04,
        'Parsley': 0.07,
        'Peas, Spring Peas': 0.13,
        'Peppers, Bell': 0.12,
        'Pumpkins': 0.07,
        'Spinach': 0.15,
        'Squash, Summer Squash': 0.16,
        'Squash, winter Squash': 0.16,
        'Tomatoes': 0.11,
        'Tomatoes, organic': 0.15,
        'Tomatoes, Cherry': 0.03
    }
}

# define sub-categories
SUB_CATEGORIES = {}

for c in CATEGORIES:
    for s in CATEGORIES[c].keys():
        SUB_CATEGORIES[s] = c
