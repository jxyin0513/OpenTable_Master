from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):

    user_id = IntegerField('userId')
    restaurant_id = IntegerField('restaurantId')
    content = StringField('Content', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
