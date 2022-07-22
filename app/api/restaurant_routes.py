from flask import Blueprint, redirect, render_template, request
from app.models import Restaurant, db, restaurant

restaurant_view= Blueprint('restaurant', __name__)



@restaurant_view.route('/restaurant/<restaurantId>')
def singleRestaurant(restaurantId):
    restaurant= Restaurant.query.get(restaurantId)
    return render_template('single-restaurant.html', restaurant=restaurant)
