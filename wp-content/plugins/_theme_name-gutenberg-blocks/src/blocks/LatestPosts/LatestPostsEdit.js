const { Component } = wp.element;
const { __ } = wp.i18n;
const { withSelect } = wp.data; // Using the WP Redux

class LatestPostsEdit extends Component {
  render() {
    const { posts, className } = this.props;
    console.log(this.props);
    return (
      <>
        {posts && posts.length > 0 ? (
          <ul className={className}>
            {posts.map((post) => (
              <li key={post.id}>
                <a href={post.link} target='_blank' rel='noopener noreferrer'>
                  {post.title.rendered}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            {posts
              ? __('No WP Posts found', 'themename-blocks')
              : __('Loading...', 'themename-blocks')}
          </div>
        )}
      </>
    );
  }
}

export default withSelect((select, props) => {
  const { attributes } = props;
  const { numberOfPosts } = attributes;
  // The object below is taken from the WP Rest API arguments you can send
  // https://developer.wordpress.org/rest-api/reference/posts/#arguments
  return {
    posts: select('core').getEntityRecords('postType', 'post', {
      per_page: numberOfPosts, // Getting all the post that exist on the WP database
    }),
  };
})(LatestPostsEdit);
