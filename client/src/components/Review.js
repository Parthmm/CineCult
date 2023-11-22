import * as React from 'react';



function Review(props) {

    //style object too lazt to make a css folder
    const styles = {
        main: {
            display: "flex",
            flexDirection: "horizontal",
            width: "100%",
            border: "2px  solid black",
            justifyContent: "space-between",
        },
        userReview: {
            display: "flex",
            flexDirection: "column",
        },

    };

    return (
        <div style={styles.main}>
            <div style={styles.userReview}>
                <p>
                    {props.username}
                </p>

                <p>
                    {props.review}
                </p>
            </div>
            {/* If the prop says its a user the delete button will show up*/}
            {props.isUser && (
                < button onClick={props.deleteReview}>
                    Delete
                </button>
            )}

        </div >
    );
}

export default Review;