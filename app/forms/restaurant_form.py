from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

# Split hours field into two (Opening, Closing Times)
# CUISINE_CHOICES = [American, Chinese, Barbecue, Indian, etc.]
# Image Url Field (With default?)

class NewRestaurantForm(FlaskForm):
    user_id = IntegerField('userId')
    name = StringField('Name', validators=[DataRequired()])
    phone = StringField('Phone')
    street = StringField('Street', validators=[DataRequired()])
    cuisine = StringField('Cuisine', validators=[DataRequired()])
    hours = StringField('Hours', validators=[DataRequired()])
    #imageUrl = StringField('Image', default='ourdefaultimage')
    price_point = IntegerField('Price Point', validators=[DataRequired()])

    submit = SubmitField('Submit')
