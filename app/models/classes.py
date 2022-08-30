from email.policy import default
from wsgiref.validate import validator
from .db import db

class Classes(db.Model):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    purpose = db.Column(db.String, nullable=False, default="General Learning")
    headline = db.Column(db.String(40), nullable=True)
    desciption = db.Column(db.String(1000), nullable=True)
    