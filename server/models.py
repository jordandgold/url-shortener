
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)

class ShortenedUrl(db.Model):
    __tablename__ ='shortened_urls'

    id = db.Column(db.String, primary_key=True)
    shortened_url = db.Column(db.String, unique=True, nullable=False)
    original_url = db.Column(db.String, nullable=False)