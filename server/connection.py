from flask import Flask, render_template, request, redirect, url_for, jsonify
import mysql.connector 
from dotenv import dotenv_values
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super_secret'
jwt = JWTManager(app)
CORS(app)
bcrypt = Bcrypt(app)

config = {
    'host': dotenv_values('.env')['DB_HOST'],
    'user': dotenv_values('.env')['DB_USER'],
    'password': dotenv_values('.env')['DB_PASSWORD'],
    'database': dotenv_values('.env')['DB_DATABASE']
} 

# Attempt to establish a connection to the database
try:
    
    conn = mysql.connector.connect(**config)
    conn.close()
    print("Database connection successful")
except mysql.connector.Error as e:
    print(f"Database connection error: {str(e)}")

#Gets watchlist dashboard info
@app.route('/get_watchlist_dashboard_info', methods=['GET'])
@jwt_required()
def get_watchlist_dashboard_info():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""SELECT
                    m.name AS title, 
                    m.avg_rating,
                    m.movie_id AS content_id,
                    m.poster,
                    g.Name AS genre,
                    a.Name AS actor_name,
                    d.Name AS director_name,
                    l.Name AS language
                FROM
                    has AS h
                JOIN
                    movie AS m ON h.movie_id = m.movie_id
                JOIN
                    genre AS g ON h.genre_id = g.genre_id
                JOIN
                    actor AS a ON h.actor_id = a.actor_id
                JOIN
                    director AS d ON h.director_id = d.director_id
                JOIN
                    language AS l ON h.language_id = l.language_id
                UNION
                SELECT
                    t.name AS title, 
                    t.avg_rating,
                    t.tv_id AS content_id,
                    t.poster,
                    g.Name AS genre,
                    a.Name AS actor_name,
                    d.Name AS director_name,
                    l.Name AS language
                FROM
                    has AS h
                JOIN
                    tv_show AS t ON h.tv_id = t.tv_id
                JOIN
                    genre AS g ON h.genre_id = g.genre_id
                JOIN
                    actor AS a ON h.actor_id = a.actor_id
                JOIN
                    director AS d ON h.director_id = d.director_id
                JOIN
                    language AS l ON h.language_id = l.language_id""")
    watchlist = cursor.fetchall()
    cursor.close()
    conn.close()
    response = jsonify(watchlist)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

# Gets everything in watchlist
@app.route('/get_watchlist', methods=['GET'])
def get_watchlist():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""SELECT w.*, m.name AS title, m.avg_rating, m.poster, 'movie' AS content_type
                     FROM watchlist w
                     JOIN movie m ON w.content_id = m.movie_id
                     WHERE w.content_type = 'movie'
                     UNION
                     SELECT w.*, t.name AS title, t.avg_rating, t.poster, 'tv_show' AS content_type
                     FROM watchlist w
                     JOIN tv_show t ON w.content_id = t.tv_id
                     WHERE w.content_type = 'tv_show'""")
    watchlist = cursor.fetchall()
    cursor.close()
    conn.close()
    response = jsonify(watchlist)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response



# Adds content to the watchlist
@app.route('/add_to_watchlist', methods=['POST'])
@jwt_required()
def add_to_watchlist():
    data = request.get_json()

    # Check if the required parameters are present
    if 'user_id' not in data or 'content_id' not in data or 'content_type' not in data:
        return jsonify({'error': 'Missing parameters'}), 400

    user_id = data['user_id']
    content_id = data['content_id']
    content_type = data['content_type']

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()

    try:
        # Check if the content is already in the watchlist
        cursor.execute("SELECT * FROM watchlist WHERE user_id = %s AND content_id = %s AND content_type = %s",
                       (user_id, content_id, content_type))
        existing_watchlist_entry = cursor.fetchone()

        if existing_watchlist_entry:
            return jsonify({'error': 'Content already in watchlist'}), 400

        # Insert the new entry into the watchlist
        cursor.execute("INSERT INTO watchlist (user_id, content_id, content_type) VALUES (%s, %s, %s)",
                       (user_id, content_id, content_type))
        conn.commit()

        response = jsonify({'message': 'Content added to watchlist successfully'})
        return response

    except mysql.connector.Error as e:
        response = jsonify({'error': str(e)})
        return response, 500

    finally:
        cursor.close()
        conn.close()

# Removes content from the watchlist
@app.route('/remove_from_watchlist', methods=['POST'])
@jwt_required()
def remove_from_watchlist():
    data = request.get_json()

    # Check if the required parameters are present
    if 'user_id' not in data or 'content_id' not in data or 'content_type' not in data:
        return jsonify({'error': 'Missing parameters'}), 400

    user_id = data['user_id']
    content_id = data['content_id']
    content_type = data['content_type']

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()

    try:
        # Check if the content is in the watchlist
        cursor.execute("SELECT * FROM watchlist WHERE user_id = %s AND content_id = %s AND content_type = %s",
                       (user_id, content_id, content_type))
        existing_watchlist_entry = cursor.fetchone()

        if not existing_watchlist_entry:
            return jsonify({'error': 'Content not found in watchlist'}), 404

        # Remove the entry from the watchlist
        cursor.execute("DELETE FROM watchlist WHERE user_id = %s AND content_id = %s AND content_type = %s",
                       (user_id, content_id, content_type))
        conn.commit()

        response = jsonify({'message': 'Content removed from watchlist successfully'})
        return response

    except mysql.connector.Error as e:
        response = jsonify({'error': str(e)})
        return response, 500

    finally:
        cursor.close()
        conn.close()


