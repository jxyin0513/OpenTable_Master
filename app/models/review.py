from .db import db

class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)
  content = db.Column(db.String)
  rating = db.Column(db.Integer, nullable=False)

  user = db.relationship('User', back_populates='reviews')
  restaurant = db.relationship('Restaurant', back_populates='reviews')

  #Class method that converts Class Obj to JSON-able dictionary
  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'restaurant_id': self.restaurant_id,
      'content': self.content,
      'rating': self.rating
    }
