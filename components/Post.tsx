import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

function Post({ alt, date, image, title, url, body }) {
  const test = documentToHtmlString(body);

  return (
    <div className="container">
      {image && <img alt={alt} src={image.fields.file.url} />}
      <div className="text">
        <h2>{title}</h2>
        <h4>{date}</h4>
      </div>

      <div dangerouslySetInnerHTML={{ __html: test }} />
    </div>
  );
}

export default Post;
