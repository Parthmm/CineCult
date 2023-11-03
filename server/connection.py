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

@app.route('/')
def index():
    return render_template('index.html') 


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

@app.route('/add', methods=['POST'])
def add():
    data = request.form['data']
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (user_id) VALUES (%s)", (data,))
    conn.commit()
    cursor.close()
    conn.close()
    return redirect(url_for('index')) 

@app.route('/reviews/<movie_id>', methods=['GET']) 
def get_review(movie_id): 
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM movie_review")
    movies = cursor.fetchall()
    cursor.close()
    conn.close()
    response = jsonify(movies)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

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