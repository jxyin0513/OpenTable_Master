from flask import Blueprint, redirect, render_template, request
from app.forms.newRestaurant import NewRestaurantForm
from app.models import Restaurant, db

restaurant_router = Blueprint('restaurants',__name__)


@restaurant_router.route('/newRestaurant', methods=['GET', 'POST'])
def newRestaurantForm(id):
    form = NewRestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        restaurant = Restaurant(
                                user_id = id,
                                name = form.data['name'],
                                phone = form.data['phone'],
                                street = form.data['street'],
                                cuisine = form.data['cuisine'],
                                hours = form.data['hours'],
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

    restaurant.name= form.data['name']
    restaurant.phone = form.data['phone'],
    restaurant.street = form.data['street'],
    restaurant.cuisine = form.data['cuisine'],
    restaurant.hours = form.data['hours'],
    restaurant.price_point = form.data['price_point']

    db.session.commit()
    return restaurant.to_dict()


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
