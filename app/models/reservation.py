from .db import db

class Reservation(db.Model):
  __tablename__ = 'reservations'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)
  res_date = db.Column(db.Date, nullable=False)
  res_time = db.Column(db.Time, nullable=False)
  party_size = db.Column(db.Integer, nullable=False)

  user = db.relationship('User', back_populates='reservations')
  restaurant = db.relationship('Restaurant', back_populates='reservations')
