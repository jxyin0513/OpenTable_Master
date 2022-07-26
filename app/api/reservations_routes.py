from flask import Blueprint, redirect, render_template, request
from app.models import Reservation, db
from app.models.user import User

reservation_router = Blueprint('reservations',__name__)

# Get route all reservations for specified restuarant.
@reservation_router.route('/<restaurantId>')
def getReservations(restaurantId):
    reservations = Reservation.query.filter_by(restaurant_id = restaurantId).all()

    allReservations = [res.to_dict() for res in reservations]
    print(allReservations)
    print("---------------------------")
    return {
        "reservations": allReservations
    }
