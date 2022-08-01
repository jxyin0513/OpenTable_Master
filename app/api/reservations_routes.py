from flask import Blueprint, redirect, render_template, request
from app.models import Reservation, db
from app.forms.reservation_form import ReservationForm
from app.models.user import User

reservation_router = Blueprint('reservations',__name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get route all reservations for specified user.
@reservation_router.route('/<userId>')
def getReservations(userId):
    print(userId)
    reservations = Reservation.query.filter_by(user_id = userId).all()

    allReservations = [res.to_dict() for res in reservations]
    return {
        "reservations": allReservations
    }

# Create a new reservation
@reservation_router.route('/new/reservation', methods=['POST'])
def new_reservation():
    data = request.json
    form = ReservationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        new_res = Reservation(**data)
        db.session.add(new_res)
        db.session.commit()
        return new_res.to_dict()
    if form.errors:
        print(form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Delete a reservation
@reservation_router.route('/<id>/delete', methods=['DELETE'])
def delete_reservation(id):

    reservation=Reservation.query.get(id)
    db.session.delete(reservation)
    db.session.commit()

    return reservation.to_dict()
