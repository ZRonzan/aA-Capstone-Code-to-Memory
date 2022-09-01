from .db import db

class Mastery(db.Model):
    __tablename__ = "masteries"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    mastery_score = db.Column(db.Integer,  nullable=False)

    user = db.relationship('User', back_populates='masteries')
    card = db.relationship('Card', back_populates='masteries')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'card_id': self.card_id,
            'mastery_score': self.mastery_score,
            'card': self.card.to_dict_no_deck()
        }

    def to_dict_with_deck(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'card_id': self.card_id,
            'mastery_score': self.mastery_score,
            'card': self.card.to_dict()
        }

    def to_dict_no_addons(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'card_id': self.card_id,
            'mastery_score': self.mastery_score,
        }
