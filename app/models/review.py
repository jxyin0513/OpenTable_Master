from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)
  content = db.Column(db.String)
  rating = db.Column(db.Integer, nullable=False)

  user = db.relationship('User', back_populates='reviews')
  restaurant = db.relationship('Restaurant', back_populates='reviews')
