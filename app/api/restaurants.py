from flask import Blueprint, redirect, render_template, request
from app.forms.newRestaurant import NewRestaurantForm
from app.models import Restaurant, db, restaurant

restaurant_router = Blueprint('restaurants',__name__)


@restaurant_router.route('/<id>/newRestaurant', methods=['GET', 'POST'])
def newRestaurantForm(id):
    form = NewRestaurantForm()
    if form.validate_on_submit():
        new_restaurant = Restaurant(user_id = id,
                                    name = form.data['name'],
                                    phone = form.data['phone'],
                                    street = form.data['street'],
                                    cuisine = form.data['cuisine'],
                                    hours = form.data['hours'],
                                    price_point = form.data['price_point'])
        db.session.add(new_restaurant)
        db.session.commit()
        return redirect(f'/restaurant/{new_restaurant.id}')
    if form.errors:
        return form.errors()
    return render_template('newRestaurant.html', form=form, id=str(id))

# @restaurant_router.route('/<id>/newRestaurant/delete', methods=['POST'])
# def deleteRestaurant(id):


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
