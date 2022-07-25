from .db import db

favorites = db.Table('favorites',
  db.Model.metadata,
  db.Column('restaurants', db.Integer, db.ForeignKey('restaurants.id'), primary_key=True),
  db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True))

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
  reviews = db.relationship('Review', back_populates='restaurant', cascade= 'all, delete')
  reservations = db.relationship('Reservation', back_populates='restaurant')
  restaurant_favorite = db.relationship('User', secondary=favorites, back_populates='user_favorite', cascade='all, delete')

  def to_dict(self):
    return {
        'id':self.id,
        'user_id': self.user_id,
        'name': self.name,
        'phone': self.phone,
        'street': self.street,
        'cuisine': self.cuisine,
        'hours':self.hours,
        'price_point':self.price_point
    }