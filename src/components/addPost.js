import { useEffect, useState } from "react";

const AddPost = ({ reloadData }) => {
  const [state, setState] = useState({
    name: "",
    body: "",
    id: "",
  });
  const postData = JSON.parse(localStorage.getItem("postData"));

  useEffect(() => {
    // if (JSON.parse(localStorage.getItem("postData"))) {
    //   setState({
    //     name: postData.title,
    //     body: postData.body,
    //     id: postData.userId,
    //   });
    // }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("state: ", state);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: state.name,
        body: state.body,
        userId: state.id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          reloadData();
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 3000);
        }
      });

    setState({
      name: "",
      body: "",
      id: "",
    });
  };

  const updateData = () => {
    localStorage.removeItem("postData");

    fetch(`https://jsonplaceholder.typicode.com/posts/${postData.id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: postData.id,
        title: state.name,
        body: state.body,
        userId: state.id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          reloadData();
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function () {
            x.className = x.className.replace("show", "");
          }, 3000);
        }
      });
  };
  return (
    <div className="container mt-5">
      <form>
        <div
          className="form-group"
          style={{
            display: "flex",
            gap: "1em",
            justifyContent: "center",
            marginBottom: "2em",
          }}
        >
          <div>
            <label htmlFor="name">Post Title</label> <br />
            <input
              type="text"
              className="form-control"
              id="name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="id">User ID</label> <br />
            <input
              type="text"
              className="form-control"
              id="id"
              value={state.id}
              onChange={(e) => setState({ ...state, id: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="body">Post Body</label>
            <br />
            <input
              type="text"
              className="form-control"
              id="body"
              value={state.body}
              onChange={(e) => setState({ ...state, body: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {/* {postData ? "Update" : "Submit"} */}
            Save
          </button>
        </div>
        <div id="snackbar">Post Created Successfully.</div>
        <div id="snackbar-update">Post Updated Successfully.</div>
      </form>
    </div>
  );
};

export default AddPost;
