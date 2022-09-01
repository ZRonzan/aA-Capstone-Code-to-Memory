from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def class_name_length(form, field):
    name = field.data
    if len(name) > 50:
        raise ValidationError("Class name must be 50 characters or less.")

def class_headline_length(form, field):
    headline = field.data
    if headline is not None and len(headline) > 300 or headline is not None and len(headline) == 0:
        raise ValidationError("Class headline must be 300 characters or less.")

def class_description_length(form, field):
    description = field.data
    if description is not None and len(description) > 1500 or description is not None and len(description) == 0:
        raise ValidationError("Class description must be 1500 characters or less.")

class ClassForm(FlaskForm):
    name = StringField('class name', validators=[DataRequired(), class_name_length])
    purpose = StringField('purpose')
    headline = StringField('headline', validators=[class_headline_length])
    description = StringField('description', validators=[class_description_length])
    private = BooleanField('private')
    owner_id = IntegerField('owner id', validators=[DataRequired()])
