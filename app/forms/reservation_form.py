from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, DateField, TimeField
from wtforms.validators import DataRequired

class ReservationForm(FlaskForm):
    user_id = IntegerField('userId')
    restaurant_id = IntegerField('restaurantId')
    res_date = DateField('Date', validators=(DataRequired(message="Date must be provided")))
    res_time = TimeField('Time', validators=(DataRequired("Time must be provided")))
    party_size = IntegerField('Party Size', validators=[DataRequired(message="Please provide your party size")])
