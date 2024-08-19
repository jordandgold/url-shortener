from flask import Flask, jsonify, request
from flask_migrate import Migrate
from models import db, ShortenedUrl
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import uuid
import random, string

app = Flask(__name__)
app.secret_key = b'***************************************'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///url_shortener.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

bcrypt = Bcrypt(app)

def generate_shortened_url():
    return ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(5))

# API to get all shortened URLs
@app.route('/all')
def get_data():
    rows = ShortenedUrl.query.all()

    results = []
    for row in rows:
        results.append({
            'id': row.id,
            'shortened_url': row.shortened_url,
            'original_url': row.original_url,
        })

    return jsonify(results)

# API to shorten a URL
@app.route('/shorten', methods=['POST'])
def shorten_url():
    if request.method == 'POST':
        request_original_url = request.json['original_url']
        if not request_original_url:
            return jsonify({'error': 'No URL provided'}), 400
        
        shortened_url = ShortenedUrl(
            id=str(uuid.uuid4()),
            shortened_url=str(request.host_url + generate_shortened_url()),
            original_url=request.json['original_url'],
        )

        db.session.add(shortened_url)
        db.session.commit()
        
        return jsonify({
            'shortened_url': shortened_url.shortened_url
            })
    else:
        return jsonify({
            'error': 'Method not allowed'
        }), 405

# API to get the original version of a shortened URL
@app.route('/lengthen', methods=['POST'])
def lengthen_url():
    request_shortened_url = request.json['shortened_url']
    if not request_shortened_url:
        return jsonify({'error': 'No URL provided'}), 400

    requested_url = ShortenedUrl.query.filter_by(shortened_url=request_shortened_url).first()
    if requested_url:
        return jsonify({
            "original_url": requested_url.original_url
        })
    else:
        return jsonify({'error': 'URL not found'}), 404

if __name__ == '__main__':
    app.run(port=5555, debug=True)