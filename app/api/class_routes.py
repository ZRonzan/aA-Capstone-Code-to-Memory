from flask import Blueprint, jsonify, session, request
from app.models import User, db, Class
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages


class_routes = Blueprint('classes', __name__)


# Get all classes
@class_routes.route('/')
def current_user_classes():

    classes = Class.query.all()
    res = {"classes": []}

    for clss in classes:
        res["classes"].append(clss.to_dict_no_addons())

    return res

# Get classes belonging to the current logged in user
@class_routes.route('/current-user-classes')
@login_required
def current_user_classes():

    classes = Class.query.filter(Class.owner_id == current_user.id)
    res = {"classes": []}

    for clss in classes:
        res["classes"].append(clss.to_dict_no_addons())

    return res
