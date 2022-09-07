from flask import Blueprint, jsonify, session, request
from app.models import User, db, Class, Card, Deck
from app.forms import CardForm
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages


card_routes = Blueprint('cards', __name__)


# Get all cards
@card_routes.route('')
def get_all_cards():

    cards = Card.query.all()
    res = {"cards": []}

    for card in cards:
        res["cards"].append(card.to_dict())

    return res

# Get all owned cards
@card_routes.route('/current-user-owned')
@login_required
def get_all_owned_cards():

    cards = Card.query.all()
    res = {"cards": []}

    for card in cards:
        if card.deck.parent_class.owner_id == current_user.id:
            res["cards"].append(card.to_dict())

    return res

# Get all cards of a deck
@card_routes.route('/deck/<int:deckId>')
def get_deck_cards(deckId):

    cards = Card.query.filter(Card.deck_id == deckId).all()
    res = {"cards": []}

    for card in cards:
        res["cards"].append(card.to_dict())

    return res

# Get card by id
@card_routes.route('/<int:cardId>')
def get_one_card(cardId):

    single_card = Card.query.get(cardId)
    if single_card is None:
        return {"message": "card does not exist", "statusCode": 404}, 404
    else:
        res = {"card": single_card.to_dict()}
        return res

# create a card
@card_routes.route('/create', methods=["POST"])
@login_required
def create_card():

    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        parent_deck = Deck.query.get(data['deck_id'])
        if parent_deck is None:
            return {"message": "Deck does not exist", "statusCode": 404}, 404

        parent_class = Class.query.get(parent_deck.to_dict_no_addons()['class_id'])

        if parent_class.to_dict_no_addons()['owner_id'] == current_user.id:
            new_card = Card(
                question = data['question'],
                answer= data['answer'],
                deck_id = data['deck_id']
            )
            db.session.add(new_card)
            db.session.commit()
            return new_card.to_dict_no_deck()
        else:
            return {'errors': ["Unauthorized"]}, 401
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# edit a card
@card_routes.route('/<int:cardId>/edit', methods=["PUT"])
@login_required
def edit_card(cardId):

    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        card_to_edit = Card.query.get(cardId)

        if card_to_edit is None:
            return {"message": "card does not exist", "statusCode": 404}, 404

        parent_class = card_to_edit.to_dict_with_class()['deck']['parent_class']

        if parent_class['owner_id'] == current_user.id and card_to_edit.deck_id == data['deck_id']:

            card_to_edit.question = data['question']
            card_to_edit.answer = data['answer']
            card_to_edit.deck_id = data['deck_id']

            db.session.commit()
            return card_to_edit.to_dict_no_deck()
        else:
            return {'errors': ["Unauthorized"]}, 401
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# delete a card by id
@card_routes.route('/<int:cardId>/delete', methods=["DELETE"])
@login_required
def delete_card(cardId):

    card_to_delete = Card.query.get(cardId)

    if card_to_delete is not None:
        parent_class = card_to_delete.to_dict_with_class()['deck']['parent_class']
        if parent_class['owner_id'] == current_user.id:
            db.session.delete(card_to_delete)
            db.session.commit()
            return {"message": "Successfully deleted"}
        else:
            return {"errors": ["Unauthorized"]}, 401

    # else should throw 404
    else:
        return {"message": "Card not found"}, 404
