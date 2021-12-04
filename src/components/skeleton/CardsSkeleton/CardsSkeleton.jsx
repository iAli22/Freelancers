import Skeleton from "react-loading-skeleton";
import style from "./CardsSkeleton.module.scss";
function CardsSkeleton({ ...res }) {
  return (
    <div className={style.CardsSkeleton}>
      <Skeleton count={1} {...res} />
    </div>
  );
}

export default CardsSkeleton;
