import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

interface TripCardProps {
  title: string,
  startDate: string,
  endDate: string,
  imageUrl: string,
}

function TripCard({ title, startDate, endDate, imageUrl }: TripCardProps) {  
  return (
    <div className="container">
      {/* <img src={imageUrl} /> */}
      <div className="text">
        <h2>{title}</h2>
        {/* <h4>{endDate}</h4> */}
      </div>
    </div>
  );
}

export default TripCard;
