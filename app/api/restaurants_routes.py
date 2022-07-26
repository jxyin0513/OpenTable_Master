from flask import Blueprint, redirect, render_template, request
from app.forms.restaurant_form import NewRestaurantForm
from app.models import Restaurant, db, favorites
from app.models.user import User

restaurant_router = Blueprint('restaurants',__name__)

@restaurant_router.route('/newRestaurant', methods=['GET', 'POST'])
def newRestaurantForm():
    form = NewRestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, 'this is what you want')
    # data= request.json
    # restaurant= Restaurant(**data)
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

@restaurant_router.route('/<restaurantId>')
def singleRestaurant(restaurantId):
    restaurant= Restaurant.query.get(restaurantId)
    return restaurant.to_dict()

@restaurant_router.route('/<restaurantId>/delete', methods=['DELETE'])
def deleteRestaurant(restaurantId):
    restaurant= Restaurant.query.get(restaurantId)
    db.session.delete(restaurant)
    db.session.commit()
    return restaurant.to_dict()
    # return redirect('/')

@restaurant_router.route('/<restaurantId>/edit', methods=['PUT'])
def editRestaurant(restaurantId):
    restaurant= Restaurant.query.get(restaurantId)
    form= NewRestaurantForm()
    print(form.data)
    restaurant.name= form.data['name']
    restaurant.phone = form.data['phone']
    restaurant.street = form.data['street']
    restaurant.cuisine = form.data['cuisine']
    restaurant.open_hours = form.data['open_hours']
    restaurant.close_hours = form.data['close_hours']
    restaurant.image_url = form.data['image_url']
    restaurant.price_point = form.data['price_point']

    print(form.data['open_hours'], "---------")
    db.session.commit()

    return restaurant.to_dict()

@restaurant_router.route('/favorites', methods=['POST'])
def favorite_restaurant():
    data = request.json
    user = User.query.get(data['user_id'])
    restaurant = Restaurant.query.get(data['restaurant_id'])
    user.user_favorite.append(restaurant)
    # new_favorite = favorites(
    #     users = data['user_id'],
    #     restaurants = data['restaurant_id']
    # )
    db.session.commit()
    return {
        "user_id": user.id,
        "restaurant_id": restaurant.id
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
    # print("USER_ID:: ", user.user_favorite)
    # user.user_favorite.remove(restaurant_id)
    # db.session.commit()
    # user_favorites.remove(restaurant_id)
    # db.session.commit()

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



# test postman
# @restaurant_router.route('/<id>/newRestaurant', methods=['GET', 'POST'])
# def newRestaurantForm(id):
#     data=request.json
#     restaurants= Restaurant(**data)

#     db.session.add(restaurants)
#     db.session.commit()
#     return {
#         'id': restaurants.id,
#         'name': restaurants.name,
#         'phone': restaurants.phone,
#         'street': restaurants.street,
#         'cuisine': restaurants.cuisine,
#         'hours':restaurants.hours,
#         'price_point':restaurants.price_point
#     }
