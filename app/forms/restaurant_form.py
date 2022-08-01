
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, TimeField, SelectField
from wtforms.validators import DataRequired, Regexp, ValidationError


# Split hours field into two (Opening, Closing Times)
CUISINE_CHOICES = ['American', 'Barbecue', 'Cafe', 'Chinese', 'Fast Food', 'Indian', 'Italian', 'Japanese', 'Korean BBQ', 'Mediterranean', 'Mexican', 'Middle Earth', 'Thai', 'Vegan']
# Image Url


def validate_close(form, open_hours):
    # print('form data >>>>>>', form.data['open_hours'])
    if form.data['open_hours']==form.data['close_hours']:
        raise ValidationError('Open must be before close')
    if form.data['open_hours']>form.data['close_hours']:
        raise ValidationError('Open must be before close')


class NewRestaurantForm(FlaskForm):
    user_id = IntegerField('userId')
    name = StringField('Name', validators=[DataRequired(message="Please provide name of the restaurant.")])
    phone = StringField('Phone', validators=[Regexp('^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$', message="Please provide correct format")])
    street = StringField('Street', validators=[DataRequired(message="Please provide your street address.")])
    cuisine = StringField('Cuisine', validators=[DataRequired(message="Select your cuisine type")])
    open_hours = TimeField('Open', validators=[DataRequired(message="Please provide your open hour")])
    close_hours = TimeField('Close', validators=[DataRequired(message="Please provide your close hour"), validate_close])
    image_url = StringField('Image')
    price_point = IntegerField('Price Point', validators=[DataRequired(message="Please provide your price point")])
