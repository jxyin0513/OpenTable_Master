from flask import Blueprint, redirect, render_template, request
from app.models import db, Review
from app.forms.review_form import ReviewForm

reviews = Blueprint('reviews',__name__)

@reviews.route('/all')
def get_reviews():
    reviews = Review.query.all()
    all_reviews = [review.to_dict() for review in reviews]
    return {'reviews': all_reviews}

@reviews.route('/new', methods=['POST'])
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        review = Review(
            user_id = form.data['user_id'],
            restaurant_id = form.data['restaurant_id'],
            content = form.data['content'],
            rating = form.data['rating']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()

@reviews.route('/<id>/edit', methods=['PUT'])
def edit_review(id):
    form = ReviewForm()
    review = Review.query.get(id)
    review.content = form.data['content']
    review.rating = form.data['rating']
    db.session.commit()
    return review.to_dict()

@reviews.route('/<id>/delete', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return review.to_dict()
