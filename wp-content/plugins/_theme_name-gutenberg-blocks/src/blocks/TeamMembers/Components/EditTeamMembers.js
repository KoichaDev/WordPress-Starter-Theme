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
const {
  Spinner,
  withNotices,
  Toolbar,
  IconButton,
  PanelBody,
  TextareaControl,
  SelectControl,
  Dashicon,
  Tooltip,
} = wp.components;
const { withSelect } = wp.data;

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

  onChangeImageSizeHandler = (url) => this.props.setAttributes({ url });

  // Return array of image sizes
  getImageSizes() {
    const { image, imageSizes } = this.props;
    if (!image) return [];
    let options = [];
    const imageSizeDetails = image.media_details.sizes;

    for (const key in imageSizeDetails) {
      const size = imageSizeDetails[key];
      const imageSize = imageSizes.find((size) => size.slug === key);

      if (imageSize) {
        options.push({
          label: imageSize.name,
          value: size.source_url,
        });
      }
    }
    return options;
  }

  render() {
    const { className, attributes, noticeUI, isSelected } = this.props;
    const { title, info, id, url, alt, social } = attributes;
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
            {id && (
              <SelectControl
                label={__('Image Resize', 'themename-edit')}
                options={this.getImageSizes()}
                onChange={this.onChangeImageSizeHandler}
                value={url}
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
          <div className='wp-block-themename-blocks-team-members__social-icon'>
            <ul>
              {social.map((socialItem, index) => {
                return (
                  <li key={index}>
                    {' '}
                    <Dashicon icon={socialItem.icon} size={16} />
                  </li>
                );
              })}

              {isSelected && (
                <li className='wp-block-themename-blocks-team-members__new-social-icon'>
                  <Tooltip text={__('Add Social Icon', 'themename-edit')}>
                    <button className='wp-block-themename-blocks-team-members__add-social-icon'>
                      <Dashicon icon='plus' size={14} />
                    </button>
                  </Tooltip>
                </li>
              )}
            </ul>
          </div>
        </div>
      </>
    );
  }
}
// WordPress allows us to use the withSelect higher order component to fetch this data
// and pass it to our component as props
export default withSelect((select, props) => {
  const { id } = props.attributes;
  return {
    image: id ? select('core').getMedia(id) : null,
    imageSizes: select('core/editor').getEditorSettings().imageSizes,
  };
})(withNotices(EditTeamMembers));
