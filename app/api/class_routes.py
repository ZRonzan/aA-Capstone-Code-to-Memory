from flask import Blueprint, jsonify, session, request
from app.models import User, db, Class
from app.forms import ClassForm
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages


class_routes = Blueprint('classes', __name__)


# Get all classes
@class_routes.route('')
def get_all_classes():

    classes = Class.query.all()
    res = {"classes": []}

    for clss in classes:
        res["classes"].append(clss.to_dict_no_addons())

    return res


# Get Class by id
@class_routes.route('/<classId>')
def get_one_class(classId):

    single_class = Class.query.get(classId)
    if single_class is None:
        return {"message": "Class does not exist", "statusCode": 404}, 404
    else:
        res = {"class": single_class.to_dict_all_data()}
        return res

# Get classes belonging to the current logged in user
@class_routes.route('/current-user-classes')
@login_required
def current_user_classes():

    classes = Class.query.filter(Class.owner_id == current_user.id)
    res = {"classes": []}

    for clss in classes:
        res["classes"].append(clss.to_dict())

    return res

# create a class
@class_routes.route('/create', methods=["POST"])
@login_required
def create_class():

    form = ClassForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        if data['owner_id'] == current_user.id:
            new_class = Class(
                name = data['name'],
                purpose = None,
                headline = None,
                description = None,
                private = False,
                owner_id = current_user.id
            )
            db.session.add(new_class)
            db.session.commit()
            return new_class.to_dict_no_addons()
        else:
            return {'errors': ["Unauthorized"]}, 401
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# delete a class by id
@class_routes.route('/<int:classId>/delete', methods=["DELETE"])
@login_required
def delete_class(classId):

    class_to_delete = Class.query.get(classId)

    if class_to_delete is not None:
        if class_to_delete.owner_id == current_user.id:
            db.session.delete(class_to_delete)
            db.session.commit()
            return {"message": "Successfully deleted"}
        else:
            return {"errors": ["Unauthorized"]}, 401

    # else should throw 404
    else:
        return {"message": "Class not found"}, 404

# edit a class by id
@class_routes.route('/<int:classId>/edit', methods=["PUT"])
@login_required
def edit_class(classId):

    class_to_edit = Class.query.get(classId)
    form = ClassForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        if class_to_edit.owner_id == current_user.id:

            class_to_edit.name = data['name']
            class_to_edit.purpose = data['purpose']
            class_to_edit.headline = data['headline']
            class_to_edit.description = data['description']
            class_to_edit.private = data['private']

            db.session.commit()
            return class_to_edit.to_dict_no_addons()
        else:
            return {'errors': ["Unauthorized"]}, 401
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
