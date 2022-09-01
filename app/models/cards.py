from .db import db


class Card(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)
    deck_id = db.Column(db.Integer, db.ForeignKey('decks.id'),  nullable=False)

    deck = db.relationship('Deck', back_populates='cards')
    masteries = db.relationship('Mastery', back_populates='card', cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'answer': self.answer,
            'deck_id': self.deck_id,
            'deck': self.deck.to_dict_no_addons()
        }

    def to_dict_with_class(self):
        return {
            'id': self.id,
            'question': self.question,
            'answer': self.answer,
            'deck_id': self.deck_id,
            'deck': self.deck.to_dict_with_parent_class()
        }

    def to_dict_no_deck(self):
        return {
            'id': self.id,
            'question': self.question,
            'answer': self.answer,
            'deck_id': self.deck_id
        }
