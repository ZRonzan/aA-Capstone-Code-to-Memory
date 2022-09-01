from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    c2m = User(
        first_name="Code to", last_name="Memory", email='Code2Memory@aa.io', password='password')
    demo = User(
        first_name="Demo", last_name="User", email='demo@aa.io', password='password')
    marnie = User(
        first_name="Marnie", last_name="Thomas", email='marnie.t@aa.io', password='password')
    bobbie = User(
        first_name="Bobbie", last_name="Smith", email='bobbie.s@aa.io', password='password')
    jimmy = User(
        first_name="Jimmy", last_name="Stephenson", email='jimmy.s@aa.io', password='password')
    chris = User(
        first_name="Chris", last_name="Farley", email='chris.f@aa.io', password='password')

    db.session.add(c2m)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jimmy)
    db.session.add(chris)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