# Gets movie dashboard info 
@app.route('/get_dashboard_info/<user_id>', methods=['GET'])
@jwt_required()
def get_dashboard_info():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""SELECT
                    m.name AS movie_name, 
                    m.avg_rating as movie_rating, 
                    m.movie_id as movie_id,
                    g.Name AS genre,
                    a.Name AS actor_name,
                    d.Name AS director_name,
                    l.Name AS language
                FROM
                    has AS h
                JOIN
                    movie AS m ON h.movie_id = m.movie_id
                JOIN
                    genre AS g ON h.genre_id = g.genre_id
                JOIN
                    actor AS a ON h.actor_id = a.actor_id
                JOIN
                    director AS d ON h.director_id = d.director_id
                JOIN
                    language AS l ON h.language_id = l.language_id""")
    movies = cursor.fetchall()
    cursor.close()
    conn.close()
    response = jsonify(movies)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


# Gets all movies
@app.route('/get_movies', methods=['GET'])
def get_movies():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM movie")
    movies = cursor.fetchall()
    cursor.close()
    conn.close()
    response = jsonify(movies)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response 

# Adds a user 
@app.route('/adduser', methods=['POST'])
def add():
    data = request.get_json()
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()  

    cursor.execute("SELECT * FROM users WHERE name = %s", (data['name'],))
    user = cursor.fetchone()
    
    if user:
        # Username already exists, handle accordingly (e.g., return an error response)
        cursor.close()
        conn.close()
        return "Username already exists", 400
    
    cursor.execute("SELECT * FROM users WHERE email_address = %s", (data['email'],))
    user_with_same_email = cursor.fetchone()
    if user_with_same_email:
        # Username already exists, handle accordingly (e.g., return an error response)
        cursor.close()
        conn.close()
        return "Email is already associated with an existing user", 400
    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    cursor.execute("INSERT INTO users (user_id, name, password, email_address, username) VALUES (%s, %s, %s, %s, %s)", (data['user_id'], data['name'], hashed_password, data['email'], data['username']))
    conn.commit()
    cursor.close()
    conn.close()
    response = jsonify({'status': 'success', 'message': 'Form submitted successfully'})
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()  

    cursor.execute("SELECT * FROM users WHERE username = %s", (data['name'], ))
    user = cursor.fetchone()
    print(user)
    if not user or not bcrypt.check_password_hash(user[2], data['password']):
        # Username already exists, handle accordingly (e.g., return an error response)
        cursor.close()
        conn.close()
        return "Username or password is incorrect", 400

    conn.commit()
    cursor.close()
    conn.close()
    access_token = create_access_token(identity=user[0])
    response = jsonify({'token': access_token})
    print(response)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

# Gets the reviews for a movie
@app.route('/reviews/<movie_id>', methods=['GET']) 
@jwt_required()
def get_review(movie_id): 
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT review, username FROM movie_reviews WHERE movie_id = (%s) ", (movie_id, ))
    reviews = cursor.fetchall() 
    print(reviews)
    cursor.close()
    conn.close()
    response_data = {
        'reviews': reviews
    }
    response = jsonify(response_data)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

# Adds a review for a movie 
@app.route('/reviews/<movie_id>', methods=['POST'])
def add_review(movie_id): 
    data = request.get_json()
    
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    
    try:
        cursor.execute("INSERT INTO movie_reviews (username, movie_id, review) VALUES (%s,%s, %s)", (data['username'],data['movieId'], data['review']))  # Corrected the SQL
        conn.commit()
        response = jsonify({"message": "Review added successfully!"})  # Modified the response for consistency
    except mysql.connector.Error as e:
        response = jsonify({"error": str(e)})
    finally:
        cursor.close()
        conn.close()
    
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response 

# Edit movie review
@app.route('/reviews/<movie_id>', methods=['PUT'])
def update_review(movie_id):
    review_text = request.form.get('review')

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    
    try:
        cursor.execute("UPDATE movie_reviews SET review = %s WHERE movie_id = %s", (review_text, movie_id))
        conn.commit()
        if cursor.rowcount == 0:
            response = jsonify({"error": "Review not found for the given movie_id."})
        else:
            response = jsonify({"message": "Review updated successfully!"})
    except mysql.connector.Error as e:
        response = jsonify({"error": str(e)})
    finally:
        cursor.close()
        conn.close()
    
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response 

# Delete a review for a movie 
@app.route('/reviews/<movie_id>/<username>', methods=['DELETE']) 
def delete_single_review(movie_id,username): 
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    
    try:
        cursor.execute("DELETE FROM movie_reviews WHERE movie_id = %s and username = %s", (movie_id,username))
        conn.commit()
        if cursor.rowcount == 0:
            response = jsonify({"error": "Review not found for the given movie_id."})
        else:
            response = jsonify({"message": "Review deleted successfully!"})
    except mysql.connector.Error as e:
        response = jsonify({"error": str(e)})
    finally:
        cursor.close()
        conn.close()
    
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

# Deletes all reviews for a movie 
@app.route('/reviews/<movie_id>', methods=['DELETE'])
def delete_review(movie_id):
    review_text = request.form.get('review')

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    
    try:
        cursor.execute("DELETE FROM movie_reviews WHERE movie_id = %s", (movie_id,))
        conn.commit()
        if cursor.rowcount == 0:
            response = jsonify({"error": "Review not found for the given movie_id."})
        else:
            response = jsonify({"message": "Review deleted successfully!"})
    except mysql.connector.Error as e:
        response = jsonify({"error": str(e)})
    finally:
        cursor.close()
        conn.close()
    
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == '__main__':
    app.run(debug=True)