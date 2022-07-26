from app.models import db, Restaurant, Reservation, Review, favorites
from datetime import date, time
def seed_restaurants():
  demo = Restaurant(
    user_id=1, name='Joe\'s', phone='867-5309', street='555 Nowhere', cuisine='American', open_hours=time.fromisoformat('09:00:00'), close_hours=time.fromisoformat('09:00:00'), image_url='https://static.wikia.nocookie.net/shrek/images/5/58/Fc19d7db9cbcb7659aae3dce7bf6b3c1.jpg/revision/latest?cb=20170129025042', price_point=2
  )

  db.session.add(demo)

  db.session.commit()

def seed_reviews():
  demo = Review(
    user_id=2, restaurant_id=1, content='Decent', rating=4
  )

  db.session.add(demo)

  db.session.commit()

def seed_reservation():
  demo = Reservation(
    user_id=2, restaurant_id=1, res_date=date.fromisoformat('2022-07-23'), res_time=time.fromisoformat('12:30:00'), party_size=2
  )

  db.session.add(demo)

  db.session.commit()

def undo_re():
  db.session.execute('TRUNCATE restaurants, reviews, reservations RESTART IDENTITY CASCADE')
  db.session.commit()
