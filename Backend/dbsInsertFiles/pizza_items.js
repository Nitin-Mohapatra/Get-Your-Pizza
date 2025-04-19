const data = [
    {
        "name": "Margherita",
        "description": "Classic pizza with tomato sauce, mozzarella, and basil.",
        "price": 199,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Basil"
        ],
        "image_url": "https://example.com/images/pizza_1.jpg"
    },
    {
        "name": "Pepperoni Feast",
        "description": "Loaded with spicy pepperoni and extra cheese.",
        "price": 249,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Pepperoni"
        ],
        "image_url": "https://example.com/images/pizza_2.jpg"
    },
    {
        "name": "BBQ Chicken",
        "description": "Grilled chicken, BBQ sauce, and onions on a cheesy crust.",
        "price": 299,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "BBQ Sauce",
            "Chicken",
            "Onions",
            "Mozzarella"
        ],
        "image_url": "https://example.com/images/pizza_3.jpg"
    },
    {
        "name": "Veggie Supreme",
        "description": "A colorful mix of bell peppers, olives, and mushrooms.",
        "price": 259,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Bell Peppers",
            "Olives",
            "Mushrooms"
        ],
        "image_url": "https://example.com/images/pizza_4.jpg"
    },
    {
        "name": "Custom Pizza 5",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 225,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 5"
        ],
        "image_url": "https://example.com/images/pizza_5.jpg"
    },
    {
        "name": "Custom Pizza 6",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 230,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 6"
        ],
        "image_url": "https://example.com/images/pizza_6.jpg"
    },
    {
        "name": "Custom Pizza 7",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 235,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 7"
        ],
        "image_url": "https://example.com/images/pizza_7.jpg"
    },
    {
        "name": "Custom Pizza 8",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 240,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 8"
        ],
        "image_url": "https://example.com/images/pizza_8.jpg"
    },
    {
        "name": "Custom Pizza 9",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 245,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 9"
        ],
        "image_url": "https://example.com/images/pizza_9.jpg"
    },
    {
        "name": "Custom Pizza 10",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 250,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 10"
        ],
        "image_url": "https://example.com/images/pizza_10.jpg"
    },
    {
        "name": "Custom Pizza 11",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 255,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 11"
        ],
        "image_url": "https://example.com/images/pizza_11.jpg"
    },
    {
        "name": "Custom Pizza 12",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 260,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 12"
        ],
        "image_url": "https://example.com/images/pizza_12.jpg"
    },
    {
        "name": "Custom Pizza 13",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 265,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 13"
        ],
        "image_url": "https://example.com/images/pizza_13.jpg"
    },
    {
        "name": "Custom Pizza 14",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 270,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 14"
        ],
        "image_url": "https://example.com/images/pizza_14.jpg"
    },
    {
        "name": "Custom Pizza 15",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 275,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 15"
        ],
        "image_url": "https://example.com/images/pizza_15.jpg"
    },
    {
        "name": "Custom Pizza 16",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 280,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 16"
        ],
        "image_url": "https://example.com/images/pizza_16.jpg"
    },
    {
        "name": "Custom Pizza 17",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 285,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 17"
        ],
        "image_url": "https://example.com/images/pizza_17.jpg"
    },
    {
        "name": "Custom Pizza 18",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 290,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 18"
        ],
        "image_url": "https://example.com/images/pizza_18.jpg"
    },
    {
        "name": "Custom Pizza 19",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 295,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 19"
        ],
        "image_url": "https://example.com/images/pizza_19.jpg"
    },
    {
        "name": "Custom Pizza 20",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 300,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 20"
        ],
        "image_url": "https://example.com/images/pizza_20.jpg"
    },
    {
        "name": "Custom Pizza 21",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 305,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 21"
        ],
        "image_url": "https://example.com/images/pizza_21.jpg"
    },
    {
        "name": "Custom Pizza 22",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 310,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 22"
        ],
        "image_url": "https://example.com/images/pizza_22.jpg"
    },
    {
        "name": "Custom Pizza 23",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 315,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 23"
        ],
        "image_url": "https://example.com/images/pizza_23.jpg"
    },
    {
        "name": "Custom Pizza 24",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 320,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 24"
        ],
        "image_url": "https://example.com/images/pizza_24.jpg"
    },
    {
        "name": "Custom Pizza 25",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 325,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 25"
        ],
        "image_url": "https://example.com/images/pizza_25.jpg"
    },
    {
        "name": "Custom Pizza 26",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 330,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 26"
        ],
        "image_url": "https://example.com/images/pizza_26.jpg"
    },
    {
        "name": "Custom Pizza 27",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 335,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 27"
        ],
        "image_url": "https://example.com/images/pizza_27.jpg"
    },
    {
        "name": "Custom Pizza 28",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 340,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 28"
        ],
        "image_url": "https://example.com/images/pizza_28.jpg"
    },
    {
        "name": "Custom Pizza 29",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 345,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 29"
        ],
        "image_url": "https://example.com/images/pizza_29.jpg"
    },
    {
        "name": "Custom Pizza 30",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 350,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 30"
        ],
        "image_url": "https://example.com/images/pizza_30.jpg"
    },
    {
        "name": "Custom Pizza 31",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 355,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 31"
        ],
        "image_url": "https://example.com/images/pizza_31.jpg"
    },
    {
        "name": "Custom Pizza 32",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 360,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 32"
        ],
        "image_url": "https://example.com/images/pizza_32.jpg"
    },
    {
        "name": "Custom Pizza 33",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 365,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 33"
        ],
        "image_url": "https://example.com/images/pizza_33.jpg"
    },
    {
        "name": "Custom Pizza 34",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 370,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 34"
        ],
        "image_url": "https://example.com/images/pizza_34.jpg"
    },
    {
        "name": "Custom Pizza 35",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 375,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 35"
        ],
        "image_url": "https://example.com/images/pizza_35.jpg"
    },
    {
        "name": "Custom Pizza 36",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 380,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 36"
        ],
        "image_url": "https://example.com/images/pizza_36.jpg"
    },
    {
        "name": "Custom Pizza 37",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 385,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 37"
        ],
        "image_url": "https://example.com/images/pizza_37.jpg"
    },
    {
        "name": "Custom Pizza 38",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 390,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 38"
        ],
        "image_url": "https://example.com/images/pizza_38.jpg"
    },
    {
        "name": "Custom Pizza 39",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 395,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 39"
        ],
        "image_url": "https://example.com/images/pizza_39.jpg"
    },
    {
        "name": "Custom Pizza 40",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 400,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 40"
        ],
        "image_url": "https://example.com/images/pizza_40.jpg"
    },
    {
        "name": "Custom Pizza 41",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 405,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 41"
        ],
        "image_url": "https://example.com/images/pizza_41.jpg"
    },
    {
        "name": "Custom Pizza 42",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 410,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 42"
        ],
        "image_url": "https://example.com/images/pizza_42.jpg"
    },
    {
        "name": "Custom Pizza 43",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 415,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 43"
        ],
        "image_url": "https://example.com/images/pizza_43.jpg"
    },
    {
        "name": "Custom Pizza 44",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 420,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 44"
        ],
        "image_url": "https://example.com/images/pizza_44.jpg"
    },
    {
        "name": "Custom Pizza 45",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 425,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 45"
        ],
        "image_url": "https://example.com/images/pizza_45.jpg"
    },
    {
        "name": "Custom Pizza 46",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 430,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 46"
        ],
        "image_url": "https://example.com/images/pizza_46.jpg"
    },
    {
        "name": "Custom Pizza 47",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 435,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 47"
        ],
        "image_url": "https://example.com/images/pizza_47.jpg"
    },
    {
        "name": "Custom Pizza 48",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 440,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 48"
        ],
        "image_url": "https://example.com/images/pizza_48.jpg"
    },
    {
        "name": "Custom Pizza 49",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 445,
        "category": "Non-Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 49"
        ],
        "image_url": "https://example.com/images/pizza_49.jpg"
    },
    {
        "name": "Custom Pizza 50",
        "description": "A delicious custom pizza with unique toppings.",
        "price": 450,
        "category": "Veg",
        "size": [
            "Small",
            "Medium",
            "Large"
        ],
        "ingredients": [
            "Tomato Sauce",
            "Mozzarella",
            "Special Ingredient 50"
        ],
        "image_url": "https://example.com/images/pizza_50.jpg"
    }
]
module.exports = data;