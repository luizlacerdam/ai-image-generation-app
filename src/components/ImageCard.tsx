import { Avatar } from "@radix-ui/react-avatar";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageCard = ({ item, style }) => {
	return (
		<div
			className="relative flex bg-gray-800 rounded-2xl shadow-lg gap-2 cursor-pointer transition-transform duration-300 hover:shadow-xl hover:scale-105"
			style={style}
		>
			<LazyLoadImage
				alt={item?.prompt}
				width="100%"
				src={item?.photo}
				style={{ borderRadius: "12px" }}
			/>
			<div className="absolute inset-0 flex flex-col justify-end gap-2 p-4 backdrop-blur-sm bg-black/50 rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100">
				<p className="font-normal text-sm text-white">• {item?.prompt}</p>

				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-2 text-white">
						<Avatar />
						<span className="font-semibold text-sm">{item?.name}</span>
					</div>
					{/* <DownloadRounded
              className="text-white cursor-pointer"
              onClick={() => FileSaver.saveAs(item?.photo, `download.jpg`)}
            /> */}
				</div>
			</div>
		</div>
	);
};

export default ImageCard;
