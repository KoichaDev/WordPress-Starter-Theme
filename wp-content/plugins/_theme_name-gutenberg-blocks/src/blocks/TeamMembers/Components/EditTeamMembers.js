const { Component } = wp.element;
const {
  RichText,
  MediaPlaceholder,
  BlockControls,
  MediaUpload,
  MediaUploadCheck,
  InspectorControls,
} = wp.blockEditor;
const { __ } = wp.i18n;
const { isBlobURL } = wp.blob;
const { Spinner, withNotices, Toolbar, IconButton, PanelBody, TextareaControl } = wp.components;

import './EditTeamMembers.scss';
class EditTeamMembers extends Component {
  componentDidMount() {
    const { attributes, setAttributes } = this.props;
    const { url, id } = attributes;

    if (url && isBlobURL(url) && !id) {
      setAttributes({
        url: '',
        alt: '',
      });
    }
  }

  onChangetitle = (title) => this.props.setAttributes({ title });

  onChangeInfo = (info) => this.props.setAttributes({ info });

  onSelectImageHandler = ({ id, url, alt }) => this.props.setAttributes({ id, url, alt });

  onSelectUrlImageHandler = (url) =>
    this.props.setAttributes({
      // In case if we choose url, we won't have an id, because it's not an image source from WP library
      url,
      id: null,
      alt: '',
    });

  onErrorUploadHandler = (error) => {
    const { noticeOperations } = this.props;
    noticeOperations.createErrorNotice(error);
  };

  onRemoveImageHandler = () => this.props.setAttributes({ id: null, url: '', alt: '' });

  onAltChangeHandler = (alt) => this.props.setAttributes({ alt });

  render() {
    const { className, attributes, noticeUI } = this.props;
    const { title, info, id, url, alt } = attributes;
    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Image Settings', 'themename-edit')}>
            {/* Inserting alt text for the image */}
            {url && !isBlobURL(url) && (
              <TextareaControl
                label={__('Alt Text (Alternative Text)', 'themename-edit')}
                value={alt}
                onChange={this.onAltChangeHandler}
                help={__(
                  "Alternative text description your image to people who can't see it. Add a short description with its key details. Please note this alt image is only applied for this post",
                  'onAltChangeHandler'
                )}
                placeholder={__('Type something...', 'themename-edit')}
              />
            )}
          </PanelBody>
        </InspectorControls>

        {/* Block Controls to use to remove image  */}
        <BlockControls>
          {url && (
            <Toolbar>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={this.onSelectImageHandler}
                  allowedTypes={['image']}
                  value={id}
                  render={({ open }) => {
                    return (
                      <IconButton
                        className='components-icon-button'
                        label={__('Edit Image', 'themename-edit')}
                        icon='edit'
                        onClick={open}
                      />
                    );
                  }}
                />
              </MediaUploadCheck>
              <IconButton
                className='components-icon-button'
                label={__('Remove Image', 'themename-edit')}
                icon='trash'
                onClick={this.onRemoveImageHandler}
              />
            </Toolbar>
          )}
        </BlockControls>
        <div className={className}>
          {url ? (
            <>{isBlobURL(url) ? <Spinner /> : <img src={url} alt={alt} />}</>
          ) : (
            <MediaPlaceholder
              icon='format-image'
              onSelect={this.onSelectImageHandler}
              onSelectURL={this.onSelectUrlImageHandler}
              onError={this.onErrorUploadHandler}
              // accept='image/*'
              allowedTypes={['image']}
              notices={noticeUI}
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
      </>
    );
  }
}

export default withNotices(EditTeamMembers);
