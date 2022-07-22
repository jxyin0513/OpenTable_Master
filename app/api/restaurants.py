from flask import Blueprint, redirect, render_template
from app.models import Restaurant, db, restaurant
from app.forms import newRestaurant

restaurant_router = Blueprint('restaurants',__name__)




@restaurant_router.route('/<id>/newRestaurant', methods=['GET', 'POST'])
def newRestaurantForm(id):
    form = newRestaurant()
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
        return redirect('/')
    if form.errors:
        return form.errors()
    return render_template('newRestaurant.html', form=form)
