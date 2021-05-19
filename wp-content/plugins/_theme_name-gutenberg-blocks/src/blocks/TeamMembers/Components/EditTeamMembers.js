const { Component } = wp.element;
const { RichText, MediaPlaceholder } = wp.blockEditor;
const { __ } = wp.i18n;
const { isBlobURL } = wp.blob;
const { Spinner } = wp.components;

import './EditTeamMembers.scss';
class EditTeamMembers extends Component {
  onChangetitle = (title) => this.props.setAttributes({ title });

  onChangeInfo = (info) => this.props.setAttributes({ info });

  onSelectImageHandler = ({ id, url, alt }) => this.props.setAttributes({ id, url, alt });

  render() {
    const { className, attributes } = this.props;
    const { title, info, url, alt } = attributes;
    return (
      <div className={className}>
        {url ? (
          <>{isBlobURL(url) ? <Spinner /> : <img src={url} alt={alt} />}</>
        ) : (
          <MediaPlaceholder
            icon='format-image'
            onSelect={this.onSelectImageHandler}
            onSelectURL={(url) => console.log(url)}
            onError={(error) => console.error(error)}
            accept='image/*'
            allowedTypes={['image']}
          />
        )}
        <RichText
          tagName='h4'
          className='wp-block-themename-blocks-team-members__title'
          onChange={this.onChangetitle}
          value={title}
          placeholder={__('Member name', 'themename-edit')}
          allowedFormats={[]} // Disable formatting stuff
        />

        <RichText
          tagName='p'
          className='wp-block-themename-blocks-team-members__info'
          onChange={this.onChangeInfo}
          value={info}
          placeholder={__('Member info', 'themename-edit')}
          allowedFormats={[]} // Disable formatting stuff
        />
      </div>
    );
  }
}

export default EditTeamMembers;
