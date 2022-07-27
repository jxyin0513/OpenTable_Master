from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, TimeField, SelectField
from wtforms.validators import DataRequired

# Split hours field into two (Opening, Closing Times)
CUISINE_CHOICES = ['American', 'Barbecue', 'Cafe', 'Chinese', 'Fast Food', 'Indian', 'Italian', 'Japanese', 'Korean BBQ', 'Mediterranean', 'Mexican', 'Middle Earth', 'Thai', 'Vegan']
# Image Url Field (With default?)

class NewRestaurantForm(FlaskForm):
    user_id = IntegerField('userId')
    name = StringField('Name', validators=[DataRequired()])
    phone = StringField('Phone')
    street = StringField('Street', validators=[DataRequired()])
    cuisine = SelectField('Cuisine', choices=CUISINE_CHOICES, validators=[DataRequired()])
    open_hours = TimeField('Open', validators=[DataRequired()])
    close_hours = TimeField('Close', validators=[DataRequired()])
    image_url = StringField('Image')
    price_point = IntegerField('Price Point', validators=[DataRequired()])
