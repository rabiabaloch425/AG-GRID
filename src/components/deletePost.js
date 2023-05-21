const DeletePost = () => {
  const deletePost = () => {
    const postId = JSON.parse(localStorage.getItem("postId"));
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        var x = document.getElementById("snackbar-delete");
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 3000);
        localStorage.removeItem("postId");
      });
  };
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "1.5em",
      }}
    >
      <button type="submit" className="btn btn-primary" onClick={deletePost}>
        Delete
      </button>
      <div id="snackbar-delete">Post Deleted Successfully.</div>
    </div>
  );
};

export default DeletePost;
