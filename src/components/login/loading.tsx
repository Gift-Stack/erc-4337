import { Blocks } from "react-loader-spinner";

const Loading = (props: { loadingStatus: string }) => (
  <div className="w-full flex flex-1 flex-col justify-center items-center">
    <Blocks
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      color="rgb(255, 117, 87)"
    />
    <p className="text-base text-center">{props.loadingStatus}</p>
  </div>
);

export default Loading;
