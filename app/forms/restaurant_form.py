from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class NewRestaurantForm(FlaskForm):
    user_id = IntegerField('userId')
    name = StringField('Name', validators=[DataRequired()])
    phone = StringField('Phone')
    street = StringField('Street', validators=[DataRequired()])
    cuisine = StringField('Cuisine', validators=[DataRequired()])
    hours = StringField('Hours', validators=[DataRequired()])
    price_point = IntegerField('Price Point', validators=[DataRequired()])

    submit = SubmitField('Submit')
