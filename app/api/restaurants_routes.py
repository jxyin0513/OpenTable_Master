from flask import Blueprint, redirect, render_template, request
from app.forms.restaurant_form import NewRestaurantForm
from app.models import Restaurant, db, favorites
from app.models.user import User
from app.aws.aws_upload import upload_file_to_s3, allowed_file, get_unique_filename

restaurant_router = Blueprint('restaurants', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

#GETs new restaurant form
#POST adds a new restaurant
@restaurant_router.route('/newRestaurant', methods=['GET', 'POST'])
def newRestaurantForm():
    form = NewRestaurantForm()
    print(request.form.get('user_id'), '---')
    # print(url, '---')
    if "image" not in request.files:
        return {"errors": ["image is required for new restaurant"]}, 400
    image = request.files["image"]
    if not allowed_file(image.filename):
        return {"errors": ["file type is not permitted"]}, 400
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400
    url = upload["url"]
    form = NewRestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, 'this is what you want')
    if form.validate_on_submit():
        restaurant = Restaurant(
            user_id = int(request.form.get('user_id')),
            name = request.form.get('name'),
            phone = request.form.get('phone'),
            street = request.form.get('street'),
            cuisine = request.form.get('cuisine'),
            open_hours = request.form.get('open_hours'),
            close_hours = request.form.get('close_hours'),
            image_url = url,
            price_point = request.form.get('price_point')
            )
        db.session.add(restaurant)
        db.session.commit()
        return restaurant.to_dict()
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# @restaurant_router.route('/images/<id>', methods=['POST'])
# def uploadImage(id):
#     print(request.files)
#     if "image" not in request.files:
#         return {"errors": ["image required"]}, 400
#     image = request.files["image"]
#     if not allowed_file(image.filename):
#         return {"errors": ["file type not permitted"]}, 400
#     image.filename = get_unique_filename(image.filename)
#     upload = upload_file_to_s3(image)

#     if "url" not in upload:
#         # if the dictionary doesn't have a url key
#         # it means that there was an error when we tried to upload
#         # so we send back that error message
#         return upload, 400
#     url = upload["url"]
#     # flask_login allows us to get the current user from the request
#     new_image = Restaurant.query.get(id)
#     new_image.image_url = url
#     # db.session.add(new_image)
#     db.session.commit()
#     return {'image': {
#         'id': id,
#         'url': url
#     }}

#GET's an individual restaurants details
@restaurant_router.route('/<restaurantId>')
def singleRestaurant(restaurantId):
    restaurant= Restaurant.query.get(restaurantId)
    return restaurant.to_dict()

#Deletes an individual restaurant and all objects with relations to it
@restaurant_router.route('/<restaurantId>/delete', methods=['DELETE'])
def deleteRestaurant(restaurantId):
    users = User.query.all()
    print('===============')
    print("USERS:: ", users)
    print('===============')
    restaurant= Restaurant.query.get(restaurantId)
    db.session.delete(restaurant)
    db.session.commit()
    return restaurant.to_dict()

#PUTs updated info to a restaurant
@restaurant_router.route('/<restaurantId>/edit', methods=['PUT'])
def editRestaurant(restaurantId):
    restaurant= Restaurant.query.get(restaurantId)
    url=''
    if "image" in request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": ["file type is not permitted"]}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400
        url = upload["url"]
    form= NewRestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data['name'])
    if(form.validate_on_submit()):
        restaurant.name= request.form.get('name')
        restaurant.phone = request.form.get('phone')
        restaurant.street = request.form.get('street')
        restaurant.cuisine = request.form.get('cuisine')
        restaurant.open_hours = request.form.get('open_hours')
        restaurant.close_hours = request.form.get('close_hours')
        if(url != ''):
            restaurant.image_url = url
        restaurant.price_point = request.form.get('price_point')
        db.session.commit()
        return restaurant.to_dict()

    if form.errors:
        print(form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400



#POSTs a new favorite for a user
@restaurant_router.route('/favorites', methods=['GET','POST'])
def favorite_restaurant():
    data = request.json

    user = User.query.get(data['user_id'])
    restaurant = Restaurant.query.get(data['restaurant_id'])
    user.user_favorite.append(restaurant)

    db.session.commit()
    return {
        "user_id": user.id,
        "restaurant_id": restaurant.id
    }

#GET's a user's favorite restaurants
@restaurant_router.route('/favorites/<user_id>/<restaurant_id>')
def get_favorites(user_id, restaurant_id):
    user = User.query.get(user_id)
    restaurant = Restaurant.query.get(restaurant_id)
    if(restaurant in user.user_favorite):
        return {
        "user_id": user_id,
        "restaurant_id": restaurant_id
        }
    else:
        return {
            "message": "no favs"
        }

#Gets a user's favorite restaurants ... in a different way
@restaurant_router.route('/favorites/<user_id>')
def get_all_favorites(user_id):
    user = User.query.get(user_id)
    favorites = [restaurant.to_dict() for restaurant in user.user_favorite]
    return {
        "favorites": favorites
    }

@restaurant_router.route('/<user_id>/<restaurant_id>', methods=['DELETE'])
def remove_favorite(user_id, restaurant_id):
    user = User.query.get(user_id)
    restaurant = Restaurant.query.get(restaurant_id)
    if restaurant in user.user_favorite:
        user.user_favorite.remove(restaurant)
        db.session.commit()
    return {
            "user_id": user_id,
            "restaurant_id": restaurant_id
        }

@restaurant_router.route('/favorites/<restaurant_id>', methods=['DELETE'])
def destroy_all_favorites(restaurant_id):
    users = User.query.all()
    restaurant = Restaurant.query.get(restaurant_id)
    for user in users:
        if restaurant in user.user_favorite:
            user.user_favorite.remove(restaurant)
            db.session.commit()
    return { "message": "success" }

#Autofill search route
@restaurant_router.route('/search', methods=['GET', 'POST'])
def search_restaurant():
    query = request.json
    print(query)
    nameResults = Restaurant.query.filter(Restaurant.name.ilike(f'{query}%')).all()
    cuisineResults = Restaurant.query.filter(Restaurant.cuisine.ilike(f'{query}%')).all()
    if nameResults:
        results = nameResults
    else:
        results = cuisineResults
    print(results)
    restaurants = [k.to_dict() for k in results]
    print(restaurants)
    return { "restaurants": restaurants }
