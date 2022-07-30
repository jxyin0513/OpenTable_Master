from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, TimeField, SelectField
from wtforms.validators import DataRequired, Regexp
from .custom_validators import NotEqualTo

# Split hours field into two (Opening, Closing Times)
CUISINE_CHOICES = ['American', 'Barbecue', 'Cafe', 'Chinese', 'Fast Food', 'Indian', 'Italian', 'Japanese', 'Korean BBQ', 'Mediterranean', 'Mexican', 'Middle Earth', 'Thai', 'Vegan']
# Image Url Field (With default?)

class NewRestaurantForm(FlaskForm):
    user_id = IntegerField('userId')
    name = StringField('Name', validators=[DataRequired(message="Please provide name of the restaurant.")])
    phone = StringField('Phone', validators=[Regexp('^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$', message="Please provide correct format")])
    street = StringField('Street', validators=[DataRequired(message="Please provide your street address.")])
    cuisine = StringField('Cuisine', validators=[DataRequired(message="Select your cuisine type")])
    open_hours = TimeField('Open', validators=[DataRequired(message="Please provide your open hour"), NotEqualTo('close_hours', message='Open Hours may not equal Close Hours')])
    close_hours = TimeField('Close', validators=[DataRequired(message="Please provide your close hour")])
    image_url = StringField('Image')
    price_point = IntegerField('Price Point', validators=[DataRequired(message="Please provide your price point")])
