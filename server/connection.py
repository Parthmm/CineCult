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



# Gets movie dashboard info 
@app.route('/get_dashboard_info', methods=['GET'])
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
        cursor.execute("INSERT INTO movie_reviews (username, movie_id, review, rating) VALUES (%s,%s, %s, %s)", (data['username'],data['movieId'], data['review'], data['rating']))  # Corrected the SQL
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