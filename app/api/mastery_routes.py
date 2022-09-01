from flask import Blueprint, request
from app.models import db, Card, Mastery
from app.forms import MasteryForm
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages


mastery_routes = Blueprint('mastery_scores', __name__)


# Get current user mastery records for a deck
@mastery_routes.route('/deck/<int:deckId>')
@login_required
def get_scores_for_deck(deckId):
    res = {"deck_scores": []}

    scores = Mastery.query.filter(Mastery.user_id == current_user.id).all()
    if len(scores) == 0:
        return res

    deck_scores = [score.to_dict_no_addons() for score in scores if score.to_dict_with_deck()['card']['deck']['id'] == deckId]
    if len(deck_scores) == 0:
        return res

    for score in deck_scores:
        res['deck_scores'].append(score)

    return res

# create a mastery score
@mastery_routes.route('/create', methods=["POST"])
@login_required
def create_mastery():

    form = MasteryForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        card_check = Card.query.get(data['card_id'])
        if card_check is None:
            return {"message": "Card cannot be found", "statusCode": 404}, 404

        mastery_check = Mastery.query.filter(Mastery.user_id == data['user_id'], Mastery.card_id == data['card_id']).first()

        if mastery_check is not None:
            return {"message": "Mastery record already exists", "statusCode": 401}, 401

        if data['user_id'] == current_user.id:
            new_mastery = Mastery(
                user_id = current_user.id,
                card_id = data['card_id'],
                mastery_score = data['mastery_score']
            )
            db.session.add(new_mastery)
            db.session.commit()
            return new_mastery.to_dict_no_addons()
        else:
            return {'errors': ["Unauthorized"]}, 401
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# update a mastery score
@mastery_routes.route('/<int:masteryId>/edit', methods=["PUT"])
@login_required
def update_mastery(masteryId):

    form = MasteryForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        mastery_score_to_edit = Mastery.query.get(masteryId)
        if mastery_score_to_edit is None:
            return {"message": "Mastery record does not exist", "statusCode": 404}, 404

        card_check = Card.query.get(data['card_id'])
        if card_check is None:
            return {"message": "Card cannot be found", "statusCode": 404}, 404

        if data['user_id'] == current_user.id:

            mastery_score_to_edit.mastery_score = data['mastery_score']

            db.session.commit()
            return mastery_score_to_edit.to_dict_no_addons()
        else:
            return {'errors': ["Unauthorized"]}, 401
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400



# delete a mastery record by id
@mastery_routes.route('/<int:masteryId>/delete', methods=["DELETE"])
@login_required
def delete_mastery(masteryId):

    mastery_to_delete = Mastery.query.get(masteryId)

    if mastery_to_delete is not None:
        print(mastery_to_delete.to_dict_no_addons()['user_id'])
        if mastery_to_delete.to_dict_no_addons()['user_id'] == current_user.id:
            db.session.delete(mastery_to_delete)
            db.session.commit()
            return {"message": "Successfully deleted"}
        else:
            return {"errors": ["Unauthorized"]}, 401

    # else should throw 404
    else:
        return {"message": "Mastery record not found"}, 404
