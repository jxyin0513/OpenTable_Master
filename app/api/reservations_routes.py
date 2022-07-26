from flask import Blueprint, redirect, render_template, request
from app.models import Reservation, db
from app.models.user import User

reservation_router = Blueprint('reservations',__name__)

# Get route all reservations for specified user.
@reservation_router.route('/<userId>')
def getReservations(userId):
    print(userId)
    reservations = Reservation.query.filter_by(user_id = userId).all()

    allReservations = [res.to_dict() for res in reservations]
    # print(allReservations)
    # print("---------------------------")
    return {
        "reservations": allReservations
    }

@reservation_router.route('/new/reservation', methods=['POST'])
def new_reservation():
    data = request.json
    new_res = Reservation(**data)
    db.session.add(new_res)
    db.session.commit()
    return new_res.to_dict()

@reservation_router.route('/<id>/delete', methods=['DELETE'])
def delete_reservation(id):

    reservation=Reservation.query.get(id)
    db.session.delete(reservation)
    db.session.commit()

    return reservation.to_dict()
