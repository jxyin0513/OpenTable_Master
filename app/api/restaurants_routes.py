from flask import Blueprint, redirect, render_template, request
from app.forms.restaurant_form import NewRestaurantForm
from app.models import Restaurant, db, favorites
from app.models.user import User

restaurant_router = Blueprint('restaurants',__name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

#GETs new restaurant form
#POST adds a new restaurant
@restaurant_router.route('/newRestaurant', methods=['GET', 'POST'])
def newRestaurantForm():
    form = NewRestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, 'this is what you want')
    if form.validate_on_submit():
        restaurant = Restaurant(
            user_id = form.data['user_id'],
            name = form.data['name'],
            phone = form.data['phone'],
            street = form.data['street'],
            cuisine = form.data['cuisine'],
            open_hours = form.data['open_hours'],
            close_hours = form.data['close_hours'],
            image_url = form.data['image_url'],
            price_point = form.data['price_point']
            )
        db.session.add(restaurant)
        db.session.commit()
        return restaurant.to_dict()
    if form.errors:
        print(form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#GET's an individual restaurants details
@restaurant_router.route('/<restaurantId>')
def singleRestaurant(restaurantId):
    restaurant= Restaurant.query.get(restaurantId)
    return restaurant.to_dict()

#Deletes an individual restaurant and all objects with relations to it
@restaurant_router.route('/<restaurantId>/delete', methods=['DELETE'])
def deleteRestaurant(restaurantId):
    users = User.query.all()
    print('===============')
    print("USERS:: ", users)
    print('===============')
    restaurant= Restaurant.query.get(restaurantId)
    db.session.delete(restaurant)
    db.session.commit()
    return restaurant.to_dict()

#PUTs updated info to a restaurant
@restaurant_router.route('/<restaurantId>/edit', methods=['PUT'])
def editRestaurant(restaurantId):
    restaurant= Restaurant.query.get(restaurantId)
    form= NewRestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data['name'])
    if(form.validate_on_submit()):
        restaurant.name= form.data['name']
        restaurant.phone = form.data['phone']
        restaurant.street = form.data['street']
        restaurant.cuisine = form.data['cuisine']
        restaurant.open_hours = form.data['open_hours']
        restaurant.close_hours = form.data['close_hours']
        restaurant.image_url = form.data['image_url']
        restaurant.price_point = form.data['price_point']
        db.session.commit()
        return restaurant.to_dict()

    if form.errors:
        print(form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400



#POSTs a new favorite for a user
@restaurant_router.route('/favorites', methods=['GET','POST'])
def favorite_restaurant():
    data = request.json

    user = User.query.get(data['user_id'])
    restaurant = Restaurant.query.get(data['restaurant_id'])
    user.user_favorite.append(restaurant)

    db.session.commit()
    return {
        "user_id": user.id,
        "restaurant_id": restaurant.id
    }

#GET's a user's favorite restaurants
@restaurant_router.route('/favorites/<user_id>/<restaurant_id>')
def get_favorites(user_id, restaurant_id):
    user = User.query.get(user_id)
    restaurant = Restaurant.query.get(restaurant_id)
    if(restaurant in user.user_favorite):
        return {
        "user_id": user_id,
        "restaurant_id": restaurant_id
        }
    else:
        return {
            "message": "no favs"
        }

#Gets a user's favorite restaurants ... in a different way
@restaurant_router.route('/favorites/<user_id>')
def get_all_favorites(user_id):
    user = User.query.get(user_id)
    favorites = [restaurant.to_dict() for restaurant in user.user_favorite]
    return {
        "favorites": favorites
    }

@restaurant_router.route('/<user_id>/<restaurant_id>', methods=['DELETE'])
def remove_favorite(user_id, restaurant_id):
    user = User.query.get(user_id)
    restaurant = Restaurant.query.get(restaurant_id)
    if restaurant in user.user_favorite:
        user.user_favorite.remove(restaurant)
        db.session.commit()
    return {
            "user_id": user_id,
            "restaurant_id": restaurant_id
        }

@restaurant_router.route('/favorites/<restaurant_id>', methods=['DELETE'])
def destroy_all_favorites(restaurant_id):
    users = User.query.all()
    restaurant = Restaurant.query.get(restaurant_id)
    for user in users:
        if restaurant in user.user_favorite:
            user.user_favorite.remove(restaurant)
            db.session.commit()
    return { "message": "success" }

#Autofill search route
@restaurant_router.route('/search', methods=['GET', 'POST'])
def search_restaurant():
    query = request.json
    print(query)
    nameResults = Restaurant.query.filter(Restaurant.name.ilike(f'{query}%')).all()
    cuisineResults = Restaurant.query.filter(Restaurant.cuisine.ilike(f'{query}%')).all()
    if nameResults:
        results = nameResults
    else:
        results = cuisineResults
    print(results)
    restaurants = [k.to_dict() for k in results]
    print(restaurants)
    return { "restaurants": restaurants }
