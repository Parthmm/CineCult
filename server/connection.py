from flask import Flask, render_template, request, redirect, url_for, jsonify
import mysql.connector 
from dotenv import dotenv_values 

app = Flask(__name__)



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
    
    cursor.execute("INSERT INTO users (user_id, name, password) VALUES (%s, %s, %s)", (data['user_id'], data['name'], data['password']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'status': 'success', 'message': 'Form submitted successfully'})  

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()  

    cursor.execute("SELECT * FROM users WHERE name = %s AND password = %s", (data['name'], data['password']))
    user = cursor.fetchone()

    if not user:
        # Username already exists, handle accordingly (e.g., return an error response)
        cursor.close()
        conn.close()
        return "Username or password is incorrect", 400
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'status': 'success', 'message': 'Form submitted successfully'})

# Gets the reviews for a movie
@app.route('/reviews/<movie_id>', methods=['GET']) 
def get_review(movie_id): 
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT review FROM movie_reviews WHERE movie_id = (%s) ", (movie_id, ))
    movies = cursor.fetchall()
    cursor.close()
    conn.close()
    response = jsonify(movies)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

# Adds a review for a movie 
@app.route('/reviews/<movie_id>', methods=['POST'])
def add_review(movie_id):
    review_text = request.form.get('review')

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    
    try:
        cursor.execute("INSERT INTO movie_reviews (movie_id, review) VALUES (%s, %s)", (movie_id, review_text))  # Corrected the SQL
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