from email.policy import default
from wsgiref.validate import validator
from .db import db

class Class(db.Model):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    purpose = db.Column(db.String, nullable=False, default="General Learning")
    headline = db.Column(db.String(40), nullable=True)
    description = db.Column(db.String(1000), nullable=True)
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
            'description': self.desciption,
            'private': self.private,
            'user': self.user.to_dict(),
            'decks': self.decks.to_dict_no_addons()
        }

    def to_dict_no_addons(self):
        return {
            'id': self.id,
            'name': self.name,
            'purpose':self.purpose,
            'headline': self.headline,
            'description': self.desciption,
            'private': self.private
        }
