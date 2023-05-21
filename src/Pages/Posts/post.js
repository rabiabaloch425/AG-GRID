import { useEffect } from "react";
import AGGridData from "../../utils/AGGridData";
import AddPost from "../../components/addPost";
import DeletePost from "../../components/deletePost";

const Post = () => {
  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts").then((posts) => {
      fetch("https://jsonplaceholder.typicode.com/users").then((users) => {
        fetch("https://jsonplaceholder.typicode.com/comments").then(
          (comments) => {
            // find the user name for each post
            posts.json().then((postData) => {
              users.json().then((usersData) => {
                comments.json().then((commentsData) => {
                  const myData = postData.map((post) => {
                    const user = usersData.find(
                      (user) => user.id === post.userId
                    );
                    const comment = commentsData.find(
                      (comment) => comment.postId === post.id
                    );
                    return {
                      ...post,
                      author: user.name,
                      user: comment.name,
                      comment: comment.body,
                    };
                  });
                  AGGridData(myData.reverse());
                  console.log("myData: ", myData);
                });
              });
            });
          }
        );
      });
    });
  };

  return (
    <>
      <AddPost reloadData={fetchPostData} />
      <DeletePost />
      <div
        id="myGrid"
        className="ag-theme-alpine container"
        style={{ height: "500px", width: "100%" }}
      ></div>
    </>
  );
};

export default Post;
