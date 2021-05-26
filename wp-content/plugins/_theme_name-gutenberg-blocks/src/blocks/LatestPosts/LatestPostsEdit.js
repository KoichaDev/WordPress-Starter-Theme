const { Component } = wp.element;
const { withSelect } = wp.data; // Using the WP Redux

class LatestPostsEdit extends Component {
  render() {
    console.log(this.props);
    return <p>akdopaskopd</p>;
  }
}

export default withSelect((select, props) => {
  const { attributes } = props;
  const { numberOfPosts } = attributes;
  // The object below is taken from the WP Rest API arguments you can send
  // https://developer.wordpress.org/rest-api/reference/posts/#arguments
  let query = { per_page: numberOfPosts };

  return {
    post: select('core').getEntityRecords('postType', 'post', { query }),
  };
})(LatestPostsEdit);
