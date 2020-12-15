function Post({ alt, date, image, title, url, body }) {
  console.log(body);
  console.log(image);

  return (
    <div className="container">
      <img alt={alt} src={image.fields.file.url}/>
      <div className="text">
        <h2>{title}</h2>
        <h4>{date}</h4>
      </div>
    </div>
  );
}

export default Post;
