from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def class_name_length(form, field):
    name = field.data
    if len(name) > 30:
        raise ValidationError("Class name must be 30 characters or less.")

class ClassForm(FlaskForm):
    name = StringField('class name', validators=[DataRequired(), class_name_length])
    purpose = StringField('purpose')
    headline = StringField('headline')
    desciption = StringField('description')
    private = BooleanField('private')
    owner_id = IntegerField('owner id', validators=[DataRequired()])
