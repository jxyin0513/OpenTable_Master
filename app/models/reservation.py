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

  def to_dict(self):
    return {
        "id":self.id,
        "user_id": self.user_id,
        "restaurant_id": self.restaurant_id,
        "res_date": str(self.res_date),
        "res_time": str(self.res_time),
        "party_size":self.party_size
    }
