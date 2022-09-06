from email.policy import default
from wsgiref.validate import validator
from .db import db

class Class(db.Model):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text(50), nullable=False)
    purpose = db.Column(db.String, nullable=False, default="General Learning")
    headline = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    private = db.Column(db.Boolean, default=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship("User", back_populates='user_classes')
    decks = db.relationship("Deck", back_populates='parent_class', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'purpose':self.purpose,
            'headline': self.headline,
            'description': self.description,
            'private': self.private,
            'owner_id': self.owner_id,
            'decks': [deck.to_dict_no_addons() for deck in self.decks],
            'user': self.user.to_dict_name_only()
        }

    def to_dict_all_data(self):
        return {
            'id': self.id,
            'name': self.name,
            'purpose':self.purpose,
            'headline': self.headline,
            'description': self.description,
            'private': self.private,
            'owner_id': self.owner_id,
            'decks': [deck.to_dict() for deck in self.decks],
            'user': self.user.to_dict_name_only()
        }

    def to_dict_no_addons(self):
        return {
            'id': self.id,
            'name': self.name,
            'purpose':self.purpose,
            'headline': self.headline,
            'description': self.description,
            'private': self.private,
            'owner_id': self.owner_id,
            'user': self.user.to_dict_name_only()
        }
