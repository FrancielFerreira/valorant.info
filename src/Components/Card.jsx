import Skeleton from './Helper/Skeleton';
const Card = ({ data }) => {
  return (
    <>
      <li
        key={data.uuid}
        className="border border-indigo-600 shadow-lg rounded-md"
      >
        <Skeleton src={data.bustPortrait} alt={data.description} />
        <div className="p-5">
          <h2 className="text-2xl font-semibold">{data.displayName}</h2>
          <p>{data.role.displayName}</p>
        </div>
      </li>
    </>
  );
};

export default Card;
