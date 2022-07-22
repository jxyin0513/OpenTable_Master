from .db import db

class Restaurant(db.Model):
  __tablename__ = 'restaurants'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  name = db.Column(db.String, nullable=False)
  phone = db.Column(db.String)
  street = db.Column(db.String, nullable=False)
  cuisine = db.Column(db.String, nullable=False)
  hours = db.Column(db.String, nullable=False)
  price_point = db.Column(db.Integer, nullable=False)

  users = db.relationship('User', back_populates='restaurants')
  reviews = db.relationship('Review', back_populates='restaurant')
  reservations = db.relationship('Reservation', back_populates='restaurant')
