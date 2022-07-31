from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange

class ReviewForm(FlaskForm):

    user_id = IntegerField('userId')
    restaurant_id = IntegerField('restaurantId')
    content = StringField('Review', validators=[DataRequired(message="Please write your review"), Length(min=1, max=255, message="Please write your review below 255 characters.")])
    rating = IntegerField('rating', validators=[DataRequired(message="Please provide your rating 1-5."), NumberRange(min=1, max=5, message="Please provide your rating 1-5.")])
