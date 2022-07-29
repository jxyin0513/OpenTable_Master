from app.models import db, Restaurant, Reservation, Review, favorites
from datetime import date, time
def seed_restaurants():
  demo = Restaurant(
    user_id=1, name='Joe\'s', phone='867-5309', street='555 Nowhere', cuisine='American', open_hours=time.fromisoformat('09:00:00'), close_hours=time.fromisoformat('09:00:00'), image_url='https://i.imgur.com/uVXJcqq.jpg', price_point=2
  )
  demo_a = Restaurant(
    user_id=1, name='Ma n\' Pa\'s', phone='555-5055', street='12 Hereandthere Ave', cuisine='American', open_hours=time.fromisoformat('06:00:00'), close_hours=time.fromisoformat('13:30:00'), image_url='https://i.imgur.com/uVXJcqq.jpg', price_point=2
  )
  demo_b = Restaurant(
    user_id=1, name='Glazed Over Southern BBQ', phone='555-0315', street='10132 Nonexistent Suite A', cuisine='Barbecue', open_hours=time.fromisoformat('10:00:00'), close_hours=time.fromisoformat('19:00:00'), image_url='https://i.imgur.com/nkEnMOJ.jpg', price_point=3
  )
  demo_c = Restaurant(
    user_id=1, name='Stoic Club Cafe', phone='927-1994', street='51135 Summers Blvd', cuisine='Cafe', open_hours=time.fromisoformat('05:00:00'), close_hours=time.fromisoformat('20:00:00'), image_url='https://i.imgur.com/W9y9eeI.jpg', price_point=4
  )
  demo_d = Restaurant(
    user_id=1, name='City Wok', phone='838-4002', street='2778 Mala Vista Drive', cuisine='Chinese', open_hours=time.fromisoformat('09:00:00'), close_hours=time.fromisoformat('18:00:00'), image_url='https://i.imgur.com/nJhhVFR.jpg', price_point=2
  )
  demo_e = Restaurant(
    user_id=1, name='Burger Factory', phone='840-5000', street='222 Munch Blvd', cuisine='Fast Food', open_hours=time.fromisoformat('07:00:00'), close_hours=time.fromisoformat('21:00:00'), image_url='https://i.imgur.com/zxhSEZ7.jpg', price_point=1
  )
  demo_f = Restaurant(
    user_id=1, name='Golden Kitchen', phone='800-8080', street='1482 Broad Road', cuisine='Indian', open_hours=time.fromisoformat('11:00:00'), close_hours=time.fromisoformat('18:00:00'), image_url='https://i.imgur.com/QwMwwsu.jpg', price_point=2
  )
  demo_g = Restaurant(
    user_id=1, name='Parmesano', phone='800-5555', street='20 Wharfside Road Suite C', cuisine='Italian', open_hours=time.fromisoformat('18:00:00'), close_hours=time.fromisoformat('22:00:00'), image_url='https://i.imgur.com/sIS3iuv.png', price_point=4
  )
  demo_h = Restaurant(
    user_id=1, name='Hanzo\'s Japanese Kitchen', phone='524-2016', street='17222 Outtatown Blvd', cuisine='Japanese', open_hours=time.fromisoformat('10:00:00'), close_hours=time.fromisoformat('20:00:00'), image_url='https://i.imgur.com/7rEqClk.jpg', price_point=3
  )
  demo_i = Restaurant(
    user_id=1, name='Blue Iron Grill', phone='555-8000', street='3332 Unfound Ave', cuisine='Korean BBQ', open_hours=time.fromisoformat('12:00:00'), close_hours=time.fromisoformat('20:00:00'), image_url='https://i.imgur.com/48KUptG.jpg', price_point=3
  )
  demo_j = Restaurant(
    user_id=1, name='Cantos Gyros', phone='500-5000', street='900 Lost Lane', cuisine='Mediterranean', open_hours=time.fromisoformat('09:00:00'), close_hours=time.fromisoformat('16:00:00'), image_url='https://i.imgur.com/6sNLFhg.jpg', price_point=2
  )
  demo_k = Restaurant(
    user_id=1, name='La Ciudad', phone='800-8800', street='43324 Spoof Street', cuisine='Mexican', open_hours=time.fromisoformat('10:00:00'), close_hours=time.fromisoformat('22:00:00'), image_url='https://i.imgur.com/eVcVqbQ.jpg', price_point=3
  )
  demo_l = Restaurant(
    user_id=1, name='The Prancing Pony', phone='???-????', street='Great East Road', cuisine='Middle Earth', open_hours=time.fromisoformat('00:00:00'), close_hours=time.fromisoformat('00:00:00'), image_url='https://i.imgur.com/P0NVkj6.jpg', price_point=3
  )
  demo_m = Restaurant(
    user_id=1, name='Basil Street', phone='800-8181', street='2316 Nosuch Ave', cuisine='Thai', open_hours=time.fromisoformat('10:00:00'), close_hours=time.fromisoformat('18:00:00'), image_url='https://i.imgur.com/yncFwXv.jpg', price_point=2
  )
  demo_n = Restaurant(
    user_id=1, name='Hidden Grove', phone='888-8081', street='38382 Wontfind Blvd', cuisine='Vegan', open_hours=time.fromisoformat('07:00:00'), close_hours=time.fromisoformat('17:00:00'), image_url='https://i.imgur.com/ifPhqEf.jpg', price_point=3
  )

  db.session.add(demo)
  db.session.add(demo_a)
  db.session.add(demo_b)
  db.session.add(demo_c)
  db.session.add(demo_d)
  db.session.add(demo_e)
  db.session.add(demo_f)
  db.session.add(demo_g)
  db.session.add(demo_h)
  db.session.add(demo_i)
  db.session.add(demo_j)
  db.session.add(demo_k)
  db.session.add(demo_l)
  db.session.add(demo_m)
  db.session.add(demo_n)

  db.session.commit()

def seed_reviews():
  demo = Review(
    user_id=2, restaurant_id=1, content='Decent', rating=4
  )
  demo_a = Review(
    user_id=2, restaurant_id=5, content='I love the city chicken!', rating=4
  )

  db.session.add(demo)
  db.session.add(demo_a)

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
